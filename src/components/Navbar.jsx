import React from 'react';
import "./Navbar.scss";
import { Link } from 'react-router-dom';
import Cart from './Cart';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import {useSelector} from 'react-redux';
import { useState } from "react";

import { useEffect } from 'react';
import { isAuthenticated } from '../redux/authReducer';

const Navbar = () => {
    const [open , setOpen] = useState(false);
   
    
    const products = useSelector((state) => state.cart.products);
    const isAuth = useSelector(isAuthenticated);
    const [categories, setCategories] = useState([]);
   

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
            });
    }, []);
   
    
  
    
    return (
        <div className="navbar">
            <div className='wrapper'>
                <div className='left'>
                    <Link className='link' to='/'>FAKESHOP</Link>
                </div>
                <div className='center'>
                   {categories.map((category, i) => (
                   <Link to={`/products/${category}`} key={i} > {category} </Link>
                  ))}
                </div>
                <div className='right'>
                    
                    <Link className='link' to='/Admin'>Admin</Link>
                    {isAuth?  <Link className='link' to='/Logout'>Logout</Link>: <Link className='link' to='/Login'>Login</Link> }
                    
                    
                    <div className='cartIcon' onClick={()=>setOpen(!open)}>
                         <ShoppingCartOutlinedIcon/>
                         <span className='cartCount'>{products.length}</span>
                         
                    </div>
                </div>
            </div>

        {open && <Cart/>}
        
        </div>
    );
    }

export default Navbar;