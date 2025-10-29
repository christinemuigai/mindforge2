import React, { useEffect, useState } from "react";
import Chatbot from "./pages/Chatbot";
import Locator from "./pages/Locator";
import Navbar from "./comoponents/Navbar";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"

const App = () => {
  const [auth, setAuth] = useState(false);
  const [data, setData] = useState(null);

  function authorizeUser() {
    setAuth(true);
  }

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/hello")
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch((err) => console.error("Error fetching from Flask:", err));
  }, []);

  return (
    <>

<Router>
      <Navbar/>
      <Routes>
        <Route path="chatbot" element={<Chatbot/>}/>
        <Route path="locator" element={<Locator/>}/>
      </Routes>
    </Router>
    </>
  );
};

export default App;
