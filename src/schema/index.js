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
            artists {
                _id
                name
                url
            }
        }
        getSpotifyData {    
            albums {
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
            artists {
                _id
                name
                url
                artistUrl
            }
        }
        getSpotifyData {
            artists {
                _id
                name
                url
            }
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

export const Add_User_Artist = gql`
  mutation addUserArtist($_id: ID!) {
    addUserArtist(_id: $_id) {
        _id
        name
        url
        artistUrl
    }
  }
`;
export const RemoveUserArtist = gql`
  mutation removeUserArtist($_id: ID!) {
    removeUserArtist(_id: $_id) {
        _id
        name
        url
        artistUrl
    }
  }
`;