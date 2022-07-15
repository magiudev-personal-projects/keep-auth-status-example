import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { client } from "../../client";

export const setJwtLocalStorage = createAsyncThunk("setJwtLocalStorage", (jwt, {dispatch}) => {
    localStorage.setItem("jwt", jwt);
    dispatch(setJwt(jwt));
});

export const logout = createAsyncThunk("logout", (_, {dispatch}) => {
    localStorage.removeItem("jwt");
    dispatch(clearJwt());
});

export const register = createAsyncThunk("register", async ({username, password}) => {
    let res;
    let msg;
    try {
        res = await client.registerUser({username, password});
        const {message} = await res.json();
        msg = message;
    } catch (error) {
        res = {ok: false};
        msg = "An error occurred while registering the user. Please try again or try to login.";
    } finally { // Remember that a 401 response does not throw an error 
        if(!res.ok) throw new Error(msg);
        return msg;
    }
});

export const login = createAsyncThunk("login", async ({username, password}) => {
    let res;
    let jwt;
    let msg;
    try {
        res = await client.loginUser({username, password});
        const {jwt:token, message} = await res.json();
        jwt = token;
        msg = message;
    } catch (error) {
        res = {ok: false};
        msg = "An error occurred. Please try again.";
    } finally {
        if(!res.ok) throw new Error(msg);
        localStorage.setItem("jwt", jwt);
        return jwt;
    }
});

const initialState = {
    jwt: "",
    fetching: false,
    error: "",
    message: ""
}

export const selectFetching= (state) => state.auth.fetching;
export const selectError = (state) => state.auth.error;
export const selectMessage = (state) => state.auth.message;
export const selectJwt = (state) => state.auth.jwt;

const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearMessage:{
            reducer(state) {
                state.message = "";
            }
        },
        clearError: {
            reducer(state) {
                state.error = "";
            }
        },
        clearJwt: {
            reducer(state) {
                state.jwt = "";
            }
        },
        setError: {
            reducer(state, action) {
                state.error = action.payload;
            }
        },
        setJwt: {
            reducer(state, action) {
                state.jwt = action.payload;
            }
        }
    },
    extraReducers(builder){
        builder

            // Register
            .addCase(register.pending, (state) => {
                state.fetching = true;
                state.error = "";
            })
            .addCase(register.fulfilled, (state, action) => {
                state.fetching = false;
                state.message = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.fetching = false;
                state.error = action.error.message;
                state.message = "";
            })

            // Log in
            .addCase(login.pending, (state) => {
                state.fetching = true;
                state.error = "";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.jwt = action.payload;
                state.fetching = false;
                state.error = "";
                state.message = "";
            })
            .addCase(login.rejected, (state, action) => {
                state.jwt = "";
                state.fetching = false;
                state.error = action.error.message;
            })

            // Set jwt in the localStorage
            .addCase(setJwtLocalStorage.rejected, (state) => {
                state.jwt = "";
                state.error = "Something went wrong. Please log in.";
                state.message = "";
            })

            // Log out
            .addCase(logout.rejected, (state) => {
                state.error = "Something went wrong. Please try again.";
            })
        }
});

export default userSlice.reducer;
export const {clearMessage, clearError, clearJwt, setError, setJwt} = userSlice.actions;