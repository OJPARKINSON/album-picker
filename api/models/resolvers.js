const { AuthenticationError } = require("apollo-server-core");
const axios = require('axios');
const { User } = require('../utils/mongoose')

const getLink = () => {
    const callbackUrl = '&redirect_uri=http://localhost:5000/callback';
    const scopes = 'user-library-read playlist-read-collaborative'
    return `https://accounts.spotify.com/authorize?response_type=code${callbackUrl}&client_id=${process.env.client_id}&scope=${scopes}`;
}

const getUser = async (parent, args, context) => {
    if (!isAuthenticated(context.req)) {
        return {id: null}
    }
    var user = await User.findOne({ _id: context.req.session.passport.user}).lean();
    
    return {id: user._id, username: user.username}
}

const getSpotifyAlbums = async (parent, args, context) => {
    if (!isAuthenticated(context.req)) return AuthenticationError("You must be logged in");

    var user = await User.findOne({ _id: context.req.session.passport.user}).lean();

    axios({
        url: "https://api.spotify.com/v1/me/albums",
        method: "get",
        headers: {
            'Authorization': 'Bearer ' + user.accessToken,
            Accept: "application/json"
        }
    })
        .then(res => {console.log(res.data.items); return res})
        .catch(err => console.error(err));

}

const isAuthenticated = ({ session }) => session.passport.user !== undefined;

const resolvers = {
    Query: {
        getLink,
        getUser,
        getSpotifyAlbums
    },
    Mutation: {
        logout: (_,__,context) => context.req.logout(),
    },
};

module.exports = {
    resolvers
}