import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store.js";
import Login from "./pages/login.jsx";
import Signup from "./pages/SignUp.jsx";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './index.css';
import Header from "./components/Header.jsx"
import { SnackbarProvider } from "notistack";

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <Routes>

      <Route path="/" element={isLoggedIn ?
       <>
        <Header />
         <App /> 
         </>
         : <Navigate to="/login" />} />
      <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
      <Route path="/signup" element={!isLoggedIn ? <Signup /> : <Navigate to="/" />} />
    </Routes>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <SnackbarProvider>
        <AppRoutes />
        </SnackbarProvider>
      </Provider>
    </Router>
  </StrictMode>
);
