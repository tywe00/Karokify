import Login from "./views/Login";
import { handleCodeExchange } from "./utils/authorization";
import HomeView from "./views/homeView";
import KaraokeView from "./views/karaokeView.js";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    handleCodeExchange(code);
    const newToken = localStorage.getItem("access_token");
    setToken(newToken);
  }, []);

  return token ? <HomeView code={token} /> : <Login />;
}

export default App;
