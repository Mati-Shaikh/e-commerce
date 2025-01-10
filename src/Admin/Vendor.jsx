import React, { useState } from "react";
import Category from "./Components/Category";
import HeaderMain from "./Components/HeaderMain";
import Heading from "./Components/Heading";
import "./Vendor.css";

const Vendor = () => {
  const initialStructure = {
    name: "Categories",
    type: "category",
    children: [],
    isOpen: true,
    parents: null,
  };
  const [structur, setStructur] = useState(initialStructure);

  return (
    <>
      <HeaderMain />
      <Heading head="Vendor's Admin" />
      <div className="vendor">
        <div className="category-explorer">
          <Category
            category={structur}
            parent={null}
            setStructure={setStructur}
            structure={structur}
          />
        </div>
      </div>
    </>
  );
};

export default Vendor;
