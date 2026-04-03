let counter = 0;

export function generateOrderId() {
  counter += 1;
  const timestamp = Date.now().toString(36).toUpperCase();
  const seq = String(counter).padStart(3, '0');
  return `ORD-${timestamp}-${seq}`;
}
