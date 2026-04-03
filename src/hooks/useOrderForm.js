import { useState, useMemo } from 'react';
import { generateOrderId } from '../utils/generateOrderId';
import { createPackage } from '../utils/createPackage';

const initialParty = { name: '', address: '', city: '', pincode: '' };

export function useOrderForm() {
  const [orderId] = useState(() => generateOrderId());
  const [shipmentDate, setShipmentDate] = useState('');
  const [deliveryType, setDeliveryType] = useState('standard');
  const [consignor, setConsignor] = useState({ ...initialParty });
  const [consignee, setConsignee] = useState({ ...initialParty });
  const [packages, setPackages] = useState(() => [createPackage()]);
  const [fragile, setFragile] = useState(false);
  const [insurance, setInsurance] = useState(false);

  const updateConsignor = (field, value) => {
    setConsignor((prev) => ({ ...prev, [field]: value }));
  };

  const updateConsignee = (field, value) => {
    setConsignee((prev) => ({ ...prev, [field]: value }));
  };

  const addPackage = () => {
    setPackages((prev) => [...prev, createPackage()]);
  };

  const removePackage = (id) => {
    setPackages((prev) => (prev.length > 1 ? prev.filter((p) => p.id !== id) : prev));
  };

  const updatePackage = (id, field, value) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const summary = useMemo(() => {
    const totalPackages = packages.length;
    const totalWeight = packages.reduce((sum, p) => sum + (parseFloat(p.weight) || 0), 0);
    const totalValue = packages.reduce((sum, p) => sum + (parseFloat(p.declaredValue) || 0), 0);
    return { totalPackages, totalWeight, totalValue };
  }, [packages]);

  return {
    orderId,
    shipmentDate,
    setShipmentDate,
    deliveryType,
    setDeliveryType,
    consignor,
    updateConsignor,
    consignee,
    updateConsignee,
    packages,
    addPackage,
    removePackage,
    updatePackage,
    fragile,
    setFragile,
    insurance,
    setInsurance,
    summary,
  };
}
