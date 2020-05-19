import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const CURRENTUSER = gql`
{
    getUser {
      id
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

const AlbumPicker = () => {
    const { loading, error, data } = useQuery(CURRENTUSER);
    console.log({loading, error, data})
    return (
        <>
            <h1>Welcome user {data?.username}</h1>
            <div className="albumContainer">
                {data?.getSpotifyAlbums?.map(album => {
                    return <Album album={album} />
                })}
            </div>
        </>
    )
}

const Album = ({ album }) => {
    return (
        <div className="album">
            <img src={album?.artwork?.url} alt={album?.artists[0].name}  />
            <p>{album?.artists[0].name} - {album.name}</p>
        </div>
    )
} 

export default AlbumPicker