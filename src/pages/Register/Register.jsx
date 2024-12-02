import MainFormContainer from "../../components/MainFormContainer/MainFormContainer";
import Form from "../Form/Form";
import Title from "../../components/Title/Title";
import Message from "../../components/Message/Message";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
      fullname: formData.get("fullname"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setMessage("註冊成功，請登入");
        setTimeout(() => {
          navigate("/"); // 跳轉到登入頁面
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage("該帳號已存在，請使用其他帳號註冊");
      } else {
        setMessage("註冊時出現錯誤，請檢查輸入格式是否正確並稍後再試");
      }
    }
  };

  function navigateBack() {
    navigate(-1); // 返回上一頁
  }

  return (
    <MainFormContainer>
      <Form handleSubmit={handleRegister}>
        <Title label="註冊會員" />
        <Message message={message} />
        <Label label="帳號" />
        <Input
          name="username"
          type="text"
          maxLength="14"
          minLength="4"
          pattern="[A-Za-z0-9]+"
          title="可輸入英文大小寫及數字，最少要輸入4字元，最多14字元，不能包含空格"
          placeholder="請輸入"
          required
        />
        <Label label="密碼" />
        <Input
          name="password"
          type="password"
          maxLength="16"
          pattern="[A-Za-z0-9]+"
          title="可輸入英文大小寫及數字，最少要輸入4字元，最多16字元，不能包含空格"
          placeholder="請輸入"
          minLength="4"
          required
        />
        <Label label="姓名" />
        <Input
          name="fullname"
          type="text"
          maxLength="6"
          pattern="^[\u4e00-\u9fa5A-Za-z]+$"
          title="最多輸入6個中文字元或等效的英文字符，不能包含空格"
          placeholder="請輸入"
          required
        />
        <Label label="電子郵件" />
        <Input
          name="email"
          type="email"
          maxLength="30"
          pattern="[A-Za-z0-9@.]+"
          title="輸入有效的電子郵件 xxx@xxxx，不能包含空格"
          placeholder="請輸入"
          required
        />
        <Label label="手機" />
        <Input
          name="phone"
          type="text"
          maxLength="10"
          minLength="10"
          pattern="^09[0-9]{8}$"
          title="手機需以09開頭，共10位數，不能包含空格"
          placeholder="請輸入"
          required
        />
        <Label label="地址" />
        <Input
          name="address"
          type="text"
          maxLength="50"
          pattern="^[\u4e00-\u9fa5A-Za-z0-9]+$"
          title="最多輸入25個中文字元或等效的英文字符，不能包含空格"
          placeholder="請輸入"
          required
        />
        <Button label="註冊" type="submit" />
      </Form>
      <div className={styles.extensionForm}>
        <p className={styles.extensionItem} onClick={navigateBack}>
          返回
        </p>
      </div>
    </MainFormContainer>
  );
}
