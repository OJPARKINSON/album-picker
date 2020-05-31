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
    artistUrl: String
  }

  type spotifyData {
    artists: [Artist]
    albums: [Album]
  }


  type Query {
    getLink: String
    getUser: user
    getSpotifyData: spotifyData
  }

  type Mutation {
    logout: Boolean
    addUserAlbum(_id: ID!, artist_id: String!): [Album]
    removeUserAlbum(_id: ID!, artist_id: String!): [Album]
  }
`;

module.exports = {
    typeDefs
}
