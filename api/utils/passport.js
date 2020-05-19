const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');
const { User } = require('./mongoose')
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
dotenv.config();

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(function(obj, done) {
    User.findById(obj, async (err, docs) => err ? done(err): done(null, docs));
});

passport.use(
    new SpotifyStrategy(
        {
            clientID: process.env.client_id,
            clientSecret: process.env.client_secret,
            callbackURL: 'http://localhost:5000/callback'
        },
        function(accessToken, refreshToken, expires_in, profile, done) {
        User.findById(profile.id, (err, docs) => {
            if (err) {done(err); return;}
            if (docs) {done(null, docs); return;}

            var newUser = new User({_id: uuidv4(), accessToken, refreshToken, spotifyid: profile.id, username: profile.username});
            newUser.save((err, user) => err ? console.error(err) : user);
            return done(null, newUser)
        });
        }
    )
);

module.exports = {
    passport
}