import { Platform } from 'react-native';
import PushNotification, { Importance } from 'react-native-push-notification';

class NotificationService {
    constructor() {
        this.requestNotificationPermission(); // Solicita permisos al inicializar el servicio

        PushNotification.configure({
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
            },

            requestPermissions: Platform.OS === 'ios', 
        });

        // Crear el canal de notificación
        PushNotification.createChannel(
            {
                channelId: "hola", // ID del canal
                channelName: "hola", // Nombre del canal
                channelDescription: "A channel for default notifications", 
                importance: Importance.HIGH, // Importancia del canal
                vibrate: true, // Habilitar vibración
            },
            (created) => {
                console.log(`createChannel returned '${created}'`);
            }
        );
    }


    requestNotificationPermission() {
        if (Platform.OS === 'android') {
   
            PushNotification.checkPermissions((permissionStatus) => {
                console.log("Current permission status: ", permissionStatus);

                // Verificar el estado del permiso
                if (!permissionStatus.alert) { // Verificar si el permiso está concedido
                    // Solicitar permiso para las notificaciones
                    PushNotification.requestPermissions().then(granted => {
                        if (granted) {
                            console.log("Permission granted for notifications");
                        } else {
                            console.log("Permission denied for notifications");
                        }
                    });
                } else {
                    console.log("Notifications permission already granted");
                }
            });
        }
    }

    // Método para enviar notificaciones
    sendNotification(title: string, message: string) {
        PushNotification.localNotification({
            channelId: "hola", // Asegúrate de especificar el canal correcto
            title: title,
            message: message,
        });
    }
}

const notificationService = new NotificationService();
export default notificationService;



