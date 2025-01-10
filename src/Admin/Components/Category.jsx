import React, { useState } from "react";
import Product from "./Product";
import Popup from "./Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faShoppingCart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Category = ({ category, parent, setStructure, structure }) => {
  const [categoryN, setCategoryN] = useState("➕");
  const [catOpen, setCatOpen] = useState(false);
  const [isPopup, setIsPopup] = useState(false);

  const addCategory = (parent) => {
    const categoryName = categoryN;
    if (categoryName) {
      const newCategory = {
        name: categoryName,
        type: "category",
        children: [],
        isOpen: true,
        parents: parent,
      };
      parent.children.push(newCategory);
      setStructure({ ...structure });
      setCategoryN("");
    }
  };

  const addProduct = (parent, PN, PD, PC) => {
    const productName = PN;
    if (productName) {
      const newProduct = {
        name: productName,
        type: "product",
        description: PD,
        country: PC,
      };
      parent.children.push(newProduct);
      setStructure({ ...structure });
    }
    setIsPopup(false);
  };

  const removeItem = (parent, item) => {
    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
      const index = parent.children.indexOf(item);
      if (index >= 0) {
        parent.children.splice(index, 1);
        setStructure({ ...structure });
      }
    }
  };

  const toggleChild = (childd, category) => {
    childd.forEach((element) => {
      element.isOpen = false;
      if (element.type === "category") toggleChild(element.children, element);
    });
  };

  const toggleCategory = (category) => {
    if (category.children && category.children.length > 0) {
      category.isOpen = !category.isOpen;
      toggleChild(category.children, category);
      setCatOpen(false);
      setCategoryN("➕");
      setStructure({ ...structure });
    } else {
      category.isOpen = true;
    }
  };

  const handleCatOpen = () => {
    setCatOpen(true);
  };

  const handlePopup = (PN, PD, PC) => {
    addProduct(category, PN, PD, PC);
  };

  return (
    <div className="category">
      <div className="category-header" onClick={() => toggleCategory(category)}>
        <span className="category-name">
          <FontAwesomeIcon icon={faList} style={{ color: "#ffffff" }} />
          <b>{category.name}</b>
        </span>
        <div className="category-actions">
          <input
            type="text"
            value={categoryN}
            onChange={(e) => {
              setCategoryN(e.target.value);
            }}
            className={
              catOpen
                ? "catInput2"
                : category.parents
                ? "catInput"
                : "catInput3"
            }
            placeholder={categoryN}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addCategory(category);
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              setCategoryN("");
              handleCatOpen();
            }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPopup(true);
            }}
          >
            <FontAwesomeIcon
              icon={faShoppingCart}
              style={{ color: "#ffffff" }}
            />
          </button>

          {category.parents && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeItem(parent, category);
              }}
            >
              <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff" }} />
            </button>
          )}
        </div>
      </div>
      {isPopup && (
        <Popup handlePop={handlePopup} typ="prod" PN="" PD="" PC="" />
      )}

      {category.isOpen && (
        <div className="category-contents">
          {category.children.map((child, index) => {
            return child.type === "category" ? (
              <Category
                key={index}
                category={child}
                parent={category}
                setStructure={setStructure}
                structure={structure}
              />
            ) : (
              <Product
                key={index}
                product={child}
                parent={category}
                removeItem={removeItem}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Category;
