import styles from "./SearchItem.module.css";
import PropTypes from "prop-types";

export default function SearchItem({ label, options, onChange }) {
  return (
    <div className={styles.searchItem}>
      <span>{label}</span>
      <select
        className={styles.searchSelect}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">請選擇</option>
        {options.map(([key, value], index) => (
          <option key={index} value={key}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

SearchItem.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.array).isRequired,
  onChange: PropTypes.func.isRequired,
};
