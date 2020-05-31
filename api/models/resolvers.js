import { 
    getLink,
    getUser,  
    addUserAlbum, 
    removeUserAlbum,
    getSpotifyData }  from '../controllers/controller';

const resolvers = {
    Query: {
        getLink,
        getUser,
        getSpotifyData
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