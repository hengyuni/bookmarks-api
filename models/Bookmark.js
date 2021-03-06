const { Schema, model } = require('mongoose');

const bookmarkSchema = new Schema({
  title: { type: String, required: true, unique: true },
  url: {type: String, required: true, unique: true },
  tags: []
})

module.exports = model('Bookmark', bookmarkSchema);