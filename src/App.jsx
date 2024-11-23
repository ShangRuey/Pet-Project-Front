import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Home from "./components/Home/Home.jsx";
import Shop from "./components/Shop/Shop.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Checkout from "./components/Checkout/Checkout.jsx";
import Member from "./components/Member/Member.jsx";
import Map from "./components/Map/Map.jsx";
import Community from "./components/Community/Community.jsx";
import Adopt from "./components/Adopt/Adopt.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/shop"
          element={isLoggedIn ? <Shop /> : <Navigate to="/" />}
        />
        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/" />}
        />
        <Route
          path="/checkout"
          element={isLoggedIn ? <Checkout /> : <Navigate to="/" />}
        />
        <Route
          path="/member"
          element={isLoggedIn ? <Member /> : <Navigate to="/" />}
        />
        <Route
          path="/map"
          element={isLoggedIn ? <Map /> : <Navigate to="/" />}
        />
        <Route
          path="/community"
          element={isLoggedIn ? <Community /> : <Navigate to="/" />}
        />
        <Route
          path="/adopt"
          element={isLoggedIn ? <Adopt /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
