import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Form from "../Form/Form.jsx";
import Title from "../../components/Title/Title.jsx";
import Label from "../../components/Label/Label.jsx";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import Message from "../../components/Message/Message.jsx";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import MainFormContainer from "../../components/MainFormContainer/MainFormContainer.jsx";
import { useUser } from "../../contexts/UserContext";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function Login() {
  const [message, setMessage] = useState("");
  const { setIsLoggedIn } = useAuth();
  const { fetchUserData } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      const response = await axios.post(
        `https://pet-project-back-dt26.onrender.com/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsLoggedIn(true);

        // 設置無到期時間的 token cookie
        Cookies.set("token", response.data.token);

        // 確認設置的 cookie
        console.log("Cookies after login:", Cookies.get());
        console.log("Token cookie:", Cookies.get("token"));

        // 獲取新用戶資料
        await fetchUserData();

        navigate("/home");
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
