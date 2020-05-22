import axios from 'axios';
import { User } from '../utils/mongoose';
import { AuthenticationError } from "apollo-server-core";

export const getLink = async (parent, args, context) => {
    if (context?.user?._id) {
        return null
    };
    const callbackUrl = '&redirect_uri=http://localhost:5000/callback';
    const scopes = 'user-library-read playlist-read-collaborative playlist-read-private'
    return `https://accounts.spotify.com/authorize?response_type=code${callbackUrl}&client_id=${process.env.client_id}&scope=${scopes}`;
}

export const getUser = async (parent, args, context) => {
    if (!context?.user?._id) throw new AuthenticationError('you must be logged in to query this schema'); 
    const { _id, username, albums} = await User.findOne({ _id: context?.user?._id}).lean();
    return { _id, username, albums }
}

export const getSpotifyAlbums = async (parent, args, context) => {
    if (!context?.user?._id) throw new AuthenticationError('you must be logged in to query this schema'); 
    var user = await User.findOne({ _id: context?.user?._id}).lean();
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
}

export const addUserAlbum = async (parent, args, context) => {
    if (!context?.user?._id) throw new AuthenticationError('you must be logged in to query this schema'); 
    var { albums } = await User.findOne({ _id: context?.user?._id}).lean();
    console.log({albums, parent, args, context})
}