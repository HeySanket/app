import React, { useContext, useEffect, useState } from "react";
import Amazon from "../componentes/amazon/Amazon";
import Blogs from "../componentes/blogs/Blogs";
import Resume from "../componentes/resume/Resume";
import { Routes, Route } from "react-router-dom";
import CreateToDo from "../toDo/CreateToDo";
import SingleProduct from "../componentes/amazon/SingleProduct";
import CreateBlog from "../componentes/blogs/CreateBlog";
import RedSingleBlog from "../componentes/blogs/RedSingleBlog";
import Error from "../componentes/reuseComp/Error";
import Login from "../componentes/login/Login";
import ForgotPassword from "../componentes/login/ForgotPassword";
import { useLocation, useNavigate } from "react-router-dom";
const RoutesPath = () => {
  const [path, setPath] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setPath(sessionStorage.getItem("x-token"));

    if (location.pathname == "/forgotPassword") {
      const gmail = sessionStorage.getItem("gmail");
      return navigate(`/forgotPassword?gmail=${gmail}`);
    }
    if (!sessionStorage.getItem("x-token")) {
      navigate("/login");
    }
  }, [location.pathname]);

  return (
    <>
      {path ? (
        <Routes>
          <Route path="/amazon" element={<Amazon />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/todo" element={<CreateToDo />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/login" element={<Login />} />
          <Route path="/amazon/:id" element={<SingleProduct />} />
          <Route path="/blogs/:id" element={<RedSingleBlog />} />
          <Route path="*" element={<Error />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
};

export default RoutesPath;
