const mongoose = require('mongoose');

//schema for register
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    likedslide: [{ id: String }],
    bookmarkedslide: [{ id: String }],
})

// Define a Model based on the Schema for user registration
const UserModel = mongoose.model("userdetails", userSchema)

module.exports = UserModel;