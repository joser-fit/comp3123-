const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    noteTitle: { type: String, required: true, trim: true },
    noteDescription: { type: String, required: true, trim: true },
    priority: { type: String, required: true, enum: ['HIGH', 'MEDIUM', 'LOW'] },
    dateAdded: { type: Date, required: true, default: Date.now },
    dateUpdated: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);
