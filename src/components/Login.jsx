import React, { useEffect } from "react";  
import "./Login.scss";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {loginRequest} from "../redux/loginRequest";
import { useDispatch} from "react-redux";
import { setUser} from "../redux/authReducer";
import { fetchCartByUserId, addToCart, fetchProductById } from "../redux/cartReducer";
import { unwrapResult } from "@reduxjs/toolkit";
//import { authRequest } from "../redux/authReducer";


const Login = () => {
   
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [users, setUsers] = useState(null);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    
    useEffect(() => {
        fetch("https://fakestoreapi.com/users")
            .then((res) => res.json())
            .then((json) => setUsers(json));
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username && password) {
                       
            const res = await loginRequest(dispatch, username, password);

           
            if (res) {
                const user = users.find((user) => user.username === username);
                dispatch(setUser({user}));

                dispatch(fetchCartByUserId(user.id))
                .then(unwrapResult)
                .then((cart) => {
                
                    console.log(cart);
                    
                    cart.forEach((product) => {
                        dispatch(fetchProductById(product.productId))
                        .then(unwrapResult)
                        .then((item) => {

                           
                           dispatch(addToCart({
                            productId: product.productId,
                            quantity: product.quantity,
                            price: item.price,
                            title: item.title,
                            image: item.image
                            
                            }));
                       })}).catch((err) => console.log(err+ "error"));
                }).catch((err) => console.log(err));
                setUsername("");
                setPassword("");
                const { from } = location.state || { from: { pathname: "/" } };
                navigate(from);
            } else {
                setErrorMsg("Username or Password is incorrect");
            }
            
        }

 
    };


         


        
    return (
        <div className="login">
            
                 <h1>Login</h1>
                <form onSubmit={handleSubmit}>
               
                <label>Username</label>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label>Password</label>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
                <span className="error">{errorMsg}</span>
              </form>
            <Link to="/Register">Register</Link>

        

        </div>
    );
    }

export default Login;
