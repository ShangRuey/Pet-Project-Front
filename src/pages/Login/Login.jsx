import PropTypes from "prop-types";
import Form from "../Form/Form.jsx";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  return (
    <div className={styles.centerWrapper}>
      <div className={styles.loginContainer}>
        <Form />
        <div className={styles.haveAccount}>
          <p className={styles.updatePassword}>
            <Link to="/update-password">忘記密碼</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  setIsLoggedIn: PropTypes.func,
};
