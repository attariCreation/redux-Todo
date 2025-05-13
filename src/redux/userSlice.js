import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        userName: "",
        token: ""
    }
};
export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.user.userName = action.payload.userName;
            state.user.token = action.payload.token;

            localStorage.setItem("token", action.payload.token);
        },
        logoutUser: (state) => {
            state.user.userName = "";
            state.user.token = "";

            localStorage.removeItem("token");
        },
    },
});

export const { loginUser, logoutUser } = UserSlice.actions;

export default UserSlice.reducer;
