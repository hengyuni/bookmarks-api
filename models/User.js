const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  bio: String,
  password: { type: String, required: true },
  bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Bookmark'}]
})

module.exports = model('User', userSchema)