import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const { image, price, symbol, amount, id } = props;
  const navigate = useNavigate();

  function handleCard() {
    navigate(`/viewpage/${id}`);
  }

  return (
    <div onClick={handleCard} className="card-wrapper">
      <img width={80} src={image} alt="pro" />
      <span>
        {symbol} <span className="amount">{amount}</span>
      </span>
      <p><span>₹ </span>{price}</p>
    </div>
  );
};

export default Card;
