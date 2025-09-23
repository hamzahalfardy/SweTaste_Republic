import React, { useState } from "react";
import { BiXCircle } from "react-icons/bi";

const Carts = ({ cart, removeItem, clearCart }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [orderSummary, setOrderSummary] = useState([]); // 🆕 store confirmed items

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
        <div className="flex flex-col items-center">
          <img
            src={`${import.meta.env.BASE_URL}images/illustration-empty-cart.png`}
            alt="empty cart"
            className="w-40 mb-2"
          />
          <p className="text-gray-600">Items will appear here...</p>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-3 border-b pb-2"
            >
              <div>
                <h5 className="font-semibold">{item.name}</h5>
                <p className="text-sm text-gray-600">
                  {item.quantity}x @${item.price} ={" "}
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </p>
              </div>
              <BiXCircle
                onClick={() => removeItem(item.id)}
                className="text-red-500 text-xl cursor-pointer hover:text-red-700"
              />
            </div>
          ))}

          <div className="mt-4 flex justify-between items-center font-bold">
            <h2>Order Total:</h2>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          {/* Confirm Order Button */}
          <button
            onClick={handleConfirm}
            className="mt-4 w-full bg-amber-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-700 transition"
          >
            Confirm Order
          </button>
        </>
      )}

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center w-96">
            <img
              src={`${import.meta.env.BASE_URL}images/icon-order-confirmed.svg`}
              alt="icon-order-confirmed"
              className="w-8"
            />
            <h2 className="text-2xl font-bold text-gray-700 mb-3 w-60 text-left">
              Order Confirmed!
            </h2>
            <p className="text-gray-700 mb-4">We hope you enjoy your Food</p>

            {/* ✅ use orderSummary here instead of cart */}
            <div className="max-h-60 overflow-y-auto text-left mb-4 border-t pt-2">
              {orderSummary.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-2 border-b"
                >
                  <div className="flex gap-2">
                    <img
                      src={item.image.desktop}
                      alt={item.name}
                      className="w-10 h-10 rounded"
                    />
                    <div>
                      <p className="text-sm">{item.name}</p>
                      <p className="text-red-700 font-bold ">
                        {item.quantity}x{" "}
                        <span className="text-gray-600 ml-6">
                          @${item.price}
                        </span>
                      </p>
                    </div>
                  </div>
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total:</span>
              <span>
                $
                {orderSummary
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
              </span>
            </div>

            <button
              onClick={closePopup}
              className="bg-amber-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-amber-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carts;
