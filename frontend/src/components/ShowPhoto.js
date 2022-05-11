import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import AddComment from './AddComment'
import Comments from './Comments';

function ShowPhoto(props) {
    let { id } = useParams();
    const userContext = useContext(UserContext);
    const [photo, setPhoto] = useState([]);
    const [likes, setLikes] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [report, setReport] = useState(false);
    useEffect(function () {
        const getPhoto = async function () {
            const res = await fetch("http://localhost:3001/photos/" + id);
            const data = await res.json();
            setPhoto(data);
            setLikes(data.likes.length);
            console.log(userContext.user)
            //console.log(data)
            if (data.reports.includes(userContext.user?._id)) {
                setReport(true)
            }
        }
        getPhoto();
        // 
    }, []);

    async function like() {
        const res = await fetch('http://localhost:3001/photos/like/' + photo._id, {
            method: 'PUT',
            credentials: 'include',

        })
        const data = await res.json();
        console.log(data)
        if (data.name != undefined) {
            console.log(data.likes)
            setLikes(data.likes.length);
        }
    }

    async function deletePhoto() {
        const res = await fetch('http://localhost:3001/photos/' + photo._id, {
            method: 'DELETE',
            credentials: 'include',
        })
        const data = await res;
        if (data.ok) {
            setDeleted(true)
        }
    }
    async function reportPhoto() {
        const res = await fetch('http://localhost:3001/photos/report/' + photo._id, {
            method: 'PUT',
            credentials: 'include',
        })
        const data = await res;
        console.log(data)
        if (data.ok) {

            setReport(true)
        }
    }

    if (photo.path == undefined) {
        return (<></>)
    } else {
        return (
            <>
                {deleted ? <Navigate replace to="/" /> : ""}
                <div className="alert alert-primary">OP: {photo.postedBy.username}</div>
                {userContext.user ?
                    <div>
                        <button className="btn btn-danger mb-3 mr-2" onClick={deletePhoto} >Delete</button>
                        {report ? <button className="btn btn-danger mb-3" > Photo reported </button>
                            : <button className="btn btn-danger mb-3" onClick={reportPhoto} >Report</button>}
                    </div>
                    : ""}
                <div className="card bg-dark photo mx-auto d-block" >
                    <img className="card-img " src={"http://localhost:3001/" + photo.path} alt={photo.name} />
                    <div className="card-img-overlay text-left">
                        <h5 className="card-title"><span className="badge badge-secondary">{photo.name}</span></h5>
                    </div>
                </div >
                {userContext.user ?
                    <button className="mt-3 btn btn-danger" onClick={like}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                    </svg></button>
                    : ""}
                <div>{likes}</div>

                <div className="card mt-5 p-2" >
                    <AddComment photoId={photo._id} comments={photo.comments} ></AddComment>
                </div>
            </>

        )
    }
}
export default ShowPhoto;
