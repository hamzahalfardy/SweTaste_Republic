import React, { useEffect, useState } from "react";
import styles from "../Desserts.module.css";

const Desserts = ({ addToCart, increaseQty, decreaseQty, cart }) => {
  const [goods, setGoods] = useState([]);

  useEffect(() => {
    const url = `${import.meta.env.BASE_URL}products.json`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
        return res.json();
      })
      .then((data) => setGoods(data))
      .catch((err) => {
        console.error("Error loading products:", err);
        setGoods([]);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center m-2">
      <h1 className="text-2xl font-extrabold font-mono">Desserts</h1>

      {/*  Grid layout for responsiveness */}
      <div className="mt-4 grid grid-cols-1 min-[550px]:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
        {goods.map(({ id, name, category, price, image }) => {
          // 🔍 Find this product inside the cart
          const cartItem = cart.find((c) => c.id === id);

          //  Fix image paths for GitHub Pages
          const desktopImg = `${
            import.meta.env.BASE_URL
          }${image.desktop.replace(/^\//, "")}`;

          return (
            <div key={id} className={styles.display}>
              <img
                src={desktopImg}
                alt={name}
                className="w-full h-40 object-cover rounded-lg"
              />

              <div className="flex flex-col justify-start items-start m-4">
                <p className="text-sm text-gray-500">{category}</p>
                <h2 className="font-bold text-sm">{name}</h2>
                <p className="text-red-600 font-semibold">
                  ${price.toFixed(2)}
                </p>
              </div>

              <div className={styles.absolute}>
                {cartItem ? (
                  //  If product is in cart, show +/– buttons
                  <div className="flex justify-between items-center bg-amber-600 border border-gray-400 px-4 py-2 rounded-3xl w-40 mb-3">
                    <button
                      onClick={() => decreaseQty(id)}
                      className="px-1 py-1 bg-gray-300 rounded-2xl hover:bg-gray-400 w-8 h-8 hover:text-white"
                    >
                      –
                    </button>
                    <span className="text-white">{cartItem.quantity}</span>
                    <button
                      onClick={() => increaseQty(id)}
                      className="px-1 py-1 bg-gray-300 rounded-2xl hover:bg-gray-400 w-8 h-8 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  //  If product is NOT in cart, show Add to Cart
                  <button
                    onClick={() => addToCart({ id, name, price, image })}
                    className="bg-white font-bold text-lg font-sans text-black border border-gray-400 px-4 py-2 rounded-3xl my-3 flex justify-center items-center gap-2"
                  >
                    <img
                      src={`${
                        import.meta.env.BASE_URL
                      }images/icon-add-to-cart.svg`}
                      alt="icon "
                    />
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Desserts;
