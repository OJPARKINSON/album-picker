import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const CURRENTUSER = gql`
{
    getUser {
      _id
      username
      albums {
        _id
        name
        artworkUrl
        artist {
            name
        }
      }
    }
    getSpotifyAlbums {
      _id
      name
      artworkUrl
      artist {
        name
      }
    }
  }
`;
export const Add_User_Album = gql`
  mutation AddUserAlbum($_id: ID!, $name: String!, $artworkUrl: String!, $artist: String!) {
    addUserAlbum(_id: $_id, name: $name, artworkUrl: $artworkUrl, artist: $artist) {
      _id
      name
      artworkUrl
      artist {
        name
      }
    }
  }
`;

export const RemoveUserAlbum = gql`
  mutation RemoveUserAlbum($_id: ID!, $name: String!, $artworkUrl: String!, $artist: String!) {
    removeUserAlbum(_id: $_id, name: $name, artworkUrl: $artworkUrl, artist: $artist) {
      _id
      name
      artworkUrl
      artist {
        name
      }
    }
  }
`;

const AlbumPicker = () => {
    const { loading, error, data } = useQuery(CURRENTUSER);
    const [addUserAlbum, mdata] = useMutation(Add_User_Album);
    const [removeUserAlbum, rmdata] = useMutation(RemoveUserAlbum);

    console.log({rmdata})
    
    var collectionData = data?.getUser?.albums?.length < mdata?.data?.addUserAlbum?.length ? mdata?.data?.addUserAlbum : data?.getUser?.albums
        .reduce((acc, current) => {acc.includes(current) === false && acc.push(current); return acc;},[])

    return error ? 
        <h1>
            {error?.message}
        </h1> 
            : 
        (
            <>
                <h1>Welcome user {data?.username}</h1>
                <h2>Albums you might like:</h2>
                <ul className="albumContainer">
                    {data?.getSpotifyAlbums?.map(album => 
                        <Album album={album} collectionData={collectionData} addUserAlbum={addUserAlbum} key={album?._id} />
                    )}
                </ul>
                <h2>Album's in your collection:</h2>
                <ul className="albumContainer">
                    {collectionData?.map(album => 
                        <Collection album={album} removeUserAlbum={removeUserAlbum} key={album?._id} />
                    )}
                </ul>
            </>
        );
}

const Album = ({ album, addUserAlbum, collectionData }) => {
    const { _id, name, artworkUrl, artist} = album;
    return (
        <li className="album" >
            <img src={album.artworkUrl} alt={album?.artist?.name}  />
            <p>{album?.artist?.name} - {album?.name}</p>
            <button 
                onClick={() => addUserAlbum({ variables: {_id, name, artworkUrl, artist: artist.name}})}
                disabled={collectionData.map(({_id}) => _id).includes(album._id)}
            >
                +
            </button>
        </li>
    )
} 

const Collection = ({ album, removeUserAlbum }) => {
    const { _id, name, artworkUrl, artist} = album;
    return (
        <li className="album" >
            <img src={album.artworkUrl} alt={album?.artist?.name}  />
            <p>{album?.artist?.name} - {album.name}</p>
            <button onClick={() => removeUserAlbum({ variables: {_id, name, artworkUrl, artist: artist.name}})}>
                X
            </button>
        </li>
    )
} 

export default AlbumPicker