import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { logout } from "../store/user/authSlice";
import { clearError, selectError} from "../store/user/authSlice";
import { useEffect } from "react";
import { Info } from "../components/info";


export const Logout = () => {

    const error = useSelector(selectError);

    useEffect(() => {
        return () => {
            if(error !== "") dispatch(clearError());
        }
    }, [error]);

    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(logout());
    }

    return (
        <>
            <Info backgroundColor="red" text={error} action={clearError}/>
            <h1>logout</h1>
            <div><button onClick={handleClick}>Log out</button></div>
            <Link to="/">Home</Link>
        </>
    )
}
