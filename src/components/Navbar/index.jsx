import React, { useEffect, useState } from "react";
import image from "../../images/crypto.png";
import "./index.css";
import WatchList from "../WatchList";
import { useCurrency } from "../../context/CurrencyContext.jsx";

const Navbar = () => {
  const { currency, handleChangeCurrency } = useCurrency();
  const [isModal, setIsModal] = useState(false);
  const [items, setItems] = useState([]);

  function handleBtnClick() {
    setIsModal(true);
  }

  
  const handleRemoveModal = () => {
    setIsModal(false);
  };

  useEffect(() => {
    const storedItems = localStorage.getItem("locals")
      ? JSON.parse(localStorage.getItem("locals"))
      : [];
    setItems(storedItems);
  }, []);

  function handleBtnClck(id) {
    const storedItems = localStorage.getItem("locals")
      ? JSON.parse(localStorage.getItem("locals"))
      : [];
    const updatedItems = storedItems.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("locals", JSON.stringify(updatedItems));
  }

  return (
    <div className="navbar">
      <div className="container">
        <div>
          <a href="/">
            <img src={image} alt="cryptofolio" />
          </a>
        </div>

        <div className="select-watch-class">
          <select onChange={(e) => handleChangeCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EURO</option>
            <option value="JPY">JPY</option>
          </select>
          {isModal && (
            <div className="overlay" onClick={handleRemoveModal}>
              <div className="watch-list">
                <h2>Watchlist</h2>
                <span onClick={handleRemoveModal} className="cancel">
                  X
                </span>
                <div className="watch-wrapper">
                  {items.map((el, index) => (
                    <WatchList
                      key={index}
                      click={() => handleBtnClck(el.id)}
                      image={el.image}
                      amount={el.current_price}
                      btn="Remove"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <button onClick={handleBtnClick}>Watch List</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
