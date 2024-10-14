const mongoose = require('mongoose');

const plm = require('passport-local-mongoose')

mongoose.connect("mongodb://localhost:27017/instadatabase")

// Create User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Removes spaces at the beginning and end
        minlength: 3, // Instagram usernames are short
        maxlength: 30
    },
    fullname: {
        type: String,
        maxlength: 50 // Fullname length cap for better UX
    },
    email: {
        type: String,
        required: true,
        unique: true,
      
    },

    contact: {
        type: Number,
      
    },
    password: {
        type: String,
       
    },
    profilePic: {
        type: String, // URL of the profile picture
    },
  
    createdAt: {
        type: Date,
        default: Date.now // Automatically set to current date
    }
});

userSchema.plugin(plm);





// Export the model
module.exports = mongoose.model('User', userSchema);