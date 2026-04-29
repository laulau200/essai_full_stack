const express = require('express');
const router = express.Router();

// Example: Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // assuming you have a User model
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Example: Create a new user
router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
