import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { clearError, clearMessage, login, selectError, selectFetching, selectMessage } from "../store/user/authSlice";
import useForm from "../hooks/useForm";
import {Info} from "../components/info";
import { useEffect } from "react";

export const Login = () => {

    const dispatch = useDispatch();
    
    const fetching = useSelector(selectFetching);
    const message = useSelector(selectMessage);
    const error = useSelector(selectError);

    const [form, setForm] = useForm({username: "", password: ""});

    const handleSubmit = (e) => {
        e.preventDefault();
        if(message !== "") dispatch(clearMessage());
        dispatch(login(form));
    }

    /*
        The return function will run also whe the component is mounted if we are in dev mode and strict mode.
        https://reactjs.org/docs/strict-mode.html#ensuring-reusable-state
    */
    useEffect(() => {
        return () => {
            if(error !== "") dispatch(clearError());
        }
    }, [error]);

    useEffect(() => {
        return () => {
            if(message !== "") dispatch(clearMessage());
        }
    }, [message]);

    
    return (
        <>
            <Info backgroundColor="red" text={error} action={clearError}/>
            <Info backgroundColor="blue" text={message} action={clearMessage}/>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="login__username">Username: </label>
                    <input 
                        id="login__username" 
                        type="text" 
                        name="username"
                        value={form.username}
                        onChange={setForm}
                    />
                </div>
                <div>
                    <label htmlFor="login__password">Password: </label>
                    <input 
                        id="login__password" 
                        type="password" 
                        name="password"
                        value={form.password}
                        onChange={setForm}
                    />
                    </div>
                <div><input type="submit" value="Log In" disabled={fetching} /></div>
            </form>
            <Link to="/register">Register</Link>
        </>
    )
}
