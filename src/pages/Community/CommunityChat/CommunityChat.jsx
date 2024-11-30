import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import styles from "./CommunityChat.module.css";
import ques from "../../../assets/index/ques.jpg";
import PropTypes from "prop-types";

const SOCKET_URL = "http://localhost:5000";

export default function CommunityChat({ user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatContentRef = useRef(null);
  const socketRef = useRef(null);
  const messageEndRef = useRef(null); // 用於滾動到頁面底部

  useEffect(() => {
    // 獲取歷史訊息
    axios.get("http://localhost:5000/messages").then((response) => {
      // 按時間順序排序訊息（最新訊息在最上，最早訊息在最下）
      const sortedMessages = response.data.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      setMessages(sortedMessages);
      // 滾動到底部
      if (chatContentRef.current) {
        chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
      }
    });

    // 建立 socket.io 連接
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on("message", (message) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
      // 滾動到頂部（因為我們使用column-reverse，頂部實際上是底部）
      if (chatContentRef.current) {
        chatContentRef.current.scrollTop = 0;
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    // 滾動到頂部（因為我們使用column-reverse，頂部實際上是底部）
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = 0;
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && user) {
      const newMsg = {
        user: {
          name: user.fullname, // 使用用戶的全名
          img: user.img || ques,
        },
        content: newMessage,
        timestamp: new Date().toISOString(), // 使用 ISO 字符串格式的時間戳
      };

      // 透過 WebSocket 傳送訊息
      socketRef.current.emit("message", newMsg);
      setNewMessage("");
      // 滾動到頂部（因為我們使用column-reverse，頂部實際上是底部）
      if (chatContentRef.current) {
        chatContentRef.current.scrollTop = 0;
      }
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatContent} ref={chatContentRef}>
        {messages.map((msg, index) => (
          <div key={index} className={styles.chatUser}>
            <div className={styles.user}>
              <img src={msg.user.img} className={styles.userImg} alt="user" />
              <span className={styles.userName}>{msg.user.name}</span>
            </div>
            <div className={styles.userContainer}>
              <span className={styles.userContent}>{msg.content}</span>
              <span className={styles.timestamp}>
                {new Date(msg.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} /> {/* 當新增訊息 會跳轉到底部 */}
      </div>
      <div className={styles.chatPanel}>
        <textarea
          className={styles.chatInput}
          value={newMessage}
          onChange={handleInputChange}
        />
        <button className={styles.chatBtn} onClick={handleSendMessage}>
          輸入
        </button>
      </div>
    </div>
  );
}

CommunityChat.propTypes = {
  user: PropTypes.object.isRequired,
};
