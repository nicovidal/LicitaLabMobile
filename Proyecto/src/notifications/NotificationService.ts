import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { readNotificacion } from './readNotificacion';


const reasonMapping: { [key: string]: string } = {
    QUESTIONS_FOUND: "Preguntas Encontradas",
    ANSWERS_FOUND: "Respuestas Encontradas",
    CHANGE_DATES: "Cambio de Fechas",
    CHANGE_STATUS: "Cambio de Estado",
};

class NotificationService {
    navigation: any; 

    constructor(navigation: any) {
        this.navigation = navigation; 
        this.requestNotificationPermission();
        this.createNotificationChannel();
        this.registerNotificationEventListeners();
    }

    async requestNotificationPermission() {
        const settings = await notifee.requestPermission();
        if (settings.authorizationStatus < 1) {
      /*       console.log('Permisos de notificación no otorgados.'); */
        } else {
     /*        console.log('Permisos de notificación otorgados.'); */
        }
    }

    async createNotificationChannel() {
        await notifee.createChannel({
            id: 'Licitalab',
            name: 'Licitaciones',
            importance: AndroidImportance.HIGH,
            vibration: true,
        });
    }

    async sendNotification(title: string, body: string, tenderId: string, reason: string,id:string) {
        const formattedReason = reasonMapping[reason] || reason;
        await notifee.displayNotification({
            title,
            body: `${body} - Motivo: ${formattedReason}`,
            data: { tenderId, reason ,id},  
            android: {
                channelId: 'Licitalab',
                importance: AndroidImportance.HIGH,
                pressAction: {
                    id: 'default', 
                },
            },
        });
    }

    registerNotificationEventListeners() {
        notifee.onBackgroundEvent(async ({ type, detail }) => {
            this.handleNotificationInteraction(type, detail);
        });

        notifee.onForegroundEvent(({ type, detail }) => {
            this.handleNotificationInteraction(type, detail);
        });
    }

    async handleNotificationInteraction(type: EventType, detail: any) {
        if (type === EventType.PRESS) {
            const { tenderId, id } = detail.notification.data;
 /*            if (id) {
                try {
                    await readNotificacion(id); 
                    console.log(`Notificación con ID: ${id} marcada como leída.`);
                } catch (error) {
                    console.error("Error al marcar la notificación como leída:", error);
                }
            } */

            if (tenderId && this.navigation) {
                this.navigation.navigate('Details', { code: tenderId, type: 'tender' });
            }
        }
    }
}

export default NotificationService;

