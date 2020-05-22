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
    artists: [Artists]
    artworkUrl: String
    total_tracks: Int
  }

  type Artists {
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

  type Query {
    getUser: user
    getLink: String
    getSpotifyAlbums: [Album]
  }
  type Mutation {
    logout: Boolean
    addUserAlbum(_id: ID!, name: String!, artworkUrl: String!): Album
  }
`;

module.exports = {
    typeDefs
}
