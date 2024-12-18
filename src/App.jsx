import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./layouts/Header/Header.jsx";
import Footer from "./layouts/Footer/Footer.jsx";
import Main from "./layouts/Main/Main.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Home from "./pages/Home/Home.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import Member from "./pages/Member/Member.jsx";
import Map from "./pages/Map/Map.jsx";
import Community from "./pages/Community/Community.jsx";
import Adopt from "./pages/Adopt/Adopt.jsx";
import Detail from "./pages/Detail/Detail.jsx";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword.jsx";
import { UserProvider } from "./contexts/UserContext";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <AuthProvider>
          <MainApp />
        </AuthProvider>
      </CartProvider>
    </UserProvider>
  );
}

function MainApp() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/check-auth", {
          withCredentials: true, // 確保 cookie 包含在請求中
        });

        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setIsLoggedIn]);

  if (loading) {
    return <div>Loading...</div>; // 可以替換為更漂亮的加載指示器
  }

  return (
    <Router>
      <Header />
      <Main>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/home" /> : <Register />}
          />
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
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route
            path="/detail/:id"
            element={isLoggedIn ? <Detail /> : <Navigate to="/" />}
          />
        </Routes>
      </Main>
      <Footer />
    </Router>
  );
}

export default App;
