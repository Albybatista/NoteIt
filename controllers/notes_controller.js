const express = require('express')
const notes = express.Router()
const Note = require('../models/note.js')

// =======================================
//              ROUTES
// =======================================


/* ===========
GET ROUTE
============= */
//INDEX
notes.get('/', (req,res) => {
  Note.find({}, (err, foundNote) => {
    res.json(foundNote)
  })
})


/* ===========
POST ROUTE
============= */
//CREATE
notes.post('/', (req,res) => {
  Note.create(req.body, (err, createdNote) => {
    Note.find({}, (err, foundNote) => {
      res.json(foundNote)
    })
  })
})


/* ===========
PUT ROUTE
============= */
//EDIT
notes.put('/:id', (req,res) => {
  Note.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedNode) => {
    Note.find({}, (err,foundNote) => {
      res.json(foundNote)
    })
  })
})


/* ===========
DELETE ROUTE
============= */
//DELETE
notes.delete('/:id', (req, res) => {
  Note.findByIdAndRemove(req.params.id, (err, deletedNote) => {
    Note.find({}, (err, foundNote) => {
      res.json(foundNote)
    })
  })
})


/* ===========
GET ROUTE
============= */
//DROP COLLECTION


module.exports = notes;
