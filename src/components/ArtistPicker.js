import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { USERSARTISTS, Add_User_Artist, RemoveUserArtist } from '../schema'

const ArtistPicker = () => {
    const [collectionData, updateData] = useState([]);

    const { loading, error, data } = useQuery(USERSARTISTS, {
        onCompleted: (data) =>  updateData(data.getUser.artists)
    });
    const [addUserArtist] = useMutation(Add_User_Artist, {
        onCompleted: (data) =>  updateData(data.addUserArtist)
    });
    const [removeUserArtist] = useMutation(RemoveUserArtist, {
        onCompleted: (data) => updateData(data.removeUserArtist)
    });

    return (
        <>
            {error && <h1>{error?.message}</h1>}
            {loading && <h1>Loading</h1>}
            {data && collectionData && (
                <ArtistPickerBody 
                    data={data} 
                    addUserArtist={addUserArtist} 
                    removeUserArtist={removeUserArtist} 
                    collectionData={collectionData} 
                />
            )}
        </>
    )
};

const ArtistPickerBody = ({ data, collectionData, addUserArtist, removeUserArtist }) => (
    <>
        <h1>Welcome user {data?.username}</h1>
        <h2>Artist you might like:</h2>
        <ul className="artistContainer">
            {data?.getSpotifyData?.artists?.map(artist => 
                <Artist artist={artist} key={artist?._id} addUserArtist={addUserArtist} collectionData={collectionData}/>
            )}
        </ul>
        <h2>Artist's in your collection:</h2>
            <ul className="artistContainer">
                {collectionData?.map((artist) => artist).map(artist => 
                    <Collection artist={artist} key={artist?._id} removeUserArtist={removeUserArtist} />
                )}
            </ul>
    </>
);

const Artist = ({ artist, addUserArtist, collectionData }) => (
    <li className="artist" >
        {/* <img src={artist.artistUrl} alt={artist.name}  /> */}
        <p>{artist.name}</p>
        <button 
            onClick={() => addUserArtist({ variables: {_id: artist._id}})}
            disabled={collectionData?.map(({_id}) => _id).includes(artist._id)}
        >
            +
        </button>
    </li>
)

const Collection = ({ artist, removeUserArtist }) => (
    <li className="artist" >
        <p>{artist?.name}</p>
        <button onClick={() => removeUserArtist({ variables: {_id: artist._id}})}>
            X
        </button>
    </li>
);

export default ArtistPicker;