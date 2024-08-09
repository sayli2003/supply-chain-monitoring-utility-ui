import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router for navigation
import '../styles/navbar.css'; // Import custom styles if needed
import uesrimg from '../styles/images/user.png';


export default function Navbar(){
    return (
        <nav className="navbar">
            <div className="container">
                <h1 className="navbar-brand">Uitility</h1>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Request</Link>
                    </li>
                    
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Track Request</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/profile" className="nav-link"><img src={uesrimg} width="25" height="25"/></Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
