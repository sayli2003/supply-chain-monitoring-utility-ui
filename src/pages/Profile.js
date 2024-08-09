import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'mdb-react-ui-kit/dist/mdb-react-ui-kit.esm.js';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            setUserData(JSON.parse(localStorage.getItem('user')));
            console.log("User:",userData);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            setUserData(null);
            localStorage.setItem('user',null);
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Navbar />

            <div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        className="form-control"
                        type="text"
                        value={userData ? userData.name : ''}
                        placeholder="Default input"
                        aria-label="default input example"
                        disabled
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={userData ? userData.email : ''}
                        id="email"
                        placeholder="name@example.com"
                        disabled
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea
                        value={userData ? userData.addr : ''}
                        className="form-control"
                        id="address"
                        disabled
                    />
                </div>

                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}
