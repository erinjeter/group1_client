import React, { useState, useEffect } from "react";
import Sitebar from "./Navbar";
import Auth from "./Auth/Auth";
import PollIndex from "./Polls/PollIndex";
import ResponseIndex from "./Response/ResponseIndex";

function App() {
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  };

  const protectedViews = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <PollIndex token={sessionToken} />
    ) : (
      <Auth updateToken={updateToken} />
    );
  };

  return (
    <div className="App">
      <Sitebar clearToken={clearToken} />
      <ResponseIndex />
      {protectedViews()}
    </div>
  );
}

export default App;
