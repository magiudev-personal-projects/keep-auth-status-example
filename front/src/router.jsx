import { useSelector } from "react-redux";
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
import { selectJwt } from "./store/user/authSlice";

export const Router = () => {

    const jwt = useSelector(selectJwt);


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