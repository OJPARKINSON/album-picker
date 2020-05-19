const { AuthenticationError } = require("apollo-server-core");
const axios = require('axios');
const { User } = require('../utils/mongoose')

const getLink = () => {
    const callbackUrl = '&redirect_uri=http://localhost:5000/callback';
    const scopes = 'user-library-read playlist-read-collaborative playlist-read-private'
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
    return axios({
            url: "https://api.spotify.com/v1/me/albums",
            method: "get",
            headers: {
                'Authorization': 'Bearer ' + user.accessToken,
                Accept: "application/json"
            }
        })
        .then(res => {
            return res.data.items.map(({ album }) => {
                const { id, name, tracks, artists, images, total_tracks} = album;

                artists.reduce((acc, {id, name, uri} ) => {
                    (id && name && uri) && acc.push({id, name, uri})
                    return acc
                }, [])

                tracks.items.reduce((acc, {id, name, uri} ) => {
                    if (id && name && uri) {
                        acc.push({id, name, uri})
                    }
                    return acc
                }, [])

                return { _id: id, name, tracks: tracks.items, artists, artwork: images[0], total_tracks}
            })
        })
        .catch(err => console.error(err));
            // User.where({ _id: context.req.session.passport.user})
            //     .update({albums: await result}).exec();
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