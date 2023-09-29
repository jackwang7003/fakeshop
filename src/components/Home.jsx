
import React, {useEffect, useState} from 'react';
import "./Home.scss";
import Card from './Card';


const Home = () => {
  const [items, setItems] = useState([]);
  const url = 'https://fakestoreapi.com/products';
  
  

  useEffect(() => {
    const getItems = async () => {
      try {
        fetch(url)
          .then((res) => res.json())
          .then((json) => setItems(json));
      } catch (error) {
        console.log("error", error);
      }
    }
    getItems();
  }, []);

  return (
    <div className="item-list">
      <div className="left">
        
      </div>
      <div className="right">

         {items.map((item) => <Card item={item} key={item.id} />)}
      </div>

     
    </div>
  );
}

export default Home;