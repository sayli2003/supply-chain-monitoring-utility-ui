import logo from './logo.svg';
import './App.css';
import LoginSignUp from './pages/loginSignup.js';
import './styles/loginSignup.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import MemberHome from './pages/MemberHome.js';
import UserHome from './pages/UserHome.js';
import Profile from './pages/Profile.js';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
      <Route index element={<LoginSignUp/>}></Route>
      <Route path='/home' element={<UserHome/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      
      <Route path='/memberHome' element={<MemberHome/>}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
