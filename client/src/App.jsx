import React, { useEffect, useState } from "react";
import Chatbot from "./pages/Chatbot";
import Locator from "./pages/Locator";

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
    <div>
      <h1>React + Flask Connected ✅</h1>
      <p>{data ? data : "Loading Flask API..."}</p>
      <Chatbot />
      <Locator />
    </div>
  );
};

export default App;
