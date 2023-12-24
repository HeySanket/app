import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

const Amazon = React.lazy(() => import("../componentes/amazon/Amazon"));
const ForgotPassword = React.lazy(() =>
  import("../componentes/login/ForgotPassword")
);
const Login = React.lazy(() => import("../componentes/login/Login"));
const Error = React.lazy(() => import("../componentes/reuseComp/Error"));
const RedSingleBlog = React.lazy(() =>
  import("../componentes/blogs/RedSingleBlog")
);
const CreateBlog = React.lazy(() => import("../componentes/blogs/CreateBlog"));
const SingleProduct = React.lazy(() =>
  import("../componentes/amazon/SingleProduct")
);
const CreateToDo = React.lazy(() => import("../toDo/CreateToDo"));
const Resume = React.lazy(() => import("../componentes/resume/Resume"));
const Blogs = React.lazy(() => import("../componentes/blogs/Blogs"));

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
