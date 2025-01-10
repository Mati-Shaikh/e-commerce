import React, { useState } from "react";
import Countries from "./Countries";
import "./Popup.css";

const Popup = ({ handlePop, typ, PN, PD, PC, handlePop2 }) => {
  const [PName, setPName] = useState("");
  const [PDesc, setPDesc] = useState("");
  const [PCount, setPCount] = useState("0");

  const addProd = () => {
    if (PName !== "" && PDesc !== "" && PCount !== "0") {
      enableScrolling();
      handlePop(PName, PDesc, PCount);
    }
  };
  const handleClose = () => {
    handlePop2();
    enableScrolling();
  };
  function disableScrolling() {
    document.documentElement.style.overflow = "hidden";
  }
  disableScrolling();
  function enableScrolling() {
    document.documentElement.style.overflow = "auto";
  }
  return (
    <div className="overlay">
      {typ === "prod" ? (
        <>
          <div className="popup">
            <h2>Product</h2>
            <div className="inputBox">
              <input
                type="text"
                placeholder="Enter Product Name"
                value={PName}
                onChange={(e) => setPName(e.target.value)}
              />
            </div>
            <div className="inputBox">
              <textarea
                className="desc"
                placeholder="Enter Product Description"
                onChange={(e) => setPDesc(e.target.value)}
              >
                {PDesc}
              </textarea>
            </div>
            <div className="country">
              <select
                name="country"
                class="form-control1"
                id="country"
                onChange={(e) => setPCount(e.target.value)}
              >
                <Countries />
              </select>
            </div>
            <button className="PopBtn" onClick={addProd}>
              Submit
            </button>
          </div>
        </>
      ) : (
        <div className="info">
          <h2>{PN}</h2>
          <p>{PD}</p>
          <b>
            Origin: <span>{PC}</span>
          </b>
          <button className="PopBtn2" onClick={handleClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Popup;
