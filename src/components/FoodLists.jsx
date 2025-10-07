import React, {useState} from 'react'
import Desserts from './Desserts'
import Carts from './Carts'

const FoodLists = () => {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
  setCart((prevCart) => {
    const existing = prevCart.find((item) => item.id === product.id);

    if (existing) {
      return prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      return [...prevCart, { ...product, quantity: 1 }];
    }
  });
};



  // Increase quantity
  const increaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  // Decrease quantity (remove if goes to 0)
  const decreaseQty = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  // Remove item completely
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  
  const clearCart = () => {
    setCart([])
  }


  return (
    <div className="flex flex-col md:flex-row min-[820]:flex-col  justify-center gap-6 items-start w-full m-3">
      {/* Desserts takes 70% on md+ screens */}
      <div className="w-full md:w-[70%]">
        <Desserts 
        addToCart={addToCart} 
        increaseQty={increaseQty} 
        decreaseQty={decreaseQty}
        cart={cart}  
        />
      </div>

      {/* Carts takes 30% on md+ screens and stays sticky */}
      <div className="w-full md:max-w-[30%] md:sticky md:top-4 self-start">
        <Carts
        cart={cart}  
        removeItem={removeItem}
        clearCart={clearCart}/>
      </div>
    </div>
  )
}

export default FoodLists
