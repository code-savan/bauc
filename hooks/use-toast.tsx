import { useState } from 'react';

interface Toast {
  id: string;
  title: string;
  description?: string;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (title: string, description?: string) => {
    const newToast: Toast = {
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      title,
      description,
    };
    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Auto-remove toast after 3 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== newToast.id));
    }, 3000);
  };

  return { toasts, showToast };
}
