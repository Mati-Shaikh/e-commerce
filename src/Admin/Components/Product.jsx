import React, { useState } from "react";
import Popup from "./Popup";
import "../Vendor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faShoppingCart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Product = ({ product, parent, removeItem }) => {
  const [isPopup2, setIsPopup2] = useState(false);
  const handleinf = () => {
    setIsPopup2(true);
  };
  const handlePopup = (a, b, c) => {};
  const handlePop = () => {
    setIsPopup2(false);
  };
  return (
    <div className="product">
      <span className="product-name">
        <FontAwesomeIcon icon={faShoppingCart} style={{ color: "#ffffff" }} />
        <b>{product.name}</b>
      </span>
      <div className="product-actions">
        <button onClick={() => handleinf()}>
          <FontAwesomeIcon icon={faInfo} style={{ color: "#ffffff" }} />
        </button>
        <button onClick={() => removeItem(parent, product)}>
          <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff" }} />
        </button>
      </div>
      {isPopup2 && (
        <Popup
          handlePop={handlePopup}
          typ="info"
          PN={product.name}
          PD={product.description}
          PC={product.country}
          handlePop2={handlePop}
        />
      )}
    </div>
  );
};

export default Product;
