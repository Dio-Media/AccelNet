const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import middleware
const { authenticate } = require('./middleware/authMiddleware');

// Import routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const eventRoutes = require('./routes/eventRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const matchingRoutes = require('./routes/matchingRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const historyRoutes = require('./routes/historyRoutes');

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
  res.json({ message: 'Welcome to the Volunteer Management System API' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', authenticate, profileRoutes);
app.use('/api/events', authenticate, eventRoutes);
app.use('/api/volunteers', authenticate, volunteerRoutes);
app.use('/api/matches', authenticate, matchingRoutes);
app.use('/api/notifications', authenticate, notificationRoutes);
app.use('/api/history', authenticate, historyRoutes);

// Special route for volunteer history
app.use('/api/volunteer/history', authenticate, (req, res) => {
  // Extract volunteerId from authenticated user
  const volunteerId = req.user.id;
  
  // Import the history controller
  const historyController = require('./controllers/historyController');
  
  // Set params for controller
  req.params.userId = volunteerId;
  
  // Call the controller method
  historyController.getVolunteerHistory(req, res);
});

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