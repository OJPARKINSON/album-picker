const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport')
const { UsersSchema } = require('./models/mongoSchema')
const { typeDefs } = require('./models/gqSchema')
const { resolvers } = require('./models/resolvers')
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express');

const port = 5000
dotenv.config();
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/AlbumPicker', {
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const User = mongoose.model('User', UsersSchema);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
  
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(
    new SpotifyStrategy(
      {
        clientID: process.env.client_id,
        clientSecret: process.env.client_secret,
        callbackURL: 'http://localhost:5000/auth/spotify/callback'
      },
      function(accessToken, refreshToken, expires_in, profile, done) {
        User.save({ _id: profile.id, accessToken, refreshToken});
        process.nextTick(function() {
            return done(null, profile);
        });
      }
    )
  );

app.use(express.static('public'))
  .use(cookieParser())
  .use(bodyParser())
  .use(session({ secure: true, secret: 'keyboard cat', saveUninitialized: false, resave: false }))
  .use(passport.initialize())
  .use(passport.session())
  .use(cors())

app.get('/auth/spotify', passport.authenticate('spotify'), function(req, res) {
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
});
    
app.get(
    '/auth/spotify/callback',
    passport.authenticate('spotify', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req }) => ({ getUser: () => {
      req.session.query ? req.session.query += 1 : req.session.query = 0;
      console.log(req.session)
      return req.session} 
    })
});

server.applyMiddleware({ app });

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))