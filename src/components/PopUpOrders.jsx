import React from 'react'

const PopUpOrders = ({orderSummary, closePopup}) => {

  return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center w-96">
            <img
              src="/images/icon-order-confirmed.svg"
}
              alt=""
              className="w-8"
            />
            <h2 className="text-2xl font-bold text-gray-700 mb-3 w-60 text-left">
              Order Confirmed!
            </h2>
            <p className="text-gray-700 mb-4">We hope you enjoy your Food</p>

            {/* use orderSummary here instead of cart */}
            <div className="max-h-60 overflow-y-auto text-left mb-4 border-t pt-2">
              {orderSummary.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-2 border-b"
                >
                  <div className="flex gap-2">
                    <img
                      src={item.image.thumbnail}
                      alt=""}
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

  )
}

export default PopUpOrders


