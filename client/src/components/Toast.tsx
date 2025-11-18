import { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useUIStore } from '@/utils/store';

export const Toast: React.FC = () => {
  const { notification, hideNotification } = useUIStore();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        hideNotification();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification, hideNotification]);

  if (!notification) return null;

  const icons = {
    success: <CheckCircle className="text-green-500" size={24} />,
    error: <AlertCircle className="text-red-500" size={24} />,
    info: <Info className="text-blue-500" size={24} />,
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div className={`flex items-start gap-3 p-4 rounded-lg border shadow-lg max-w-md ${bgColors[notification.type]}`}>
        <div className="flex-shrink-0 mt-0.5">
          {icons[notification.type]}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{notification.message}</p>
        </div>
        <button
          onClick={hideNotification}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};
