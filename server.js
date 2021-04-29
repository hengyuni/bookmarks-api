require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

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

app.use('/', (req, res) => {
  res.send(`<h1>Hello World</h1>`)
});

app.listen(PORT, () => console.log('Listening on port: ', PORT))