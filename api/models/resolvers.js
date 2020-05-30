import { 
    getLink,
    getUser, 
    getSpotifyAlbums, 
    addUserAlbum, 
    removeUserAlbum, 
    getUserArtists }  from '../controllers/controller';

const resolvers = {
    Query: {
        getLink,
        getUser,
        getSpotifyAlbums,
        getUserArtists,
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