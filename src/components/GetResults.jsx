import React from "react";
import {useEffect, useState} from "react";
import { fetchAllProducts } from "./fetchApi";

const GetResults = () => {

    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetchAllProducts().then((results) => {
        setData(results);
        console.log(results);
    }, []);
    });
    
    return (
        <div>
        <ul>
            {data.map((item, index) => (
            <li key={index}>{item.title}</li>
            ))}
        </ul>
        </div>
    );
    }

export default GetResults;
