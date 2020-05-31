import axios from 'axios';
import { Album, Artist } from '../utils/mongoose';

export const mapAlbums = (albums) => {
    return albums?.map(async (album) =>  {
        const { _id, name, artist, artwork, total_tracks } = await Album.findOne({_id: album?._id}).lean();
        return { 
            _id, 
            name,
            artist, 
            artworkUrl: artwork.url,
            total_tracks
        }
    });
}

export const mapArtists = (artists) => {
    return artists.map(async (artists) =>  {
        if (!artists?._id) artists = artists._id = 1;  
        const {_id, name, url} = await Artist.findOne({_id: artists?._id}).lean();
        return {_id, name, url}
    });
}

export const saveAlbums = (accessToken) => {
    axios({
        url: "https://api.spotify.com/v1/me/albums",
        method: "get",
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            Accept: "application/json"
        }
    })
    .then(res => {
        res.data.items.map(({ album }) => {
        let { id, name, tracks, artists, images, total_tracks } = album;
        artists = artists.reduce((acc, {id, name, external_urls} ) => {
            if (id && name && external_urls) {
                acc.push({_id: id, name, url: external_urls.spotify})
                new Artist({_id: id, name, url: external_urls.spotify}).save()
            }  
            return acc
        }, [])

        tracks = tracks.items.reduce((acc, {id, name, uri} ) => {
            (id && name && uri) && acc.push({id, name, uri})
            return acc
        }, [])
        new Artist({artists})
        new Album({ _id: id, name, tracks: tracks.items, artist: artists[0], artwork: { url: images[0].url}, total_tracks}).save()
        return { _id: id, name, tracks: tracks.items, artist: artists[0], artworkUrl: images[0].url, total_tracks}
        })  
    })
};

export const saveArtists = async (accessToken) => {
    axios({
        url: `https://api.spotify.com/v1/me/tracks`,
        method: "get",
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            Accept: "application/json"
        }
    })
    .then(res => {
        const tracks = res.data.items.map(({track}) => {
            const { id, name, external_urls } = track?.album?.artists[0]
            new Artist({_id: id, name, url: external_urls.spotify}).save()
            return { _id: id, name, url: external_urls.spotify }
        })
        return tracks
    })
    .catch(err => console.error(err));
};
