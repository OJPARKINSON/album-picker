import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const CURRENTUSER = gql`
{
    getUser {
      _id
      username
    }
    getSpotifyAlbums {
      _id
      name
      artwork {
        url
      }
      artists {
        id
        name
        url
      }
    }
  }
`;
export const Add_User_Album = gql`
  mutation AddUserAlbum($_id: ID, $name: String, $url: String) {
    addUserAlbum(_id: $_id, name: $name, artworkUrl: $url) {
        _id
        name
        artworkUrl
    }
  }
`;

const AlbumPicker = () => {
    const { loading, error, data } = useQuery(CURRENTUSER);
    const [addUserAlbum] = useMutation(Add_User_Album);

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
                    {data?.getSpotifyAlbums?.map(album => {
                        return <Album album={album} addUserAlbum={addUserAlbum} key={album?._id} />
                    })}
                </ul>
                <h2>Album's in your collection:</h2>
            </>
        );
}

const Album = ({ album, addUserAlbum }) => {
    return (
        <li className="album" >
            <img src={album?.artwork?.url} alt={album?.artists[0].name}  />
            <p>{album?.artists[0].name} - {album.name}</p>
            <button onClick={() => addUserAlbum({ variables: {_id: album?._id, name: album?.artists[0].name, url: album?.artwork?.url}})}>+</button>
        </li>
    )
} 

export default AlbumPicker