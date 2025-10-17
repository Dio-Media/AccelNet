const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import middleware
const { authenticate } = require('./middleware/authMiddleware');

// Import routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const eventRoutes = require('./routes/eventRoutes');
const workingGroupRoutes = require('./routes/workingGroupRoutes');
const multimediaRoutes = require('./routes/multimediaRoutes');
const publicationsRoutes = require('./routes/publicationsRoutes');
const grantsRoutes = require('./routes/grantsRoutes');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the AccelNet System API' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', authenticate, profileRoutes);
app.use('/api/events', authenticate, eventRoutes);
app.use('/api/workingGroups', authenticate, workingGroupRoutes);
app.use('/api/multimedia', authenticate, multimediaRoutes);
app.use('/api/publications', authenticate, publicationsRoutes);
app.use('/api/grants', authenticate, grantsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for testing
module.exports = app;