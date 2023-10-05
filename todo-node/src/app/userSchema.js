const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: {type: String},
    userName: {type: String},
    password: {type: String}
});

module.exports = mongoose.model('users', User);