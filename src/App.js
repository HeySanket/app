import "./App.css";
import Header from "./Header/Header";
import BlogContext from "./componentes/context/BlogContext";
import RoutesPath from "./routes/RoutesPath";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <BlogContext>
          <Header />
          <div>
            <RoutesPath />
          </div>
        </BlogContext>
      </BrowserRouter>
    </>
  );
}

export default App;
