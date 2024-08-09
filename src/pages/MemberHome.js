import React, { useState,useEffect } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'mdb-react-ui-kit/dist/mdb-react-ui-kit.esm.js';
import Navbar from '../layout/Navbar';
import '../styles/homecard.css';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import axios from 'axios';


export default function MemberHome() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      

      loadRequests();
    }, []);

    const loadRequests = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/requests`);
            console.log('Response:', response.data);
            setRequests(response.data);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const [rowData, setRowData] = useState([
      { make: "Tesla", model: "Model Y", price: 64950, electric: true },
      { make: "Ford", model: "F-Series", price: 33850, electric: false },
      { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);
    
    // Column Definitions: Defines the columns to be displayed.
    // const [colDefs, setColDefs] = useState([
    //   { field: "make" },
    //   { field: "model" },
    //   { field: "price" },
    //   { field: "electric" }
    // ]);
    
    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
      { headerName: 'Request ID', field: 'reqID' },
      { headerName: 'User ID', field: 'userID' },
      { headerName: 'Product ID', field: 'prodID' },
      { headerName: 'Date of Request', field: 'dateOfReq' },
      { headerName: 'Type', field: 'type' },
      { headerName: 'Quantity', field: 'quantity' },
      { headerName: 'Total Cost', field: 'totalCost' },
      { headerName: 'Comment', field: 'comment' }
    ]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (

        <div>
           <Navbar/>    

           <div>

           <div
              className="ag-theme-quartz" // applying the Data Grid theme
              style={{ height: 500 }} // the Data Grid will fill the size of the parent container
            >
              <AgGridReact
                  rowData={requests}
                  columnDefs={colDefs}
              />
            </div>
            
            

           </div>

      
            
        </div>
    )
    
}
