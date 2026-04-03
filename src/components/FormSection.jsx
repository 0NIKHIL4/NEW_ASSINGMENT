import styles from './FormSection.module.css';

function FormSection({ title, icon, children }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {title}
      </h2>
      <div className={styles.content}>{children}</div>
    </section>
  );
}

export default FormSection;
