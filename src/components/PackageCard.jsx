import InputField from './InputField';
import styles from './PackageCard.module.css';

function PackageCard({ pkg, index, onUpdate, onRemove, canRemove }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.packageNumber}>Package #{index + 1}</span>
        {canRemove && (
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => onRemove(pkg.id)}
            aria-label="Remove package"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Remove
          </button>
        )}
      </div>
      <div className={styles.fields}>
        <div className={styles.fullWidth}>
          <InputField
            label="Package Name / Label"
            value={pkg.name}
            onChange={(e) => onUpdate(pkg.id, 'name', e.target.value)}
            placeholder="e.g. Electronics Box"
            required
          />
        </div>
        <InputField
          label="Weight (kg)"
          type="number"
          value={pkg.weight}
          onChange={(e) => onUpdate(pkg.id, 'weight', e.target.value)}
          placeholder="0.0"
          min="0"
          step="0.1"
          required
        />
        <InputField
          label="Length (cm)"
          type="number"
          value={pkg.length}
          onChange={(e) => onUpdate(pkg.id, 'length', e.target.value)}
          placeholder="0"
          min="0"
        />
        <InputField
          label="Width (cm)"
          type="number"
          value={pkg.width}
          onChange={(e) => onUpdate(pkg.id, 'width', e.target.value)}
          placeholder="0"
          min="0"
        />
        <InputField
          label="Height (cm)"
          type="number"
          value={pkg.height}
          onChange={(e) => onUpdate(pkg.id, 'height', e.target.value)}
          placeholder="0"
          min="0"
        />
        <InputField
          label="Declared Value (₹)"
          type="number"
          value={pkg.declaredValue}
          onChange={(e) => onUpdate(pkg.id, 'declaredValue', e.target.value)}
          placeholder="0"
          min="0"
          required
        />
      </div>
    </div>
  );
}

export default PackageCard;
