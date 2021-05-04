const express = require('express');
const router = express.Router();
const Bookmark = require('../models/Bookmark');

// Index
router.get('/', async (req, res) => {
  let filters;
  if(Object.keys(req.query).length > 0){
      filters = {...req.query}
  }
  try {
    if(!filters){
      const foundBookmarks = await Bookmark.find({});
      res.status(200).json(foundBookmarks)
    } else {
      const foundBookmarks = await Bookmark.find({...filters});
      res.status(200).json(foundBookmarks)
    }  
  }catch(error){
    res.status(400).json({
      msg: error.message
    })
  }
});

// index #2
// router.get('/', async (req, res) => {
//   try {
//     const foundBookmarks = await Bookmark.find({});
//     res.status(200).json(foundBookmarks)
//   } catch (err) {
//     res.status(400).json({
//       msg: err.message
//     })
    
//   }
// })

// Create
router.post('/', async (req, res) => {
  try {
    const createdBookmark = await Bookmark.create(req.body)
    res.status(200).json(createdBookmark)
  } catch (err) {
    res.status(400).json({
      msg: err.message
    })
  }
});

// Show
router.get('/:id', async (req, res) => {
  try {
    const foundBookmark = await Bookmark.findById(req.params.id);
    res.status(200).json(foundBookmark)
  } catch (err) {
    res.status(400).json({
      msg: error.message
    })
  }
});

router.get('/ByTitle/:title', async (req, res) => {
  try {
    const foundBookmark = await Bookmark.findOne({ name: req.params.title });
    res.status(200).json(foundBookmark)
  } catch (err) {
    res.status(400).json({
      msg: error.message
    })
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updatedBookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedBookmark);
  } catch (err) {
    res.status(400).json({
      msg: error.message
    })
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedBookmark);
  } catch (err) {
    res.status(400).json({
      msg: error.message
    })
  }
});

module.exports = router
