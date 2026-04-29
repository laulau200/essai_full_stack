const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config');

const auth = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password_hash');
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = auth;
