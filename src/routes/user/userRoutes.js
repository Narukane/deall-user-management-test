const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../../models/User');
const authenticateUser = require('../../middleware/authenticateUser');

// Get all users (only accessible by admin and user)
router.get('/', authenticateUser, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'user') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const users = await User.find({}, '_id username role');
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user by ID (accessible by both admin and user)
router.get('/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id, '_id username role');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    if (req.user.role === "admin" || req.user.role === "user") {
      return res.status(200).json(user);
    } else {
      return res.status(403).json({ error: 'Access denied' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user by ID (only accessible by admin)
router.put('/:id', authenticateUser, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const { id } = req.params;
    const { username, password, role } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.username = username;
    user.password = hashedPassword;
    user.role = role;
    await user.save();

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user by ID (only accessible by admin)
router.delete('/:id', authenticateUser, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  try {
    const { id } = req.params;
    
    if (req.user.id === id) {
        return res.status(403).json({ error: 'Cannot delete yourself' });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;