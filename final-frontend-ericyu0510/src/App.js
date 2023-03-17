import Auth from "./pages/Auth";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import { Routes, Route } from "react-router-dom";

export default function App() {
  // const BACKEND_URL = "http://localhost:3000";
  const BACKEND_URL = "https://ridefishfinal.herokuapp.com";

  return (
    <>
      <Routes>
        <Route path="/" element={<Auth BACKEND_URL={BACKEND_URL} />}></Route>
        <Route
          path="/feed"
          element={<Main BACKEND_URL={BACKEND_URL} />}
        ></Route>
        <Route
          path="/profile"
          element={<Profile BACKEND_URL={BACKEND_URL} />}
        ></Route>
      </Routes>
    </>
  );
}
