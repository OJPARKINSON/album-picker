import { getLink, getUser, getSpotifyData } from '../controllers/gets';
import { addUserAlbum, 
    removeUserAlbum,
    addUserArtist,
    removeUserArtist }  from '../controllers/mutations';

const resolvers = {
    Query: {
        getLink,
        getUser,
        getSpotifyData
    },
    Mutation: {
        addUserAlbum,
        removeUserAlbum,
        addUserArtist,
        removeUserArtist,
        logout: (_,__,context) => context.logout(),
    },
};

module.exports = {
    resolvers
}