import { 
    getLink,
    getUser, 
    getSpotifyAlbums, 
    addUserAlbum, 
    removeUserAlbum }  from '../controllers/controller';

const resolvers = {
    Query: {
        getLink,
        getUser,
        getSpotifyAlbums,
    },
    Mutation: {
        addUserAlbum,
        removeUserAlbum,
        logout: (_,__,context) => context.logout(),
    },
};

module.exports = {
    resolvers
}