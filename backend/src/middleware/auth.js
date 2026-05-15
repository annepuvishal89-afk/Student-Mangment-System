const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Authenticate middleware: Authorization header =', authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    console.log('Decoded JWT:', decoded);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    console.log('Invalid token:', error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.authorize = (roles = []) => {
  if (typeof roles === 'string') roles = [roles];
  return (req, res, next) => {
    console.log('Authorize middleware: userRole =', req.userRole, 'required roles =', roles);
    if (!roles.includes(req.userRole)) {
      console.log('Authorization failed: userRole', req.userRole, 'not in', roles);
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};
