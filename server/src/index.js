const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const MongoStore = require('connect-mongo')(session);
const cors = require('cors')
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();
const port = 4000
dotenv.config();
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/AlbumPicker', {
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
      }))
    .use(cors())

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
  
const resolvers = {
    Query: {
        Link: () => `https://accounts.spotify.com/authorize?show_dialog=true&response_type=code&redirect_uri=http://localhost:3000/callback&client_id=${process.env.client_id}`,
        currentUser: (parent, args, context) => context.getUser(),
    }
};
    
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req }) => {
    console.log(req.session)
    return ({
      getUser: () => req.session.id,
      logout: () => req.logout(),
    })}
});

server.applyMiddleware({ app });

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))