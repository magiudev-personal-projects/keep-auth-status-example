import config from "../config";
const backUrl = config.backUrl;

const registerUser = async ({username, password}) => {
    const body = JSON.stringify({username, password});
    const response = await fetch(`${backUrl}/users/register`, {
        method: "POST",
        body,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

const loginUser = async ({username, password}) => {
    const body = JSON.stringify({username, password});
    const response = await fetch(`${backUrl}/users/login`, {
        method: "POST",
        body,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

const getUserData = async (jwt) => {
    const auth = String(jwt);
    const response = await fetch(`${backUrl}/users/user`, {
        headers: {
            'Content-Type': 'application/json',
            'auth': auth 
        }
    });
    return response;
}

export const client = {
    registerUser,
    loginUser,
    getUserData
}