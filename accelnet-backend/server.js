// server.js - AccelNet Backend Server
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'accelnet',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0,
});

// Test database connection
pool.getConnection()
  .then(conn => {
    console.log('✓ Database connected successfully');
    conn.release();
  })
  .catch(err => {
    console.error('✗ Database connection failed:', err.message);
    console.error('Check your .env file credentials');
  });

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// ==================== HEALTH CHECK ====================
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to AccelNet API', status: 'running' });
});

// ==================== PUBLIC ENDPOINTS ====================

// Get recent news
app.get('/api/news', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [news] = await conn.query(
      `SELECT news_id, title, content, excerpt, featured_image_url, category, 
              created_at, updated_at FROM news 
       ORDER BY created_at DESC LIMIT 10`
    );
    conn.release();
    res.json(news || []);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single news article
app.get('/api/news/:id', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [news] = await conn.query(
      'SELECT * FROM news WHERE news_id = ?',
      [req.params.id]
    );
    conn.release();
    
    if (!news || news.length === 0) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.json(news[0]);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get upcoming events
app.get('/api/events/upcoming', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [events] = await conn.query(
      `SELECT event_id, title, event_description, start_datetime, end_datetime, 
              location, venue, event_type, status FROM anevents 
       WHERE start_datetime > NOW()
       ORDER BY start_datetime ASC LIMIT 6`
    );
    conn.release();
    res.json(events || []);
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all events (paginated)
app.get('/api/events', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const conn = await pool.getConnection();
    const [events] = await conn.query(
      `SELECT event_id, title, event_description, start_datetime, end_datetime, 
              location, venue, event_type, status FROM anevents 
       ORDER BY start_datetime DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    conn.release();
    res.json(events || []);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get organizations
app.get('/api/organizations', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [orgs] = await conn.query(
      `SELECT org_id, org_name, org_type, country, website_url, 
              logo_url, org_description FROM organizations LIMIT 20`
    );
    conn.release();
    res.json(orgs || []);
  } catch (error) {
    console.error('Error fetching organizations:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get grants
app.get('/api/grants', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [grants] = await conn.query(
      `SELECT grant_id, title, grant_type, description, funding_amount, 
              application_deadline FROM grants 
       ORDER BY application_deadline DESC LIMIT 10`
    );
    conn.release();
    res.json(grants || []);
  } catch (error) {
    console.error('Error fetching grants:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get publications
app.get('/api/publications', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [pubs] = await conn.query(
      `SELECT publication_id, title, publication_type, publication_date, 
              doi, abstract, is_featured FROM publications 
       ORDER BY publication_date DESC LIMIT 10`
    );
    conn.release();
    res.json(pubs || []);
  } catch (error) {
    console.error('Error fetching publications:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get platform statistics
app.get('/api/statistics', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    
    const [users] = await conn.query('SELECT COUNT(*) as count FROM users');
    const [orgs] = await conn.query('SELECT COUNT(*) as count FROM organizations');
    const [events] = await conn.query('SELECT COUNT(*) as count FROM anevents');
    const [grants] = await conn.query('SELECT COUNT(*) as count FROM grants');
    
    conn.release();

    res.json({
      users: users[0]?.count || 0,
      organizations: orgs[0]?.count || 0,
      events: events[0]?.count || 0,
      grants: grants[0]?.count || 0
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: error.message });
  }
});

// ==================== AUTHENTICATION ====================

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, first_name, last_name, password } = req.body;
    
    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({ error: 'Missing required fields: email, password, first_name, last_name' });
    }

    const conn = await pool.getConnection();
    
    // Check if user exists
    const [existing] = await conn.query('SELECT user_id FROM users WHERE email = ?', [email]);
    if (existing && existing.length > 0) {
      conn.release();
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    await conn.query(
      'INSERT INTO users (email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, first_name, last_name]
    );
    
    conn.release();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const conn = await pool.getConnection();
    const [users] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
    conn.release();

    if (!users || users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.user_id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        userId: user.user_id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verify token
app.get('/api/auth/verify', authenticateToken, async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [users] = await conn.query('SELECT * FROM users WHERE user_id = ?', [req.user.userId]);
    conn.release();

    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];
    res.json({
      userId: user.user_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ error: error.message });
  }
});

// ==================== PROTECTED ENDPOINTS ====================

// Get user profile
app.get('/api/profile/:userId', authenticateToken, async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [user] = await conn.query(
      'SELECT user_id, email, first_name, last_name FROM users WHERE user_id = ?',
      [req.params.userId]
    );
    conn.release();

    if (!user || user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user[0]);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
app.post('/api/profile/:userId', authenticateToken, async (req, res) => {
  try {
    const { first_name, last_name } = req.body;
    
    if (!first_name || !last_name) {
      return res.status(400).json({ error: 'first_name and last_name required' });
    }

    const conn = await pool.getConnection();
    await conn.query(
      'UPDATE users SET first_name = ?, last_name = ? WHERE user_id = ?',
      [first_name, last_name, req.params.userId]
    );
    conn.release();

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get user's registered events
app.get('/api/profile/:userId/events', authenticateToken, async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [events] = await conn.query(
      `SELECT ae.event_id, ae.title, ae.start_datetime, ae.end_datetime, ae.location
       FROM anevents ae
       INNER JOIN event_registration er ON ae.event_id = er.event_id
       WHERE er.user_id = ?
       ORDER BY ae.start_datetime DESC`,
      [req.params.userId]
    );
    conn.release();
    res.json(events || []);
  } catch (error) {
    console.error('Error fetching user events:', error);
    res.status(500).json({ error: error.message });
  }
});

// Register for event
app.post('/api/events/:eventId/register', authenticateToken, async (req, res) => {
  try {
    const conn = await pool.getConnection();
    
    // Check if already registered
    const [existing] = await conn.query(
      'SELECT * FROM event_registration WHERE event_id = ? AND user_id = ?',
      [req.params.eventId, req.user.userId]
    );

    if (existing && existing.length > 0) {
      conn.release();
      return res.status(400).json({ error: 'Already registered for this event' });
    }

    await conn.query(
      'INSERT INTO event_registration (event_id, user_id, registration_date, attendance_status) VALUES (?, ?, NOW(), ?)',
      [req.params.eventId, req.user.userId, 'registered']
    );

    conn.release();
    res.json({ message: 'Successfully registered for event' });
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({ error: error.message });
  }
});

// ==================== ERROR HANDLING ====================
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 AccelNet API Server Running`);
  console.log(`   URL: http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Database: ${process.env.DB_NAME}`);
  console.log(`\n📝 Available endpoints:`);
  console.log(`   GET  /api`);
  console.log(`   GET  /api/news`);
  console.log(`   GET  /api/events/upcoming`);
  console.log(`   GET  /api/statistics`);
  console.log(`   POST /api/auth/login`);
  console.log(`   POST /api/auth/register\n`);
});