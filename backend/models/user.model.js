const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,required: true,trim: true
  },
  gender: { 
    type: String,enum: ['male', 'female'] 
  },
  dob: { type: Date, required: true },
  news: { type: Boolean, required: true },
  email: { type: String, required: true },
  photo: {type: String}
}, {  timestamps: true,}
);

const User = mongoose.model('User', userSchema);

module.exports = User;