import { useContext, useState } from 'react'
import { Navigate } from 'react-router';
import { UserContext } from '../userContext';
import Button from './Button'

function AddPhoto(props) {
    const userContext = useContext(UserContext);
    const [name, setName] = useState('');
    const [file, setFile] = useState('');
    const [uploaded, setUploaded] = useState(false);
    const [tag1, setTag1] = useState('');
    const [tag2, setTag2] = useState('');
    const [tag3, setTag3] = useState('');

    async function onSubmit(e) {
        e.preventDefault();

        if (!name) {
            alert("Vnesite ime!");
            return;
        }
        var tags = new Array(tag1, tag2, tag3)
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', file);
        formData.append('tags', tags)
        const res = await fetch('http://localhost:3001/photos', {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        const data = await res.json();

        setUploaded(true);
    }

    return (
        <form className="form-group" onSubmit={onSubmit}>
            {!userContext.user ? <Navigate replace to="/login" /> : ""}
            {uploaded ? <Navigate replace to="/" /> : ""}
            <div className="form-group">
                <input type="text" className="form-control" name="ime" placeholder="Ime slike" value={name} onChange={(e) => { setName(e.target.value) }} />
            </div>
            <div className="form-group">
                <label>Izberi sliko</label>
                <input type="file" className="form-control" id="file" onChange={(e) => { setFile(e.target.files[0]) }} />
            </div>
            <div className="form-group">
                <input type="text" className="form-control mb-2" name="tag1" placeholder="tag1" value={tag1} onChange={(e) => { setTag1(e.target.value) }} />
                <input type="text" className="form-control mb-2" name="tag2" placeholder="tag2" value={tag2} onChange={(e) => { setTag2(e.target.value) }} />
                <input type="text" className="form-control mb-2" name="tag3" placeholder="tag3" value={tag3} onChange={(e) => { setTag3(e.target.value) }} />
            </div>
            <Button text="Naloži" />
        </form>
    )
}

export default AddPhoto;