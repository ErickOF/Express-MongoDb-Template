const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  idCard: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  createdBy: {
    type: String,
    required: false
  },
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  telephoneNumber: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  idRol: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = userSchema;
