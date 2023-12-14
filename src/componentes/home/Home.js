import React, { useEffect, useState } from "react";
import axios from "axios";
const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/shortUrl")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <div className="m65">home</div>;
};

export default Home;

{
  /* <div className="m65 search-containt  grow grow1">
      <img src="images/working.png" />
    </div> */
}
