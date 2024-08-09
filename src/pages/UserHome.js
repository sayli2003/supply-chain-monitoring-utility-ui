import React, { useState,useEffect } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'mdb-react-ui-kit/dist/mdb-react-ui-kit.esm.js';
import Navbar from '../layout/Navbar';
import '../styles/homecard.css';
import axios from 'axios';


export default function UserHome() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/products/getProductInfo`);
            console.log('Response:', response.data);
            setProducts(response.data);
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
           <Navbar/>    

           <div className='items-container'>
           {products.map((product, index) => (
                <div className="card">
                    <div className="image"><span className="text">{product.details}</span></div>
                    <span className="title">{product.name}</span>
                    <span className="price">{product.cost}</span>
                </div>
            ))}
            

           </div>
            
        </div>
    )
    
}
