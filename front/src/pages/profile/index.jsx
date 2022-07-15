import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearJwt, selectJwt, setError, setJwt } from "../../store/user/authSlice";
import {Link} from "react-router-dom";

import {client} from "../../client";

export const Profile = () => {

    const dispatch = useDispatch();
    const reduxJwt = useSelector(selectJwt);
    const [userData, setUserData] = useState({
        id: "", 
        username: "", 
        password: "", 
        newPassword: ""
    });

    useEffect(() => {

        // Fetch and store user data
        (async function() {
            try {
                const response = await client.getUserData(reduxJwt);
                const {id, jwt, username, message} = await response.json();
                if(response.ok) {
                    setUserData({
                        ...userData,
                        id,
                        username,
                    });
                    dispatch(setJwt(jwt));
                } else {
                    dispatch(setError(message));
                    dispatch(clearJwt());
                }
            } catch (error) {
                dispatch(setError("Something went wrong"));
                dispatch(clearJwt());
            }
        })()
    }, []);

    // const [passEditable, setPassEditable] = useState(false);
    // const [password, setPassword] = useState("");
    // const [passwordConf, setPasswordConf] = useState("");

    // const handlePassEditable = (e) => {
    //     e.preventDefault();
    //     setPassEditable(!passEditable);
    // }

    // const match = password === passwordConf;

    return(
        <>
            <h1>Profile info</h1>
            <ul>
                <li>id: {userData.id}</li>
                <li>username: {userData.username}</li>
                {/* <li>
                    <p>Password </p>
                    <form action="">
                        {
                            passEditable ? (
                                <>
                                    {!match && <p style={{color: "red"}}>Passwords do not match</p> }
                                    <div>
                                        <label htmlFor="profile__password">New Password </label>
                                        <input id="profile__password" type="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                                    </div>
                                    <div>
                                        <label htmlFor="profile__password-conf">Confirm password </label>
                                        <input id="profile__password-conf" type="password" name="password-conf" value={passwordConf} onChange={(e) => {setPasswordConf(e.target.value)}}/>

                                    </div>
                                    <div>
                                        <input type="button" value="Change" />
                                        <input type="button" onClick={handlePassEditable} value="Cancel" />
                                    </div>
                                </>

                            ) : (
                                <div>
                                    <p>****</p>
                                    <input type="button" onClick={handlePassEditable} value="Edit" />
                                </div>
                            )
                        }
                    </form>
                </li> */}
            </ul>
            <Link to="/">Home</Link>
        </>
    )
}