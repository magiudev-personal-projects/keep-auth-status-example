import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { clearError, register, selectError, selectFetching } from "../store/user/authSlice";
import useForm from "../hooks/useForm";
import { Info } from "../components/info";
import { useEffect } from "react";

export const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetching = useSelector(selectFetching);
    const error = useSelector(selectError);

    const [form, setForm] = useForm({username: "", password: ""});

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(form)).unwrap().then(() => {
            navigate("/login");
        });
    }

    /*
        The return function will run also whe the component is mounted if we are in dev mode and strict mode.
        https://reactjs.org/docs/strict-mode.html#ensuring-reusable-state
    */

    useEffect(() => {
        return () => { 
            if (error !== "") dispatch(clearError()); 
        }
    }, [error]);

    return (
        <>
            <Info backgroundColor="red" text={error} action={clearError}/>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="register__username">Username: </label>
                    <input 
                        id="register__username" 
                        type="text" 
                        name="username" 
                        value={form.username}
                        onChange={setForm}
                    />
                </div>
                <div>
                    <label htmlFor="register__password">Password: </label>
                    <input 
                        id="register__password" 
                        type="password" 
                        name="password"
                        value={form.password}
                        onChange={setForm}
                    />
                </div>
                <div><input type="submit" value="Register" disabled={fetching}/></div>
            </form>
            <Link to="/login">Log In</Link>
        </>
    )
}