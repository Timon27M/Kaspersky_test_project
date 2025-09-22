import { Routes, Route } from "react-router-dom";

import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import UserPage from "./pages/UserPage/UserPage";
import { useEffect } from "react";

function App() {
  useEffect(() => {

  createBackup()

}, [])
async function createBackup() {
   const res = await fetch("http://localhost:3000/db/restore", {
    method: "POST",
  });
  const data = await res.json();
  console.log(data)
  console.log(data.message);
}

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/user/:userId" element={<UserPage />} />
    </Routes>
  );
}

export default App;
