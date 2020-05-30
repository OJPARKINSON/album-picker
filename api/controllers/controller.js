import axios from 'axios';
import { User, Album, Artist } from '../utils/mongoose';
import { AuthenticationError } from "apollo-server-core";

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
    const { _id, username, albums} = await User.findOne({ _id: context?.user?._id}).lean();
    
    const newAlbums = mapAlbums(albums);

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
        .then(res => saveAlbums(res.data.items))
        .then(data => saveArtists(data, user.accessToken))
        .catch(err => console.error(err));
}

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

export const getUserArtists = async (parent, args, context) => {
    if (!context?.user?._id) throw new AuthenticationError('you must be logged in to query this schema');
    var { artists } = await User.findOne({ _id: context?.user?._id}).lean();
    return artists.map(async artist => {
        var { _id, name, url, image } = await Artist.findOne({ _id: artist._id}).lean();

        return { _id, name, url, artistUrl: image.url }
    });
}

const mapAlbums = (albums) => {
    return albums.map(async (album) =>  {       
        const { _id, name, artist, artwork, total_tracks } = await Album.findOne({_id: album._id}).lean();
        return { 
            _id, 
            name,
            artist, 
            artworkUrl: artwork.url,
            total_tracks
        }
    });
}

const saveAlbums = (albums) => {
    return albums.map(({ album }) => {
        let { id, name, tracks, artists, images, total_tracks } = album;
        artists = artists.reduce((acc, {id, name, href} ) => {
            (id && name && href) && acc.push({_id: id, name, url: href})
            return acc
        }, [])

        tracks = tracks.items.reduce((acc, {id, name, uri} ) => {
            (id && name && uri) && acc.push({id, name, uri})
            return acc
        }, [])
        
        new Album({ _id: id, name, tracks: tracks.items, artist: artists[0], artwork: { url: images[0].url}, total_tracks}).save()
        return { _id: id, name, tracks: tracks.items, artist: artists[0], artworkUrl: images[0].url, total_tracks}
    });
};

const saveArtists = async (albums, accessToken) => {
    axios({
        url: `https://api.spotify.com/v1/artists?ids=${albums.map(({ artist }) => artist._id).join(',')}`,
        method: "get",
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            Accept: "application/json"
        }
    })
    .then(res => {
        res.data.artists.map(({id, name, external_urls, images}) => {
            new Artist({_id: id, name, url: external_urls.spotify, image: { url: images[0].url }}).save()
            return {_id: id, name, url: external_urls.spotify, image: { url: images[0].url }}
        })
        return res.data.artists.map(({id, name, external_urls, images}) => ({_id: id, name, url: external_urls.spotify, image: { url: images[0].url}}))
    })
    .catch(err => console.error(err));
    return albums
};
