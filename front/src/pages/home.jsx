import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectJwt } from "../store/user/authSlice";

export const Home = () => {

    const jwt = useSelector(selectJwt);

    return(
        <>
            <h1>Home</h1>
            <ul>
                {
                    jwt ? (
                        <>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/logout">Log out</Link></li>

                        </>
                    ) : (
                        <>
                            <li><Link to="/Register">Register</Link></li>
                            <li><Link to="/login">Log In</Link></li>
                        </>
                    )
                }
            </ul>
        </>
    );
} 