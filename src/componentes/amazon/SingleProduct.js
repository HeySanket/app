import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const SingleProduct = () => {
  const [oneProduct, setOneProduct] = useState();
  let { id } = useParams();
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setOneProduct(data);
      });
  }, []);
  return (
    <div className="s_parent">
      <div className="s_child">
        <div className="width100">
          <img
            className="center"
            src={oneProduct?.image}
            height={500}
            width="100%"
          />
        </div>
        <div style={{ marginLeft: 10 }}>
          <h1>{oneProduct?.title}</h1>
          <p>{oneProduct?.description}</p>
          <h3>
            Price:- $<span>{oneProduct?.price}</span>
          </h3>
          <h3>
            Rating:-<span>{oneProduct?.rating.rate}</span>
          </h3>
          <p>{oneProduct?.rating.count}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
