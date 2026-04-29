const Right = require('../models/Right');
const UserRight = require('../models/UserRight');

const authorize = (requiredRight) => {
  return async (req, res, next) => {
    try {
      // Find the right by name
      const right = await Right.findOne({ right_name: requiredRight });
      if (!right) {
        return res.status(400).json({ message: 'Permission not found.' });
      }

      // Check if user has this right
      const userRights = await UserRight.find({ user_id: req.user._id, right_id: right._id });
      if (userRights.length === 0) {
        return res.status(403).json({ message: 'Access denied. Missing permission.' });
      }

      // ✅ User has the permission
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };
};

module.exports = authorize;
