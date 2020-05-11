const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    _id: String,
    accessToken: String,
    refreshToken: String,
    username: String,
  });
  
const MusicSchema = new mongoose.Schema({
    _id: String,
    name: String,
    popularity: Number,
    album: {
        id: String,
        name: String,
        release_date: Date,
        total_tracks: Number,
    },
    Artist: {
        id: String,
        name: String,
    }
  });
  

module.exports = {
    MusicSchema,
    UsersSchema
}