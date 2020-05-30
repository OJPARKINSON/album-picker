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
                    _id
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
                _id
                name
            }
        }
    }
`;
export const USERSARTISTS = gql`
    {
        getUser {
            _id
            username
            albums {
                _id
                name
                artist {
                    _id
                    name
                }
                artworkUrl
                total_tracks
            }
        }
        getUserArtists {
            _id
            name
            url
            artistUrl
        }
    }
`;
export const Add_User_Album = gql`
  mutation AddUserAlbum($_id: ID!, $artist_id: String!) {
    addUserAlbum(_id: $_id, artist_id: $artist_id) {
      _id
      name
      artworkUrl
      artist {
        _id
        name
      }
    }
  }
`;
export const RemoveUserAlbum = gql`
  mutation RemoveUserAlbum($_id: ID!, $artist_id: String!) {
    removeUserAlbum(_id: $_id, artist_id: $artist_id) {
      _id
      name
      artworkUrl
      artist {
        _id
        name
      }
    }
  }
`;