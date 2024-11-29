import styles from "./Aside.module.css";
import PropTypes from "prop-types";

export default function Aside({ children }) {
  return (
    <aside className={styles.contentAside}>
      <dl className={styles.asideDl}>{children}</dl>
    </aside>
  );
}

Aside.propTypes = {
  children: PropTypes.any,
};
