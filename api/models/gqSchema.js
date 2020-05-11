const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID
        accessToken: String,
        refreshToken: String,
        username: String,
      }
    
      type Query {
        currentUser: User
        Link: String
      }
  `;

  module.exports = {
      typeDefs
  }