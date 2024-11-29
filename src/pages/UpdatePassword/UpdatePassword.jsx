import MainFormContainer from "../../components/MainFormContainer/MainFormContainer";
import Form from "../Form/Form";
import Title from "../../components/Title/Title";
import Label from "../../components/Label/Label";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./UpdatePassword.module.css";
import Input from "../../components/Input/Input";
import Message from "../../components/Message/Message";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

export default function UpdatePassword({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedInState] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      // 用戶已登入，從後端獲取用戶名
      axios
        .get("http://localhost:5000/member-data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            setUsername(response.data.username);
            setIsLoggedInState(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching member data:", error);
        });
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const phone = formData.get("phone");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    // 檢查兩次輸入的密碼是否一致
    if (password !== confirmPassword) {
      setMessage("兩次輸入的密碼不一致");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/update-password",
        {
          username,
          phone,
          newPassword: password,
        },
        {
          withCredentials: true, // 確保請求攜帶 cookie
        }
      );

      if (response.status === 200) {
        setMessage("密碼更新成功，請重新登入");

        // 手動清除本地 cookie
        Cookies.remove("token");

        setTimeout(() => {
          setIsLoggedIn(false);
          navigate("/"); // 跳轉到登入頁面
        }, 2000);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("更新密碼時出現錯誤");
    }
  };

  function navigateBack() {
    navigate(-1); // 返回上一頁
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <MainFormContainer>
      <Form handleSubmit={handleUpdate}>
        <Title label="更改密碼" />
        <Message message={message} />
        <Label label="帳號"></Label>
        <Input
          name="username"
          type="text"
          maxLength="14"
          minLength="4"
          pattern="[A-Za-z0-9]+"
          placeholder="請輸入"
          required
          value={username}
          onChange={handleUsernameChange} // 添加 onChange handler
          readOnly={isLoggedIn} // 當用戶已登入時設置為只讀
        />
        <Label label="手機"></Label>
        <Input
          name="phone"
          type="text"
          maxLength="10"
          minLength="10"
          pattern="^09[0-9]{8}$"
          placeholder="請輸入"
          required
        />
        <Label label="輸入密碼"></Label>
        <Input
          name="password"
          type="password"
          maxLength="16"
          pattern="[A-Za-z0-9]+"
          placeholder="請輸入"
          minLength="4"
          required
        />
        <Label label="再次輸入密碼"></Label>
        <Input
          name="confirmPassword"
          type="password"
          maxLength="16"
          pattern="[A-Za-z0-9]+"
          placeholder="請輸入"
          minLength="4"
          required
        />
        <Button label="更改密碼" type="submit" />
      </Form>
      <div className={styles.extensionForm}>
        <p className={styles.extensionItem} onClick={navigateBack}>
          返回
        </p>
      </div>
    </MainFormContainer>
  );
}

UpdatePassword.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};
