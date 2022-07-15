import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const Info = ({backgroundColor, text, action}) => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(action());
    }

    if (text === "") return (<></>);
    
    return (
        <div style={{backgroundColor, display: "flex", justifyContent: "space-between"}}>
            <p style={{color: "white"}}>{text}</p>
            <button onClick={handleClick}>X</button>
        </div>
    )
}
