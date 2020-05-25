import { gql } from 'apollo-boost';

export const CURRENTUSER = gql`
    {
        getUser {
            _id
            username
            albums {
                _id
                name
                artist {
                    name
                }
                artworkUrl
                total_tracks
            }
        }
        getSpotifyAlbums {
            _id
            name
            artworkUrl
            total_tracks
            artist {
                name
            }
        }
    }
`;
export const Add_User_Album = gql`
  mutation AddUserAlbum($_id: ID!) {
    addUserAlbum(_id: $_id) {
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
  mutation RemoveUserAlbum($_id: ID!) {
    removeUserAlbum(_id: $_id) {
      _id
      name
      artworkUrl
      artist {
        name
      }
    }
  }
`;