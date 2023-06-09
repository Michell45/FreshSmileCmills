import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


export const Profile = () => {
    const { user, isAutenticated } = useAuth0();


    return (
        isAutenticated && (
            <div> <img src={user.picture} alt="user.name" />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
        )
    );
};

export default Profile;