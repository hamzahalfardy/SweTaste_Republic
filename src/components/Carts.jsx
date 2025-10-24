import React, { useState } from "react";
import EmptyCart from "./EmptyCart";
import CartList from "./CartList";
import PopUpOrders from "./PopUpOrders";

const Carts = ({ cart, removeItem, clearCart }) => {
  const [showPopup, setShowPopup] = useState(false);
    const [orderSummary, setOrderSummary] = useState([]); // 🆕 store confirmed items
  



  // const totalPrice = cart.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // );

  const handleConfirm = () => {
    setOrderSummary(cart); // 🆕 copy items to order summary
    setShowPopup(true);    // show popup
    clearCart();           // clear cart after saving snapshot
  };

  const closePopup = () => {
    setShowPopup(false);
    setOrderSummary([]); // reset after closing
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-xl">
      <h1 className="text-xl font-mono font-bold mb-3 text-[#e2732e]">
        Your Cart ({cart.length})
      </h1>

      {cart.length === 0 ? (
        <EmptyCart  />
      ) : (
        <CartList 
        cart={cart} 
        removeItem={removeItem} 
        handleConfirm={handleConfirm} 
        />
      )}

      {/* Popup Modal */}
      {showPopup && (
        <PopUpOrders 
        closePopup={closePopup}
        orderSummary={orderSummary}  />
      )}
    </div>
  );
};

export default Carts;
