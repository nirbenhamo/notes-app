const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({

    content: {
        type: String,
    },
    time: {
        type: String,
    },
    date: {
        type: String,
    }
});

module.exports = mongoose.model('notes', noteSchema);