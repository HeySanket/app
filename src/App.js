import "./App.css";
import React, { Suspense } from "react";
import Header from "./Header/Header";
import BlogContext from "./componentes/context/BlogContext";
import UrlContext from "./componentes/context/UrlContext";
import RoutesPath from "./routes/RoutesPath";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Suspense fallback={<h1>Loading....</h1>}>
      <BrowserRouter>
        <BlogContext>
          <UrlContext>
            <Header />
            <div>
              <RoutesPath />
            </div>
          </UrlContext>
        </BlogContext>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
