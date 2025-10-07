import React from 'react'
import { BiXCircle } from "react-icons/bi";


const CartList = ({cart, removeItem, handleConfirm}) => {

    const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
// console.log(cart)

  return (
        <div>
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
        </div>
  )
}

export default CartList
