import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { USERSARTISTS } from '../schema'

const ArtistPicker = () => {
    const { loading, error, data } = useQuery(USERSARTISTS);
    console.log({ loading, error, data })
    return (
        <>
            {error && <h1>{error?.message}</h1>}
            {loading && <h1>Loading</h1>}
            {data && <ArtistPickerBody data={data.getSpotifyData.artists} />}
        </>
    )
};

const ArtistPickerBody = ({ data }) => (
    <>
        <h1>Welcome user {data?.username}</h1>
        <h2>Artist you might like:</h2>
            {data?.map(artist => 
                    <Artist artist={artist} key={artist?._id} />
            )}
        <h2>Artist's in your collection:</h2>
        <ul className="artistContainer">
            {/* <ul className="albumContainer">
                {collectionData?.map(album => 
                    <ArtistCollection album={album} removeUserAlbum={removeUserAlbum} key={album?._id} />
                )}
            </ul> */}
        </ul>
    </>
);

const Artist = ({ artist }) => (
    <li className="artist" >
        {/* <img src={artist.artistUrl} alt={artist.name}  /> */}
        <p>{artist.name}</p>
        {/* <button 
            onClick={() => addUserAlbum({ variables: {_id: album._id, artist_id: album.artist._id}})}
            disabled={collectionData.map(({_id}) => _id).includes(album._id)}
        >
            +
        </button> */}
    </li>
)

export default ArtistPicker;