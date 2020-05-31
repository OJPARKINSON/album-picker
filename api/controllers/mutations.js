import { User} from '../utils/mongoose';
import { AuthenticationError } from "apollo-server-core";
import { mapAlbums, mapArtists } from './atoms'

export const addUserAlbum = async (parent, args, context) => {
    if (!context?.user?._id) throw new AuthenticationError('you must be logged in to query this schema'); 
    var { albums, artists } = await User.findOne({ _id: context?.user?._id}).lean();
    albums = [...albums, {_id: args._id }]
    artists = [...artists, {_id: args.artist_id}]

    await User.where({ _id: context?.user?._id}).update({ albums, artists });
    return mapAlbums(albums);
}

export const removeUserAlbum = async (parent, args, context) => {
    if (!context?.user?._id) throw new AuthenticationError('you must be logged in to query this schema'); 
    var { albums } = await User.findOne({ _id: context?.user?._id}).lean();
    albums = albums.reduce((acc, current) => { 
        current._id !== args._id && acc.push(current)
        return acc
    }, []);
    await User.where({ _id: context?.user?._id}).update({ albums });

    return mapAlbums(albums);
}

export const addUserArtist = async (parent, args, context) => {
    if (!context?.user?._id) throw new AuthenticationError('you must be logged in to query this schema'); 
    var { artists } = await User.findOne({ _id: context?.user?._id}).lean();
    artists = [...artists, {_id: args._id}]

    await User.where({ _id: context?.user?._id}).update({ artists });
    return mapArtists(artists)
}

export const removeUserArtist = async (parent, args, context) => {
    if (!context?.user?._id) throw new AuthenticationError('you must be logged in to query this schema'); 
    var { artists } = await User.findOne({ _id: context?.user?._id}).lean();
    artists = artists.reduce((acc, current) => { 
        current._id !== args._id && acc.push(current)
        return acc
    }, []);
    await User.where({ _id: context?.user?._id}).update({ artists });

    return mapArtists(artists)
}