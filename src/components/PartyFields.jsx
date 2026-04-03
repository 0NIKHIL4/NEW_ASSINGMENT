import InputField from './InputField';
import styles from './PartyFields.module.css';

function PartyFields({ party, onChange }) {
  return (
    <div className={styles.grid}>
      <InputField
        label="Full Name"
        value={party.name}
        onChange={(e) => onChange('name', e.target.value)}
        placeholder="Enter full name"
        required
      />
      <InputField
        label="Address"
        value={party.address}
        onChange={(e) => onChange('address', e.target.value)}
        placeholder="Street address"
        required
      />
      <InputField
        label="City"
        value={party.city}
        onChange={(e) => onChange('city', e.target.value)}
        placeholder="City"
        required
      />
      <InputField
        label="Pincode"
        value={party.pincode}
        onChange={(e) => onChange('pincode', e.target.value)}
        placeholder="6-digit pincode"
        required
      />
    </div>
  );
}

export default PartyFields;
