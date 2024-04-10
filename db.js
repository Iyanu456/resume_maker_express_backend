// db.js
const mongoose = require('mongoose');
require('dotenv').config();
//mongodb://127.0.0.1:27017/resumeMakerDb

mongoose.connect((`${process.env.DATABASE}`), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

module.exports = mongoose.connection;
