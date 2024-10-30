import notifee, { AndroidImportance, EventType } from '@notifee/react-native';


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
            console.log('Permisos de notificación no otorgados.');
        } else {
            console.log('Permisos de notificación otorgados.');
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

    async sendNotification(title: string, body: string, tenderId: string, reason: string) {
        const formattedReason = reasonMapping[reason] || reason; // Usa el texto amigable o deja el original
        await notifee.displayNotification({
            title,
            body: `${body} - Motivo: ${formattedReason}`,
            data: { tenderId, reason },  // Agrega tenderId y reason en los datos de la notificación
            android: {
                channelId: 'Licitalab',
                importance: AndroidImportance.HIGH,
                pressAction: {
                    id: 'default',  // Acción predeterminada
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

    handleNotificationInteraction(type: EventType, detail: any) {
        if (type === EventType.PRESS) {
            const { tenderId, type: notificationType } = detail.notification.data; 
            if (tenderId && this.navigation) {
                console.log(`Ir al detalle de la licitación con ID: ${tenderId} y tipo: tender`);
                this.navigation.navigate('Details', { code: tenderId, type: 'tender' }); 
            }
        }
    }
}

export default NotificationService;

