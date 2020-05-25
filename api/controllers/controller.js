import axios from 'axios';
import { User, Album } from '../utils/mongoose';
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
    
    const newAlbums = albums.map(async album => {
        const { _id, artist, artwork, total_tracks } = await Album.findOne({ _id: album._id}).lean();
        return { 
            _id, 
            artist, 
            artworkUrl: artwork[0].url,
            total_tracks
        }
    });

    return { _id, username, albums: newAlbums }
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

                new Album({ _id: id, name, tracks: tracks.items, artist: artists[0], artwork: { url: images[0].url}, total_tracks}).save()
                return { _id: id, name, tracks: tracks.items, artist: artists[0], artworkUrl: images[0].url, total_tracks}
            })
        })
        .catch(err => console.error(err));
}

export const addUserAlbum = async (parent, args, context) => {
    if (!context?.user?._id) throw new AuthenticationError('you must be logged in to query this schema'); 
    var { albums } = await User.findOne({ _id: context?.user?._id}).lean();
    albums = [...albums, {_id: args._id}]

    await User.where({ _id: context?.user?._id}).update({ albums });
    return albums.map(async (album) =>  {       
        const { _id, name, artist, artwork, total_tracks } = await Album.findOne({ _id: album._id}).lean();
        return { 
            _id, 
            name,
            artist, 
            artworkUrl: artwork[0].url,
            total_tracks
        }
    });
}

export const removeUserAlbum = async (parent, args, context) => {
    if (!context?.user?._id) throw new AuthenticationError('you must be logged in to query this schema'); 
    var { albums } = await User.findOne({ _id: context?.user?._id}).lean();
    albums = albums.reduce((acc, current) => { 
        if (current._id !== args._id) {
            acc.push(current)
        } 
        return acc
    }, []);
    await User.where({ _id: context?.user?._id}).update({ albums });

    return mapAlbums(albums);
}

const mapAlbums = (albums) => {
    return albums.map(async (album) =>  {       
        const { _id, name, artist, artwork, total_tracks } = await Album.findOne({_id: album._id}).lean();
        return { 
            _id, 
            name,
            artist, 
            artworkUrl: artwork[0].url,
            total_tracks
        }
    });
}