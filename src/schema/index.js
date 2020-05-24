import { gql } from 'apollo-boost';

export const CURRENTUSER = gql`
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