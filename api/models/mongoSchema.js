import mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  _id: String,
  accessToken: String,
  refreshToken: String,
  spotifyid: String,
  username: String,
  albums: [{
    _id: String,
  }],
  tracks: [{
    _id: [String],
  }],
  artists: [{
    _id: String,
    url: String
  }]
});
  
export const AlbumSchema = new mongoose.Schema({
  _id: String,
  name: String,
  total_tracks: Number,
  artist: {
    _id: String,
    name: String,
    url: String
  },
  artwork: {
    url: String
  }
});

export const ArtistSchema = new mongoose.Schema({
  _id: String,
  name: String,
  url: String,
  image: {
    url: String
  }
});
