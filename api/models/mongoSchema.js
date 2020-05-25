import mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  _id: String,
  accessToken: String,
  refreshToken: String,
  spotifyid: String,
  username: String,
  albums: [{
    _id: String,
    // tracks: [Number],
    // total_tracks: Number
  }],
  tracks: [{
    _id: [String],
  }],
  artists: [{
    _id: [String],
  }]
});
  
export const AlbumSchema = new mongoose.Schema({
  _id: String,
  name: String,
  total_tracks: Number,
  artist: {
    name: String
  },
  artwork: [{
    url: String
  }]
});

export const ArtistSchema = new mongoose.Schema({
  _id: String,
  name: String,
  url: String
});
