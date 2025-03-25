const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['admin', 'user', 'viewer'],
    default: 'viewer'
  },
  avatar: {
    type: String
  },
  favoriteEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }
  ]
});

// userSchema.pre('save', function () {
//   this.password = bcrypt.hashSync(this.password, 10);
// });

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;
