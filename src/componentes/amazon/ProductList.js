import React from "react";
import "./product.css";
import { Link } from "react-router-dom";
const ProductList = ({ product }) => {
  return (
    <div className="dFlex flexWrap justify m50">
      {product.map((val, i) => {
        return (
          <div key={i} className="p_width center">
            <img src={val.image} height={100} width={100} />
            <Link to={`${val.id}`}>
              <h5 className="m0 m10">{val.title}</h5>
            </Link>
            <h5 className="m0">Price :-${val.price}</h5>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
