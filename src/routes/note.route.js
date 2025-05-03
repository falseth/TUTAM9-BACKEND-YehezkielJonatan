const noteController = require("../controllers/note.controller");
const express = require("express");
const router = express.Router();

router.get('/', noteController.getAllNotes);
router.post('/create', noteController.createNote);
router.get('/id/:id', noteController.getNote);
router.get('/user/:id', noteController.getNotesByUser);
router.put('/', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;