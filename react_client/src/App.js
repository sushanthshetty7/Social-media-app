

import Home from "./pages/Home/Home";
import Profile from "./pages/Home/profile/profile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from "./pages/Login/login";
import Register from "./pages/register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";


function App() {
  const {user} = useContext(AuthContext)
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={user?<Home/> : <Register/>}/>
      <Route exact path="/login" element={user?<Navigate replace to="/"/>:<Login/> }/>;
      <Route exact path="/register" element={user?<Navigate replace to="/"/>:<Register/>}/>
      <Route exact path="/Messenger" element={!user?<Navigate replace to="/"/>:<Messenger/>}/>
      <Route exact path="/profile/:username" element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;  
