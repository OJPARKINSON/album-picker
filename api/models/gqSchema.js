const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type user {
    _id: ID
    username: String
    albums: [Album]
    artists: [Artist]
  }
  
  type Album {
    _id: ID
    name: String
    artist: Artist
    artworkUrl: String
    total_tracks: Int
  }

  type Artist {
    _id: ID
    name: String
    url: String
  }


  type Query {
    getLink: String
    getUser: user
    getUserArtists: [Artist]
    getSpotifyAlbums: [Album]
  }
  type Mutation {
    logout: Boolean
    addUserAlbum(_id: ID!): [Album]
    removeUserAlbum(_id: ID!): [Album]
  }
`;

module.exports = {
    typeDefs
}
