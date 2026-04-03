import styles from './InputField.module.css';

function InputField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  readOnly = false,
  required = false,
  min,
  step,
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <input
        className={`${styles.input} ${readOnly ? styles.readOnly : ''}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        min={min}
        step={step}
      />
    </div>
  );
}

export default InputField;
