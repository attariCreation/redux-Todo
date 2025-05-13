import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Login from "./pages/login.jsx";
import Signup from "./pages/SignUp.jsx";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router> 
    <Provider store={store}>
      <Routes> 
      <Route path="/" element={<App />} />
      <Route path="/login"  element={ <Login/> }/>
      <Route path="/signup" element={<Signup />} />
    
      </Routes>
    </Provider>
    </Router>
  </StrictMode>
);
