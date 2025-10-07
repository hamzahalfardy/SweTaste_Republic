import React from 'react'

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center">
          <img
            src={public/images/illustration-empty-cart.svg
}
            alt="empty cart"
            className="w-40 mb-2"
          />
          
          <p className="text-gray-600">Items will appear here...</p>
      </div>
  )
}

export default EmptyCart

