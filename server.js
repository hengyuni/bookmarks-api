require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const { hash, jsonAuth, auth } = require('./controllers/authController');
const SECRET = process.env.SECRET_KEY;
const User = require('./models/User')

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use((req, res, next) => {
  console.log(req.body)
  next()
})
app.use(cors())

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true
});

mongoose.connection.once('connected', () => {
  console.log('Connected to Mongo Life is good')
})

app.use('/bookmarks', require('./controllers/bookmarksController'))
app.use('/users', require('./controllers/usersController'))

app.use('/', (req, res) => {
  res.send(`<h1>Hello World</h1>`)
});

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = hash(password);

  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(400).json({ msg: err.message })
    } else {
      if(foundUser && bcrypt.compareSync(hashedPassword, foundUser.password)) {
        const token = jwt.sign({
          id: foundUser._id,
          username: foundUser.username
        }, SECRET)
        res.status(200).json({
          token,
          username: foundUser.username
        })
      } else {
        res.status(500).json({
          problem: 'the comparision did not work, did you change your hash algo'
        })
      }
    }
  })
})

app.listen(PORT, () => console.log('Listening on port: ', PORT))