import React, { createContext, useEffect, useState } from 'react';
import notificationService from './NotificationService';
import { getNotificacions } from './getNotifications';
import { useAuthStore } from '../store/auth/loginAuthStore';


interface Notification {
    id: string;
    code: string;
    createdAt: string;
    read: boolean;
    reason: string;
    tender_id: string;
}

export const NotificationContext = createContext<Notification[]>([]);

const POLLING_INTERVAL = 1000000; 

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const { status } = useAuthStore();

    useEffect(() => {
        notificationService.requestNotificationPermission();
        notificationService.createNotificationChannel();

        const pollerId = setInterval(async () => {
            if (status === 'authenticated') { 
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
            }
        }, POLLING_INTERVAL);

        return () => clearInterval(pollerId);
    }, [status]); 

    return (
        <NotificationContext.Provider value={notifications}>
            {children}
        </NotificationContext.Provider>
    );
};
