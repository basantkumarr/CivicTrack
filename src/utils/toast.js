// Mock toast library since we haven't installed react-hot-toast yet
export const toast = {
  success: (message) => console.log('Success:', message),
  error: (message) => console.error('Error:', message),
  loading: (message) => console.log('Loading:', message),
  custom: (component) => console.log('Custom:', component),
};

export const Toaster = ({ position, toastOptions }) => {
  // Mock Toaster component
  return null;
};
