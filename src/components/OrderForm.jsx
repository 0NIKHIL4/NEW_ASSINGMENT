import FormSection from './FormSection';
import InputField from './InputField';
import PartyFields from './PartyFields';
import PackageCard from './PackageCard';
import styles from './OrderForm.module.css';

function OrderForm({ order }) {
  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <FormSection
        title=" CREATE ORDER "
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" />
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
        }
      >
        <div className={styles.row}>
          Shipment Details
          </div>
        <div className={styles.row}>
          <InputField
            label="Order ID"
            value={order.orderId}
            readOnly
          />
          <InputField
            label="Shipment Date"
            type="date"
            value={order.shipmentDate}
            onChange={(e) => order.setShipmentDate(e.target.value)}
            required
          />
        </div>
        <div className={styles.deliveryType}>
          <label className={styles.fieldLabel}>Delivery Type</label>
          <div className={styles.toggleGroup}>
            <button
              type="button"
              className={`${styles.toggleBtn} ${order.deliveryType === 'standard' ? styles.toggleActive : ''}`}
              onClick={() => order.setDeliveryType('standard')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Standard
            </button>
            <button
              type="button"
              className={`${styles.toggleBtn} ${order.deliveryType === 'express' ? styles.toggleActive : ''} ${order.deliveryType === 'express' ? styles.toggleExpress : ''}`}
              onClick={() => order.setDeliveryType('express')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              Express
            </button>
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Consignor (Sender)"
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        }
      >
        <PartyFields party={order.consignor} onChange={order.updateConsignor} />
      </FormSection>

      <FormSection
        title="Consignee (Receiver)"
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        }
      >
        <PartyFields party={order.consignee} onChange={order.updateConsignee} />
      </FormSection>

      <FormSection
        title="Package Information"
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        }
      >
        <div className={styles.packageList}>
          {order.packages.map((pkg, i) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              index={i}
              onUpdate={order.updatePackage}
              onRemove={order.removePackage}
              canRemove={order.packages.length > 1}
            />
          ))}
        </div>
        <button type="button" className={styles.addBtn} onClick={order.addPackage}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Package
        </button>
      </FormSection>

      <FormSection
        title="Additional Options"
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        }
      >
        <div className={styles.checkboxGroup}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={order.fragile}
              onChange={(e) => order.setFragile(e.target.checked)}
            />
            <span className={styles.checkmark} />
            <span className={styles.checkLabel}>
              <span className={styles.checkTitle}>Fragile Shipment</span>
              <span className={styles.checkDesc}>Handle with extra care</span>
            </span>
          </label>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={order.insurance}
              onChange={(e) => order.setInsurance(e.target.checked)}
            />
            <span className={styles.checkmark} />
            <span className={styles.checkLabel}>
              <span className={styles.checkTitle}>Insurance Required</span>
              <span className={styles.checkDesc}>Protect against loss or damage</span>
            </span>
          </label>
        </div>
      </FormSection>
    </form>
  );
}

export default OrderForm;
