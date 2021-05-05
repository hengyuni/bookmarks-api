const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Bookmark = require('../models/Bookmark')
const { jsonAuth, auth } = require('./authController')

router.get('/', auth, (req, res) => {
  console.log(res.locals)
  const userQuery = User.find({}).select('-password').populate('bookmarks')
  userQuery.exec((err, foundUsers) => {
    if (err) {
      console.log(err);
      res.status(401).json({ msg: err.message });
    } else {
      res.status(200).json(foundUsers)
    }
  })
})

// add bookmark
router.post('/addBookmarkToUser/', jsonAuth, (req, res) =>{
  console.log(res.locals)
  const bookmark = req.body
  const addBookmarkQuery = User.findOneAndUpdate({ username: res.locals.user }, { $addToSet: { bookmarks: bookmark._id }}, {new: true})
  addBookmarkQuery.exec((err, updatedUser) => {
    if (err){
      res.status(400).json({
          msg: err.message
      })
    } else {
        res.status(200).json({
          msg: `Updated ${res.locals.user} with ${bookmark.name}`
      })
    }
  })
});

// add bookmark #2
router.post('/addBookmark/:bookmark/:username', (req, res) => {
  const bookmarkQuery = Bookmark.findOne({ name: req.params.bookmark })

  bookmarkQuery.exec(( err, bookmark ) => {
    if(err){
      res.status(400).json({
        msg: err.message
      })
    } else {
      const addBookmarkQuery = User.findOneAndUpdate({ username: req.params.username }, { $addToSet: { bookmarks: bookmark._id}}, { new: true})
      addBookmarkQuery.exec(( err, updatedUser ) => {
        if(err){
          res.status(400).json({
            msg: err.message
          })
        } else {
          console.log(updatedUser);
          res.status(200).json({
            msg: `Updated ${updatedUser.username} with the bookmark ${bookmark.name}`
          })
        }
      })
    }
  })
})

// show bookmark
router.get('/:username', auth, (req, res) => {
  const userQuery = User.findOne({ username: req.params.username }).select('-password').populate('bookmarks')

  userQuery.exec((err, foundUser) => {
    if (err) {
      res.status(400).json({
        msg: err.message
      })
    } else {
      res.status(200).json(foundUser)
    }
  })
})

module.exports = router