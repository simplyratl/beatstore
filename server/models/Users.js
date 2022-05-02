const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
   {
      username: {type: String, required: true, unique: true},
      email: {type: String, required: true, unique: true},
      password: {type: String, required: true},
      profilePic: {type: String, default: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg'},
      isAdmin: {type: Boolean, default: false},
   },
   {timestamps: true}
);

module.exports = mongoose.model('User', UserSchema);