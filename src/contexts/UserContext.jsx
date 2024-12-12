import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `https://pet-project-back-dt26.onrender.com/member-data`,
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        `https://pet-project-back-dt26.onrender.com/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, fetchUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };

UserProvider.propTypes = {
  children: PropTypes.any,
};
