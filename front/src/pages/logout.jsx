import { useEffect } from "react"
import { Link } from "react-router-dom";

export const Logout = () => {
    useEffect(() => {
        return () => {
            console.log("logout");
        }
    }, [])
    return (
        <>
            <h1>logout</h1>
            <div><button>Log out</button></div>
            <Link to="/">Home</Link>
        </>
    )
}
