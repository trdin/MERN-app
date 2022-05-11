import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';

function Profile() {
    const userContext = useContext(UserContext);
    const [profile, setProfile] = useState({});

    useEffect(function () {
        const getProfile = async function () {
            const res = await fetch("http://localhost:3001/users/profile", { credentials: "include" });
            const data = await res.json();
            setProfile(data);
            console.log(data)
        }
        getProfile();
    }, []);

    return (
        <>
            {!userContext.user ? <Navigate replace to="/login" /> : ""}
            <h1>User profile</h1>
            <p>Username: {profile.user?.username}</p>
            <p>Email: {profile.user?.email}</p>
            <p>Number of Photos posted: {profile.photosNum}</p>
            <p>Number of likes recieved: {profile.likesNum}</p>
        </>
    );
}

export default Profile;