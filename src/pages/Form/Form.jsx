import Title from "../../components/Title/Title.jsx";
import Label from "../../components/Label/Label.jsx";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import styles from "./Form.module.css";

export default function Form({ ...props }) {
  return (
    <form className={styles.setForm} {...props}>
      <Title label="會員登入" />
      <Label label="帳號" />
      <Input
        type="text"
        maxLength="14"
        minLength="4"
        pattern="[A-Za-z0-9]+"
        required
      />
      <Label label="密碼" />
      <Input
        type="password"
        maxLength="16"
        pattern="[A-Za-z0-9]+"
        minLength="4"
        required
      />
      <Button label="登入" type="submit" />
    </form>
  );
}
