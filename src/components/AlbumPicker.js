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
      id
      name
      artwork {
        url
      }
      artist {
        id
        name
        url
      }
    }
  }
`;

const Login = () => {
    const { loading, error, data } = useQuery(CURRENTUSER);
    console.log({loading, error, data})
    return (
        <>
            <h1>Welcome user {data?.username}</h1>
        </>
    )
}

export default Login