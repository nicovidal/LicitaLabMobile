import notifee, { AndroidImportance, AuthorizationStatus } from '@notifee/react-native';


class NotificationService {
    constructor() {
        this.requestNotificationPermission();
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
            name: 'Default Channel',
            importance: AndroidImportance.HIGH,
            vibration: true,
        });
    }

    async sendNotification(title: string, body: string) {
        await notifee.displayNotification({
            title,
            body,
            android: {
                channelId: 'Licitalab',
                importance: AndroidImportance.HIGH,
            },
        });
    }
}

const notificationService = new NotificationService();
export default notificationService;

