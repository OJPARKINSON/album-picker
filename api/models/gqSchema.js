const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type user {
    id: ID
    username: String
    albums: [Album]
  }
  
  type Album {
    _id: ID
    name: String
    tracks: [Track]
    artists: [Artists]
    artwork: Artwork
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
  type Artwork {
    url: String
  }

  type Query {
    getUser: user
    getLink: String
    getSpotifyAlbums: [Album]
    getUserAlbums: [Album]
  }
  type Mutation {
    logout: Boolean
  }
`;

module.exports = {
    typeDefs
}
