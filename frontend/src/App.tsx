import { Routes, Route } from "react-router-dom";

import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import UserPage from "./pages/UserPage/UserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/user/:userId" element={<UserPage />} />
    </Routes>
  );
}

export default App;
