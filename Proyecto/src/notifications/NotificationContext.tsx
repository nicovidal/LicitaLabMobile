import React, { createContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'; // Importa esto
import { getNotificacions } from './getNotifications';
import { useAuthStore } from '../store/auth/loginAuthStore';
import NotificationService from './NotificationService'; // Asegúrate de importar la clase correctamente

interface Notification {
    id: string;
    code: string;
    createdAt: string;
    read: boolean;
    reason: string;
    tender_id: string;
}

export const NotificationContext = createContext<Notification[]>([]);

export const POLLING_INTERVAL =5222200; 

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const { status } = useAuthStore();
    const navigation = useNavigation(); 
    useEffect(() => {

        const notificationServiceInstance = new NotificationService(navigation); 

        notificationServiceInstance.requestNotificationPermission();
        notificationServiceInstance.createNotificationChannel();

        const pollerId = setInterval(async () => {
            if (status === 'authenticated') { 
                const allNotifications = await getNotificacions();
                if (allNotifications) {
                    const newNotifications = allNotifications.filter(
                        (notification:Notification) => notification.read === false
                    );
                    
                    setNotifications(newNotifications);
        
                    // Enviar una notificación para cada nuevo ítem donde read sea true
                    newNotifications.forEach((notification:Notification) => {
                        notificationServiceInstance.sendNotification(
                            "Nueva notificación de licitación",
                            `ID: ${notification.tender_id}`,
                            notification.tender_id, 
                            notification.reason 
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

