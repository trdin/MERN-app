import { useState, useEffect } from 'react';
import Photo from './Photo';

function Decay() {
    const [photos, setPhotos] = useState([]);

    useEffect(function () {
        const getPhotos = async function () {
            const res = await fetch("http://localhost:3001/photos/show/decay");
            const data = await res.json();
            setPhotos(data);
            console.log(data);
        }
        getPhotos();
    }, []);

    return (
        <div>
            <h3>Photos:</h3>
            <>
                {photos?.map(photo => (<Photo photo={photo} key={photo._id}></Photo>))}
            </>
        </div >
    );
}

export default Decay;