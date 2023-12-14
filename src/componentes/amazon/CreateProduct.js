import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
const CreateProduct = ({ setShowCreate, showCreate }) => {
  const [productData, setProductData] = useState({});
  const [productImg, setProductImg] = useState("");
  const eventChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value, productImg });
  };
  const formEvent = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("productImg", productImg);
    axios
      .post("http://localhost:9999/amazon", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return ReactDOM.createPortal(
    <>
      <div className="modal-warper" onClick={() => setShowCreate(false)}></div>
      <div className="modal-containt">
        <form onSubmit={formEvent}>
          <input
            name="title"
            placeholder="Title"
            type="text"
            onChange={eventChange}
          />
          <input
            name="description"
            type="text"
            placeholder="Description"
            onChange={eventChange}
            className="mlr10"
          />
          <input
            name="price"
            placeholder="price"
            type="text"
            onChange={eventChange}
            className="mlr10"
          />
          <input
            type="file"
            name="productImg"
            onChange={(e) => setProductImg(e.target.files[0])}
          />

          <button className="button" type="submit">
            Create
          </button>
        </form>
      </div>
    </>,
    document.getElementById("portel")
  );
};

export default CreateProduct;
