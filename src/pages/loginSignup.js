import React, { useEffect, useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'mdb-react-ui-kit/dist/mdb-react-ui-kit.esm.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function LoginSignUp() {

    const [register,setRegister]=useState(false);
    const [regClassName,setRegClassName]=useState("nav-link");
    const [loginClassName,setLoginClassName]=useState("nav-link active");
    const [error,setError]=useState("");
    const navigate = useNavigate();

    useEffect(() => {
      checkUserLogin();
    }, []);
  const checkUserLogin=() =>{
    const userData = JSON.parse(localStorage.getItem('user'));
    if(userData){
      if(userData.role==="customer"){
        navigate('/home');
      }
      else if(userData.role==="member"){
        navigate('/memberHome');
    }
    }
  };


    const handleRegister=() =>{
        setRegister(true);
        setLoginClassName("nav-link");
        setRegClassName("nav-link active");

    };
    
    const handleLoginForm=() =>{
        setRegister(false);
        setLoginClassName("nav-link active");
        setRegClassName("nav-link");
    };

    const [confirmPassword, setConfirmPassword] = useState('');

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
      };

    const [data, setData] = useState({
            name: '',
            email: '',
            password: '',
            role:'customer',
            addr:''
        });

    const handleSignUpChange = (e) => {
        const { name, value } = e.target;
        setData({
          ...data,
          [name]: value
        });
      };

    const handleSignUp = async (e) => {
        e.preventDefault();

        console.log(data)

        if (data.password !== confirmPassword) {
            setError('Passwords do not match');
            return;
          }


        try {
          const response = await axios.post('http://localhost:8080/supply-chain/signUp', data);
          console.log('Response:', response.data);
          if(response.data.username===data.name){
            const result = await axios.get(`http://localhost:8080/supply-chain/user/${response.data.userId}`);
            console.log('Response:', result.data);
            localStorage.setItem('user',JSON.stringify(result.data));
            navigate('/home');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const [signInData, setSignInData] = useState({
        email: '',
        password: ''
    });

    const handleSignInChange = (e) => {
        const { name, value } = e.target;
        console.log(name," ",value);
        setSignInData({
        ...signInData,
        [name]: value
        });
    };
      const handleSignIn = async (e) => {
        e.preventDefault();

        console.log(signInData);

        try {
            const response = await axios.post('http://localhost:8080/supply-chain/login', signInData);
          console.log('Response:', response.data);
          if(response.data.status){
            const result = await axios.get(`http://localhost:8080/supply-chain/user/${response.data.userId}`);
            console.log('Response:', result.data);
            localStorage.setItem('user',JSON.stringify(result.data));
            if(response.data.role==="customer"){
                 navigate('/home');
            }
            else if(response.data.role==="member"){
                navigate('/memberHome');
            }
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    
    
    return (
        <div style={{ height:'100vh',display: 'flex',justifyContent:'center',alignItems:'center'}}>
            <div className='form-container'>
                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className={loginClassName} id="tab-login" onClick={handleLoginForm} data-mdb-pill-init href="#pills-login" role="tab"
                    aria-controls="pills-login" aria-selected={!register}>Login</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className={regClassName} id="tab-register" onClick={handleRegister} data-mdb-pill-init href="#pills-register" role="tab"
                    aria-controls="pills-register" aria-selected={register}>Register</a>
                </li>
                </ul>

                <div className="tab-content">
                    

                    {!register && 
                    
                    <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                        <form>

                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email" name="email" value={signInData.email} onChange={handleSignInChange} aria-label="Email"></input>
                        </div>

                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Password" name="password" value={signInData.password} onChange={handleSignInChange} aria-label="Password"></input>
                        </div>
                    

                        <button type="submit" data-mdb-button-init data-mdb-ripple-init onClick={handleSignIn} className="btn btn-primary btn-block mb-4">Sign in</button>

                        <div className="text-center">
                            <p>Not a member? <a onClick={handleRegister} href=''>Register</a></p>
                        </div>
                        </form>
                    </div>
                    }

                    {register && 
                    <div className="tab-pane fade show active" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                        <form>

                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Name" name="name"  value={data.name} onChange={handleSignUpChange} aria-label="Name"></input>
                        </div>

                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email" name="email" value={data.email} onChange={handleSignUpChange} aria-label="Email"></input>
                        </div>

                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Password" name="password" value={data.password} onChange={handleSignUpChange} aria-label="Password"></input>
                        </div>

                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Confirm Password" name='confirmPassword' value={confirmPassword} onChange={handleConfirmPasswordChange} aria-label="Confirm Password"></input>
                        </div>

                        <div >{error}</div>
                        
                        

                        <div className="input-group mb-3">
                            <textarea className="form-control" placeholder="address" name='addr' value={data.addr} onChange={handleSignUpChange} aria-label="address"></textarea>
                        </div>

                        <button type="submit" data-mdb-button-init data-mdb-ripple-init onClick={handleSignUp} className="btn btn-primary btn-block mb-3">Sign up</button>
                        </form>
                    </div>
                    
                    }
                    
                    
                </div>
            
            </div>
                
        </div>
              )
    
}
