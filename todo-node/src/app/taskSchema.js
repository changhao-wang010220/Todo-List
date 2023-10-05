const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = new Schema({
    name: String,
    description: String,
    isComplete: Boolean,
    isImportant: Boolean,
    dateTime: Date,
    // user_id: mongoose.ObjectId
});

module.exports = mongoose.model('tasks', Task);