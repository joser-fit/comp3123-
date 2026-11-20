const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes');

const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/week06_notes';
const PORT = process.env.PORT || 8081;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Welcome to Note taking application - Week06 Exercise</h1>');
});
app.use(noteRoutes);

app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    if (error.type === 'entity.parse.failed') {
        return res.status(400).json({ message: 'Invalid JSON body' });
    }
    if (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) {
        return res.status(400).json({ message: error.message });
    }
    console.error(error.name);
    res.status(500).json({ message: 'Internal server error' });
});

if (require.main === module) {
    mongoose.connect(DB_URL, { serverSelectionTimeoutMS: 5000 })
        .then(() => {
            console.log('Connected to MongoDB');
            app.listen(PORT, () => console.log('Server is listening on port ' + PORT));
        })
        .catch(error => {
            console.error('Could not connect to MongoDB (' + error.name + '). Check the service and DB_URL.');
            process.exitCode = 1;
        });
}

module.exports = app;
