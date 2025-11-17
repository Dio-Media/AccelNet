// accelnet-backend/server.js - FINAL CLEAN VERSION
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB, pool } from './config/db.js';
import { ENV_VARS } from './config/envVars.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import authRoutes from './routes/auth.route.js';
import newsRoutes from './routes/news.route.js';
import eventsRoutes from './routes/events.route.js';
import workingGroupRoutes from './routes/wg.route.js';
import participantsRoutes from './routes/participants.routes.js'
import publicationsRoutes from './routes/publications.route.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ==================== MIDDLEWARE ====================
app.use(cors({
    origin: ENV_VARS.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// ==================== DATABASE CONNECTION ====================
await connectDB();

// ==================== ROUTES ====================

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'running',
        message: 'AccelNet API Server',
        timestamp: new Date().toISOString(),
        environment: ENV_VARS.NODE_ENV
    });
});

// Auth routes
app.use('/api/auth', authRoutes);

// News routes
app.use('/api/news', newsRoutes);

// Events routes
app.use('/api/events', eventsRoutes);

// Working Groups routes
app.use('/api/working-groups', workingGroupRoutes);

// Participants routes
app.use('/api/participants', participantsRoutes);

//Publication routes
app.use('/api/publications', publicationsRoutes);

// Statistics endpoint
app.get('/api/statistics', async (req, res) => {
    try {
        const [users] = await pool.execute('SELECT COUNT(*) as count FROM users');
        const [orgs] = await pool.execute('SELECT COUNT(*) as count FROM organizations');
        const [events] = await pool.execute('SELECT COUNT(*) as count FROM anevents');
        const [pubs] = await pool.execute('SELECT COUNT(*) as count FROM publications');

        res.json({
            success: true,
            data: {
                users: users[0]?.count || 0,
                organizations: orgs[0]?.count || 0,
                events: events[0]?.count || 0,
                publications: pubs[0]?.count || 0
            }
        });
    } catch (error) {
        console.error('Error fetching statistics:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
});

// Organizations endpoint
app.get('/api/organizations', async (req, res) => {
    try {
        const [orgs] = await pool.execute(
            `SELECT org_id, org_name, org_type, country, website_url, 
                    logo_url, org_description 
             FROM organizations 
             LIMIT 20`
        );
        res.json({ success: true, data: orgs });
    } catch (error) {
        console.error('Error fetching organizations:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
});

// Grants endpoint
app.get('/api/grants', async (req, res) => {
    try {
        const [grants] = await pool.execute(
            `SELECT grant_id, title, grant_type, description, 
                    funding_amount, application_deadline 
             FROM grants 
             ORDER BY application_deadline DESC 
             LIMIT 10`
        );
        res.json({ success: true, data: grants });
    } catch (error) {
        console.error('Error fetching grants:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
});


// ==================== ERROR HANDLING ====================
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// ==================== START SERVER ====================
app.listen(ENV_VARS.PORT, () => {
    console.log(`\n AccelNet API Server Running`);
    console.log(`   URL: http://localhost:${ENV_VARS.PORT}`);
    console.log(`   Environment: ${ENV_VARS.NODE_ENV}`);
    console.log(`   Database: ${ENV_VARS.DB_NAME}`);
    console.log(`\n Available endpoints:`);
    console.log(`   GET  /api/health`);
    console.log(`   POST /api/auth/signup`);
    console.log(`   POST /api/auth/login`);
    console.log(`   POST /api/auth/logout`);
    console.log(`   GET  /api/auth/verify`);
    console.log(`   GET  /api/news`);
    console.log(`   GET  /api/events`);
    console.log(`   GET  /api/events/upcoming`);
    console.log(`   GET  /api/statistics`);
    console.log(`   GET  /api/organizations`);
    console.log(`   GET  /api/grants`);
    console.log(`   GET  /api/publications\n`);
});