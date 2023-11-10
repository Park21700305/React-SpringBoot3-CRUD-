import { BrowserRouter } from "react-router-dom";

import Header from "./components/app/Header"
import Nav from "./components/app/Nav"
import Main from "./components/app/Main"
import Footer from "./components/app/Footer"
import AuthProvider from "./components/context/AuthProvider"
import HttpHeadersProvider from "./components/context/HttpHeadersProvider";
import "./css/style.css"

function App() {

  return (
    <div>
      <BrowserRouter>
        
        {/* <Header /> */}
        
        <AuthProvider>
          <HttpHeadersProvider>
            <Nav />
            <Main />
          </HttpHeadersProvider>
        </AuthProvider>

        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
