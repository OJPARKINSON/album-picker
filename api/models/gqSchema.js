const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type user {
    _id: ID
    username: String
    albums: [Album]
  }
  
  type Album {
    _id: ID
    name: String
    tracks: [Track]
    artist: Artist
    artworkUrl: String
    total_tracks: Int
  }

  type Artist {
    id: ID
    name: String
    url: String
  }

  type Track {
    id: ID
    name: String,
    popularity: Int
  }

  input AlbumInput {
    _id: ID
    name: String
    artwork: ArtworkInput
  }
  input ArtworkInput {
    url: String
  }
  input ArtistInput {
    name: String
  }

  type Query {
    getUser: user
    getLink: String
    getSpotifyAlbums: [Album]
  }
  type Mutation {
    logout: Boolean
    addUserAlbum(_id: ID!, name: String!, artworkUrl: String!, artist: String!): [Album]
    removeUserAlbum(_id: ID!, name: String!, artworkUrl: String!, artist: String!): [Album]
  }
`;

module.exports = {
    typeDefs
}
