import { createSlice } from "@reduxjs/toolkit";

// Pull data from localStorage on initial load
const token = localStorage.getItem("token") || "";
const userId = localStorage.getItem("userId") || "";
const userName = localStorage.getItem("userName") || ""; // optional

const initialState = {
  user: {
    userName: userName,
    token: token,
    userId: userId,
  },
  isLoggedIn: !!token,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      
      const { userName, token, userId } = action.payload;

      state.user.userName = userName;
      state.user.token = token;
      state.user.userId = userId;
      state.isLoggedIn = true;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userName);
    },

    logoutUser: (state) => {
      
      state.user.userName = "";
      state.user.token = "";
      state.user.userId = "";
      state.isLoggedIn = false;

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
    },
  },
});

export const { loginUser, logoutUser } = UserSlice.actions;

export default UserSlice.reducer;
