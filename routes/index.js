var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs'); // Import bcrypt
const jwt = require('jsonwebtoken');
require('dotenv').config();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Exyyyyesseee' });
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
    }

    // If email doesn't exist, create a new user
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ email });

    // Check if user exists and password is correct
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


module.exports = router;
