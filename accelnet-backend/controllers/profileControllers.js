const { users } = require('../models');
const { profileSchema } = require('../validation/profileValidation');

// Get user profile controller
exports.getProfile = (req, res) => {
  const { userId } = req.params;
  
  // Find user by ID
  const user = users.find(u => u.id === userId);
  
  // Check if user exists
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // Return user's profile or null
  res.status(200).json(user.profile);
};

// Save/update user profile controller
exports.saveProfile = (req, res) => {
  const { userId } = req.params;
  
  // Validate request body
  const { error, value } = profileSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  
  // Find user index
  const userIndex = users.findIndex(u => u.id === userId);
  
  // Check if user exists
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // If user is updating profile, extract first and last name from full name
  if (value.fullName && (!users[userIndex].firstName || !users[userIndex].lastName)) {
    const nameParts = value.fullName.split(' ');
    users[userIndex].firstName = nameParts[0] || '';
    users[userIndex].lastName = nameParts.slice(1).join(' ') || '';
  }
  
  // Update user's profile
  users[userIndex].profile = value;
  
  // Return success response with updated profile
  res.status(200).json({
    success: true,
    profile: users[userIndex].profile
  });
};