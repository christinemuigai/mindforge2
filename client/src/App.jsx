import React, { useEffect, useState } from "react";
import Chatbot from "./pages/Chatbot";
import Locator from "./pages/Locator";
import Navbar from "./comoponents/Navbar";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard";

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
<div className="fixed bottom-6 right-6 bg-white shadow-2xl border border-purple-300 rounded-2xl p-4 w-[250px] text-center text-purple-700 animate-fadeIn z-50">
  <h1 className="font-bold text-lg mb-1">React + Flask Connected ✅</h1>
  <p className="text-sm">{data ? data : "Loading Flask API..."}</p>
</div>
<Router>
      <Navbar/>
      <Routes>
        <Route path="chatbot" element={<Chatbot/>}/>
        <Route path="locator" element={<Locator/>}/>
        <Route path="/" element={<Dashboard/>}/>
      </Routes>
    </Router>
    </>
  );
};

export default App;
