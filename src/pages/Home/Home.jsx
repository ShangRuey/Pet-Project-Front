import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    // 確認頁面加載時的 cookies
    console.log("Initial cookies:", document.cookie);
  }, []);

  return <p>Home</p>;
}
