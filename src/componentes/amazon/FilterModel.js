import React, { useEffect, useState } from "react";
import "./product.css";
import ReactDOM from "react-dom";
const FilterModel = (props) => {
  const [catogaryF, setCatogaryF] = useState([]);
  const {
    setOpenModel,
    productData,
    catogaryvalue,
    setCatogaryValue,
    maxprice,
  } = props;

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    const productCat = productData.map((val, i) => {
      return val.category;
    });

    setCatogaryF([...new Set(productCat)]);

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const changeEvent = (e) => {
    const { name, value } = e.target;
    setCatogaryValue({ ...catogaryvalue, [name]: value });
  };

  const changeEventBox = (e) => {
    const { name, checked, value } = e.target;
    setCatogaryValue({ ...catogaryvalue, [name]: value });
    setCatogaryValue({ ...catogaryvalue, [name]: checked });
  };

  const formEvent = (e) => {
    e.preventDefault();
    setCatogaryValue(catogaryvalue);
    setOpenModel(false);
  };

  return ReactDOM.createPortal(
    <>
      <div className="modal-warper" onClick={() => setOpenModel(false)}></div>
      <div className="modal-containt">
        <form onSubmit={formEvent}>
          {Array.isArray(catogaryF) &&
            catogaryF.map((val, i) => {
              return (
                <div key={i} className="dFlex align-items">
                  <span>
                    <input
                      type="checkbox"
                      name={val}
                      id={val}
                      checked={catogaryvalue[val]}
                      onChange={changeEventBox}
                    />
                  </span>
                  <label className="pl-10" htmlFor={val}>
                    {val}
                  </label>
                </div>
              );
            })}
          <div className="dFlex align-items">
            <span>
              <input
                type="range"
                value={catogaryvalue.price}
                max={maxprice}
                name="price"
                onChange={changeEvent}
              />
            </span>
            <label className="pl-10">{catogaryvalue.price}</label>
          </div>
        </form>
      </div>
    </>,
    document.getElementById("portel")
  );
};

export default FilterModel;
