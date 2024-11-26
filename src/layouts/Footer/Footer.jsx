import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLine } from "@fortawesome/free-brands-svg-icons";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer>
      <div className={styles.footerContainer}>
        <div className="connection">
          聯絡資訊：
          <FontAwesomeIcon icon={faFacebook} className={styles.fbIcon} />
          <FontAwesomeIcon icon={faLine} className={styles.lineIcon} />
          <FontAwesomeIcon icon={faEnvelope} className={styles.mailIcon} />
        </div>
        <FontAwesomeIcon icon={faCopyright} /> 2024 Shang
      </div>
    </footer>
  );
}
