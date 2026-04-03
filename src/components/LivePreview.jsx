import styles from './LivePreview.module.css';

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function LivePreview({ order }) {
  const { orderId, shipmentDate, deliveryType, consignor, consignee, packages, fragile, insurance, summary } = order;

  const hasConsignor = consignor.name || consignor.city;
  const hasConsignee = consignee.name || consignee.city;

  return (
    <div className={styles.preview}>
      <div className={styles.previewHeader}>
        <h2 className={styles.previewTitle}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
           Shipment Live Preview
        </h2>
        <span className={styles.liveIndicator}>
          <span className={styles.liveDot} />
          LIVE
        </span>
      </div>

      <div className={styles.receipt}>
        <div className={styles.receiptHeader}>
          <div>
            <div className={styles.orderId}>{orderId}</div>
            <div className={styles.orderDate}>{formatDate(shipmentDate)}</div>
          </div>
          <span className={`${styles.badge} ${deliveryType === 'express' ? styles.badgeExpress : styles.badgeStandard}`}>
            {deliveryType === 'express' ? '⚡ Express' : '📦 Standard'}
          </span>
        </div>

        {(fragile || insurance) && (
          <div className={styles.flags}>
            {fragile && (
              <span className={styles.flag}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                </svg>
                Fragile
              </span>
            )}
            {insurance && (
              <span className={`${styles.flag} ${styles.flagInsurance}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Insured
              </span>
            )}
          </div>
        )}

        <div className={styles.parties}>
          <div className={styles.partyCard}>
            <span className={styles.partyLabel}>From (Sender)</span>
            {hasConsignor ? (
              <>
                <span className={styles.partyName}>{consignor.name || '—'}</span>
                <span className={styles.partyAddress}>
                  {[consignor.address, consignor.city, consignor.pincode].filter(Boolean).join(', ') || '—'}
                </span>
              </>
            ) : (
              <span className={styles.emptyState}>Sender details pending</span>
            )}
          </div>
          <div className={styles.partyDivider}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
          <div className={styles.partyCard}>
            <span className={styles.partyLabel}>To (Reciever)</span>
            {hasConsignee ? (
              <>
                <span className={styles.partyName}>{consignee.name || '—'}</span>
                <span className={styles.partyAddress}>
                  {[consignee.address, consignee.city, consignee.pincode].filter(Boolean).join(', ') || '—'}
                </span>
              </>
            ) : (
              <span className={styles.emptyState}>Receiver details pending</span>
            )}
          </div>
        </div>

        <div className={styles.packagesSection}>
          <h3 className={styles.sectionTitle}>
            Packages ({summary.totalPackages})
          </h3>
          {packages.map((pkg, i) => {
            const hasData = pkg.name || pkg.weight || pkg.declaredValue;
            return (
              <div key={pkg.id} className={styles.packageItem}>
                <div className={styles.packageHead}>
                  <span className={styles.packageIdx}>{i + 1}</span>
                  <span className={styles.packageName}>
                    {pkg.name || `Package #${i + 1}`}
                  </span>
                </div>
                {hasData && (
                  <div className={styles.packageMeta}>
                    {pkg.weight && <span>{pkg.weight} kg</span>}
                    {(pkg.length || pkg.width || pkg.height) && (
                      <span>{pkg.length || 0} × {pkg.width || 0} × {pkg.height || 0} cm</span>
                    )}
                    {pkg.declaredValue && <span>{formatCurrency(pkg.declaredValue)}</span>}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.summarySection}>
          <div className={styles.summaryRow}>
            <span>Total Packages</span>
            <span className={styles.summaryValue}>{summary.totalPackages}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Total Weight</span>
            <span className={styles.summaryValue}>{summary.totalWeight.toFixed(2)} kg</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
            <span>Total Declared Value</span>
            <span className={styles.summaryValue}>{formatCurrency(summary.totalValue)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LivePreview;
