// notificationContext.tsx

import React, { createContext, useEffect, useState } from 'react';
import { getNotificacions } from './getNotifications';
import notificationService from './NotificationService';

interface Notification {
  id: string;
  code: string;
  createdAt: string;
  read: boolean;
  reason: string;
  tender_id: string;
}

export const NotificationContext = createContext<Notification[]>([]);

const POLLING_INTERVAL = 5000; // Intervalo de 10 segundos

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const pollerId = setInterval(async () => {
      const newNotifications = await getNotificacions();
      if (newNotifications) {
        setNotifications(newNotifications);
        
        // Enviar una notificación para cada nuevo ítem
        newNotifications.forEach((notification: Notification) => {
          notificationService.sendNotification(
            "Nueva notificación de licitación",
            `ID: ${notification.tender_id} - Motivo: ${notification.reason}`
          );
        });
      }
    }, POLLING_INTERVAL);

    return () => clearInterval(pollerId);
  }, []);

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
    </NotificationContext.Provider>
  );
};
