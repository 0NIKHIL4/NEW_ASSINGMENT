import { useOrderForm } from './hooks/useOrderForm';
import OrderForm from './components/OrderForm';
import LivePreview from './components/LivePreview';
import styles from './App.module.css';

function App() {
  const order = useOrderForm();

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          <h1>AAJ Supply Chain</h1>
        </div>
        <p className={styles.subtitle}>Logistics Order Management</p>
      </header>
      <main className={styles.main}>
        <div className={styles.formPanel}>
          <OrderForm order={order} />
        </div>
        <div className={styles.previewPanel}>
          <LivePreview order={order} />
        </div>
      </main>
    </div>
  );
}

export default App;
