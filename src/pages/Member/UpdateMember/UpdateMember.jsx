import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import MainFormContainer from "../../../components/MainFormContainer/MainFormContainer";
import Form from "../../Form/Form.jsx";
import Title from "../../../components/Title/Title.jsx";
import Label from "../../../components/Label/Label";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import Message from "../../../components/Message/Message";

export default function UpdateMember() {
  const [memberData, setMemberData] = useState({
    username: "",
    fullname: "",
    email: "",
    phone: "",
    address: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(`${apiUrl}}/member-data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          console.log(response.data);
          const { username, fullname, email, phone, address } = response.data;
          setMemberData({
            username: username || "",
            fullname: fullname || "",
            email: email || "",
            phone: phone || "",
            address: address || "",
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching member data:", error);
        setMessage("Error fetching member data.");
        setLoading(false);
      }
    };

    fetchMemberData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const confirmed = window.confirm("確認修改嗎?");
    if (!confirmed) {
      return;
    }

    try {
      const token = Cookies.get("token");
      const response = await axios.put(
        `${apiUrl}/update-member`,
        memberData, // 使用 'fullname' 作為屬性
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setMessage("修改成功");
        window.location.reload(); // 在這裡重新整理頁面
      }
    } catch (error) {
      console.error("Error updating member data:", error);
      setMessage("修改錯誤.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMemberData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return <div>Loading...</div>; // 或者使用更漂亮的加載指示器
  }

  console.log(memberData);
  return (
    <MainFormContainer>
      <Form handleSubmit={handleSubmit}>
        <Title label="修改會員資料" />
        <Message message={message} />
        <Label label="帳號" />
        <Input
          name="username"
          type="text"
          maxLength="14"
          minLength="4"
          value={memberData.username}
          disabled
        />
        <Label label="姓名" />
        <Input
          name="fullname"
          type="text"
          maxLength="6"
          pattern="^[\u4e00-\u9fa5A-Za-z]+$"
          title="最多輸入6個中文字元或等效的英文字符，不能包含空格"
          value={memberData.fullname}
          onChange={handleChange}
          required
        />
        <Label label="電子郵件" />
        <Input
          name="email"
          type="email"
          maxLength="30"
          pattern="[A-Za-z0-9@.]+"
          title="輸入有效的電子郵件 xxx@xxxx，不能包含空格"
          value={memberData.email}
          onChange={handleChange}
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
          value={memberData.phone}
          onChange={handleChange}
          required
        />
        <Label label="地址" />
        <Input
          name="address"
          type="text"
          maxLength="50"
          pattern="^[\u4e00-\u9fa5A-Za-z0-9]+$"
          title="最多輸入25個中文字元或等效的英文字符，不能包含空格"
          value={memberData.address}
          onChange={handleChange}
          required
        />
        <Button label="修改" type="submit" />
      </Form>
    </MainFormContainer>
  );
}
