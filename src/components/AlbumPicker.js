import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CURRENTUSER, Add_User_Album, RemoveUserAlbum } from '../schema'

const AlbumPicker = () => {
    const [collectionData, updateData] = useState([]);

    const { loading, error, data } = useQuery(CURRENTUSER, {
        onCompleted: (data) => updateData(data.getUser.albums)
    });
    const [addUserAlbum] = useMutation(Add_User_Album, {
        onCompleted: (data) =>  updateData(data.addUserAlbum)
    });
    const [removeUserAlbum] = useMutation(RemoveUserAlbum, {
        onCompleted: (data) => updateData(data.removeUserAlbum)
    });
    
    return (
        <>
            {error && (<h1>{error?.message}</h1>)}
            {loading && (<h1>Loading</h1>)}
            {data && collectionData && (
                <AlbumPickerBody 
                    data={data} 
                    collectionData={collectionData} 
                    addUserAlbum={addUserAlbum} 
                    removeUserAlbum={removeUserAlbum} 
                />
            )}
        </>
    );
}

const AlbumPickerBody = ({data, collectionData, addUserAlbum, removeUserAlbum}) => (
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

const Album = ({ album, addUserAlbum, collectionData }) => {
    console.log({album})
    return (
    <li className="album" >
        <img src={album.artworkUrl} alt={album?.artist?.name}  />
        <p>{album?.artist?.name} - {album?.name}</p>
        <button 
            onClick={() => addUserAlbum({ variables: {_id: album._id, artist_id: album.artist._id}})}
            disabled={collectionData.map(({_id}) => _id).includes(album._id)}
        >
            +
        </button>
    </li>
)};


const Collection = ({ album, removeUserAlbum }) => (
    <li className="album" >
        <img src={album.artworkUrl} alt={album?.artist?.name}  />
        <p>{album?.artist?.name} - {album.name}</p>
        <button onClick={() => removeUserAlbum({ variables: {_id: album._id, artist_id: album.artist._id}})}>
            X
        </button>
    </li>
);

export default AlbumPicker