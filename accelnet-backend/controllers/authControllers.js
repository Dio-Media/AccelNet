const jwt = require('jsonwebtoken');
const { users } = require('../models');
const { loginSchema, registerSchema } = require('../validation/authValidation');

// JWT secret should be in environment variable in production
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Login controller
exports.login = (req, res) => {
  // Validate request body
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = value;
  
  // Find user by email
  const user = users.find(u => u.email === email);
  
  // Check if user exists and password matches
  if (!user || password !== user.password) { // In real app, use bcrypt.compare
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  // Generate JWT token - improved token generation
  const token = jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      role: user.role 
    }, 
    JWT_SECRET, 
    { expiresIn: '24h' }
  );
  
  console.log('Generated token:', token);
  
  // Return success response with token and user data (excluding password)
  const { password: _, ...userWithoutPassword } = user;
  res.status(200).json({
    success: true,
    token,
    user: userWithoutPassword
  });
};

// Register controller
exports.register = (req, res) => {
  // Validate request body
  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password, role = 'volunteer' } = value;
  
  // Check if email already exists
  if (users.some(u => u.email === email)) {
    return res.status(400).json({ message: 'Email already registered' });
  }
  
  // Create new user
  const newUser = {
    id: (users.length + 1).toString(),
    email,
    password, // In real app, hash the password
    firstName: '',
    lastName: '',
    role,
    profile: null
  };
  
  // Add to users collection
  users.push(newUser);
  
  // Generate JWT token
  const token = jwt.sign(
    { 
      id: newUser.id, 
      email: newUser.email,
      role: newUser.role 
    }, 
    JWT_SECRET, 
    { expiresIn: '24h' }
  );
  
  // Return success response with token and user data (excluding password)
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({
    success: true,
    token,
    user: userWithoutPassword
  });
};

// Verify token controller
exports.verify = (req, res) => {
  try {
    const { user } = req;
    console.log('User from verify endpoint:', user);
    
    // Find full user data
    const userData = users.find(u => u.id === user.id);
    
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = userData;
    res.status(200).json({
      success: true,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Error in verify endpoint:', error);
    res.status(500).json({ message: 'Server error' });
  }
};