const mongoose = require('mongoose');
const authSchema = require('./auth.model');

const authModel = mongoose.model('User', authSchema);
module.exports = authModel;
