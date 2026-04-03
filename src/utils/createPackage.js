let packageCounter = 0;

export function createPackage() {
  packageCounter += 1;
  return {
    id: `pkg-${Date.now()}-${packageCounter}`,
    name: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    declaredValue: '',
  };
}
