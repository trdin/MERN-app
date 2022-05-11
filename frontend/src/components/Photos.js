import { useState, useEffect } from 'react';
import Photo from './Photo';

function Photos() {
    const [photos, setPhotos] = useState([]);
    const [search, setSearch] = useState('');
    const [searchParam, setSearchParam] = useState('');

    useEffect(function () {
        const getPhotos = async function () {
            const res = await fetch("http://localhost:3001/photos");
            const data = await res.json();
            setPhotos(data);
        }
        getPhotos();
    }, []);

    async function Search(e) {
        e.preventDefault();
        /*if (!search) {
            alert("input tag!");
            return;
        }*/
        const res = await fetch('http://localhost:3001/photos/search', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                search: search
            })
        })
        const data = await res.json();
        setPhotos(data);
        setSearchParam(search);

        console.log(data)

    }

    return (
        <div>
            <form onSubmit={Search} className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" name="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" >Search by tag</button>
            </form>
            {(searchParam != "") ?
                <div className="text-left">
                    <span>search parameters: {searchParam}</span>
                </div> : ""}
            <h3>Photos:</h3>
            <>
                {photos.map(photo => (<Photo photo={photo} key={photo._id}></Photo>))}
            </>
        </div >
    );
}

export default Photos;