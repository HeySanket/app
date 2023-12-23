import "./App.css";
import Header from "./Header/Header";
import BlogContext from "./componentes/context/BlogContext";
import UrlContext from "./componentes/context/UrlContext";
import RoutesPath from "./routes/RoutesPath";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
