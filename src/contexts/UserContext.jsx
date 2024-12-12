import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const UserContext = createContext();
const apiUrl = process.env.REACT_APP_API_URL;

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/member-data`, {
        withCredentials: true,
      });
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
      await axios.post(`${apiUrl}/logout`, {}, { withCredentials: true });
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
