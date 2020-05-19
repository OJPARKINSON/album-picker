const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    _id: String,
    accessToken: String,
    refreshToken: String,
    spotifyid: String,
    username: String,
    albums: [{
      _id: String,
    }]

  });
  
  const MusicSchema = new mongoose.Schema({
    _id: String,
    name: String,
    total_tracks: Number,
    tracks: [{
        id: String,
        name: String,
        popularity: Number,
    }],
    artists: [{
        id: String,
        name: String,
        url: String
    }],
    artwork: [{
      url: String
    }]
  });
  

module.exports = {
    MusicSchema,
    UsersSchema
}
