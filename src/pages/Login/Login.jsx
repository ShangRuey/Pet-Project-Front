import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import Form from "../Form/Form.jsx";
import Title from "../../components/Title/Title.jsx";
import Label from "../../components/Label/Label.jsx";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import Message from "../../components/Message/Message.jsx";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import MainFormContainer from "../../components/MainFormContainer/MainFormContainer.jsx";

export default function Login({ setIsLoggedIn }) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      const response = await axios.post("http://localhost:5000/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // 確保 cookie 包含在請求中
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
        navigate("/home"); // 登入成功後跳轉到 /home
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("帳密有誤 請再次輸入");
    }
  };

  return (
    <MainFormContainer>
      <Form handleSubmit={handleSubmit}>
        <Title label="會員登入" />
        <Message message={message} />
        <Label label="帳號" />
        <Input
          name="username"
          type="text"
          maxLength="14"
          minLength="4"
          pattern="[A-Za-z0-9]+"
          required
        />
        <Label label="密碼" />
        <Input
          name="password"
          type="password"
          maxLength="16"
          pattern="[A-Za-z0-9]+"
          minLength="4"
          required
        />
        <Button label="登入" type="submit" />
      </Form>
      <div className={styles.extensionForm}>
        <p className={styles.extensionItem}>
          <Link to="/register">註冊</Link>
        </p>
        <p className={styles.extensionItem}>
          <Link to="/update-password">忘記密碼</Link>
        </p>
      </div>
    </MainFormContainer>
  );
}

Login.propTypes = {
  setIsLoggedIn: PropTypes.func,
};
