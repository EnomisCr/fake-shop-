import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import { Product } from './types/Product';
import { Card } from './components/Card/Card';
import { Cart } from './components/Cart/Cart';
import { Navbar } from './components/Navbar/Navbar';

function App() {

  // creo una variabile con useState chiamata products che è un array di tipo Product. 
  // Inizialmente è un array vuoto 
  const[products, setProducts]= useState<Product[]>([]);
  
  //creo le due variabili che mi servono per aggiornare il carrello
  const[totQuantity, setTotQuantity]= useState<number>(0);
  const[totPrice, setTotPrice]= useState<number>(0);

  
  
  // faccio la chiamata all'API e attendo la risposta
  useEffect (()=>{
    const fetchData = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      // con setProducts ed un map vado ad aggiungere la chiave quantità ad ogni oggetto dell'array
      setProducts([...data].map(product => ({...product, quantity:0})))      
      console.log(products)
    } 

    fetchData();
  },[])

  //questo use effect si aggiorna ogni volta che cambia products, che viene cambiato in Card.tsx quando si aggiorna la quantita
  useEffect(()=>{
    setTotQuantity(products.reduce((acc,product)=> acc + product.quantity,0))
    setTotPrice(products.reduce((acc,product)=> acc + product.price*product.quantity,0))
  },[products])


  return (
    <>
      <Navbar />
      <Cart totQuantity={totQuantity} price={totPrice}  />

      <div className="row">

        {
          // ciclo l'array Products e creo una carta per ogni elemento
        products.map((product, index) => {
          return (
              <Card item={product} index={index} setProducts={setProducts} />
            )
        })
        }
      </div>
    </>
  );
}

export default App;
