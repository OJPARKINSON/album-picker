import { User, Album, Artist } from '../utils/mongoose';
import { AuthenticationError } from "apollo-server-core";
import { mapAlbums, mapArtists } from './atoms'

export const getLink = async (parent, args, context) => {
    if (context?.user?._id) {
        return null
    };
    const callbackUrl = '&redirect_uri=http://localhost:5000/callback';
    const scopes = '&scope=user-library-read playlist-read-collaborative playlist-read-private'
    return `https://accounts.spotify.com/authorize?response_type=code${callbackUrl}&client_id=${process.env.client_id}${scopes}`;
}

export const getUser = async (parent, args, context) => {
    if (!context?.user?._id) throw new AuthenticationError('you must be logged in to query this schema'); 
    const { _id, username, albums, artists} = await User.findOne({ _id: context?.user?._id}).lean();

    return { _id, username, albums: await mapAlbums(albums), artists: await mapArtists(artists)}
}

export const getSpotifyData = async (parent, args, context) => {
    let albums = await Album.find().lean();
    const artists = await Artist.find().lean();
    albums = albums?.map(({ _id, name, artist, artwork, total_tracks }) =>  ({ 
        _id, 
        name,
        artist, 
        artworkUrl: artwork.url,
        total_tracks
    }));
    return { albums, artists }
};