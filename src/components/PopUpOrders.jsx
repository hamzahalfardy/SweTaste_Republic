import React from "react";

const PopUpOrders = ({ orderSummary, closePopup }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg text-center w-96">
        <img
          src={`${import.meta.env.BASE_URL}images/icon-order-confirmed.svg`}
          alt="Order confirmed"
          className="w-12 mx-auto mb-3"
        />

        <h2 className="text-2xl font-bold text-gray-700 mb-3">
          Order Confirmed!
        </h2>
        <p className="text-gray-600 mb-4">We hope you enjoy your food</p>

        {/* Order Summary */}
        <div className="max-h-60 overflow-y-auto text-left mb-4 border-t pt-2">
          {orderSummary.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-2 border-b pb-1"
            >
              <div className="flex gap-2 items-center">
                <img
                  src={item.image.thumbnail}
                  alt={item.name}
                  className="w-10 h-10 rounded object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {item.name}
                  </p>
                  <p className="text-red-700 font-semibold">
                    {item.quantity}x{" "}
                    <span className="text-gray-600 ml-2">@${item.price}</span>
                  </p>
                </div>
              </div>
              <span className="font-medium text-gray-800">
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
  );
};

export default PopUpOrders;
