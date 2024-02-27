import React from 'react'
import '../Cart/Cart.css'
import { Product } from '../../types/Product';


type CartProps={
    totQuantity: number;
    price: number;
    
}



export const Cart = ({totQuantity, price}: CartProps) => {

    const el = React.createElement('li', null,  'product.title') 

  return (
    <>
    <div className="d-flex align-items-center principal-container">
        <div
        className={totQuantity === 0 ? "hidden" : ""}
        >{`${price.toFixed(2)} €`}</div>
        <div className="cart-container">
            <img className="cart" src="cart.png" alt="cart" />
            <div
                className={`cart-container_tot ${
                    totQuantity === 0 ? "hidden" : ""
                }`}
                >
                {totQuantity === 0 ? "" : totQuantity}
            </div>
        </div>
  </div>
        
    </>
  )
}
