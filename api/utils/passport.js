const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');
const { User } = require('./mongoose')
const { saveAlbums, saveArtists } = require('../controllers/atoms')
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
        User.findById(profile.id, async (err, docs) => {
            if (err) {done(err); return;}
            else if (docs) {
                await User.where({ _id: docs?._id}).updateOne({ accessToken, refreshToken, spotifyid: docs.id, username: docs.username});
                saveAlbums(accessToken);
                saveArtists(accessToken);
                return done(null, {_id: docs.id, accessToken, refreshToken, spotifyid: docs.id, username: docs.username})
            } else {                
                var newUser = new User({_id: profile.id, accessToken, refreshToken, spotifyid: profile.id, username: profile.username});
                saveAlbums(accessToken);
                saveArtists(accessToken);
                newUser.save((err, user) => err ? console.error(err) : user);
                return done(null, newUser)
            }
        });
        }
    )
);

module.exports = {
    passport
}