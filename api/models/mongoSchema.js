import mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  _id: String,
  accessToken: String,
  refreshToken: String,
  spotifyid: String,
  username: String,
  albums: [{
    _id: String,
    name: String,
    artwork: {
      url: String
    },
    artist: {
      name: String
    }
  }]
});
  
export const MusicSchema = new mongoose.Schema({
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
  