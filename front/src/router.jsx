import { useSelector, useDispatch } from "react-redux";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Logout } from "./pages/logout";
import { Profile } from "./pages/profile";
import { Register } from "./pages/register";
import { clearJwt, selectJwt, setJwt } from "./store/user/authSlice";
import {useEffect} from "react";

export const Router = () => {

    const dispatch = useDispatch();
    const jwt = useSelector(selectJwt);

    useEffect(() => {
        try {
            const jwt = localStorage.getItem("jwt");
            dispatch(setJwt(jwt));
        } catch (error) {
            dispatch(clearJwt());
        }
    }, []);

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                {
                    jwt ? 
                    (
                        <>
                            <Route path="/profile" element={<Profile />}/>
                            <Route path="/logout" element={<Logout />}/>
                            <Route path="*" element={<Navigate to="/profile" />}/>
                        </>
                    ) : 
                    (
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </>
                    )
                }
            </Routes>
        </BrowserRouter>
    )
}