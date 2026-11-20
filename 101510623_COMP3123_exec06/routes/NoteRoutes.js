const express = require('express');
const mongoose = require('mongoose');
const Note = require('../models/NotesModel');

const noteRoutes = express.Router();

function validateContent(req, res, next) {
    const content = req.body?.content;
    if (!content || typeof content !== 'object' || Array.isArray(content)) {
        return res.status(400).json({ message: 'Note content can not be empty' });
    }

    for (const field of ['noteTitle', 'noteDescription', 'priority']) {
        if (typeof content[field] !== 'string' || !content[field].trim()) {
            return res.status(400).json({ message: field + ' must be a nonempty string' });
        }
    }

    next();
}

noteRoutes.param('noteId', (req, res, next, noteId) => {
    if (!mongoose.isObjectIdOrHexString(noteId)) {
        return res.status(400).json({ message: 'Invalid note ID' });
    }
    next();
});

noteRoutes.post('/notes', validateContent, async (req, res) => {
    const { noteTitle, noteDescription, priority, dateAdded, dateUpdated } = req.body.content;
    const note = await Note.create({ noteTitle, noteDescription, priority, dateAdded, dateUpdated });
    res.status(201).json(note);
});

noteRoutes.get('/notes', async (req, res) => {
    res.json(await Note.find().sort({ _id: 1 }));
});

noteRoutes.get('/notes/:noteId', async (req, res) => {
    const note = await Note.findById(req.params.noteId);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
});

noteRoutes.put('/notes/:noteId', validateContent, async (req, res) => {
    const { noteTitle, noteDescription, priority, dateUpdated = new Date() } = req.body.content;
    const note = await Note.findByIdAndUpdate(
        req.params.noteId,
        { noteTitle, noteDescription, priority, dateUpdated },
        { new: true, runValidators: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
});

noteRoutes.delete('/notes/:noteId', async (req, res) => {
    const note = await Note.findByIdAndDelete(req.params.noteId);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted successfully' });
});

module.exports = noteRoutes;
