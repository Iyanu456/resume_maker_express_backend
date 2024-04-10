var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs'); // Import bcrypt

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Exyyyyesseee' });
});

/* POST signup page */
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;
