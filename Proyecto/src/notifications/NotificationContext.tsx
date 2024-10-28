// notificationContext.tsx

import { createContext, useEffect, useState } from 'react';
import { getNotificacions } from './getNotifications';

interface Notification {

  id: number;
  message: string;

}

export const NotificationContext = createContext<Notification[]>([]); 

const POLLING_INTERVAL = 5000; 

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const pollerId = setInterval(async () => {
      const newNotifications = await getNotificacions();
      if (newNotifications) setNotifications(newNotifications);
    }, POLLING_INTERVAL);

    return () => clearInterval(pollerId); 
  }, []);

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
    </NotificationContext.Provider>
  );
};
