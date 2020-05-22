import { getLink, getUser, getSpotifyAlbums, addUserAlbum} from '../controllers/controller';

const resolvers = {
    Query: {
        getLink,
        getUser,
        getSpotifyAlbums,
    },
    Mutation: {
        addUserAlbum,
        logout: (_,__,context) => context.logout(),
    },
};

module.exports = {
    resolvers
}