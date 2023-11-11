import { BrowserRouter } from "react-router-dom";
import Nav from "./components/app/Nav";
import Main from "./components/app/Main";
import Footer from "./components/app/Footer";
import AuthProvider from "./components/context/AuthProvider";
import HttpHeadersProvider from "./components/context/HttpHeadersProvider";
import "./css/style.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HttpHeadersProvider>
          <Nav />
          <Main />
        </HttpHeadersProvider>
      </AuthProvider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
