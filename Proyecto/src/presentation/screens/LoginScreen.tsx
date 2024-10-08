import React, { useState } from "react";
import { Image, StyleSheet, View, Text, Linking } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../navigator/StackNavigator";
import { useAuthStore } from "../../store/auth/loginAuthStore";
import { Pressable } from "react-native-gesture-handler";
import { IonIcon } from "../components/shared/IonIcon";
import { LoaderScreen } from "../components/LoaderScreen";

interface Props extends StackScreenProps<RootStackParams, 'Login'> {}

export const LoginScreen = ({ navigation }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login, error } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null); // Estado para el error de inicio de sesión

    const handleLogin = async () => {
        setIsLoading(true);
        setLoginError(null); // Resetear el error al intentar iniciar sesión

        const success = await login(email, password);

        setTimeout(() => {
            setIsLoading(false);
            if (success) {
                navigation.navigate('BottomTabNavigator');
            } else {
                setLoginError("Error en la contraseña o el correo electrónico."); // Establecer el mensaje de error
                console.log("Error al iniciar sesión:", error);
            }
        }, 2000);
    };

    const forgotPasswordPress = () => {
        Linking.openURL('https://app.licitalab.cl/forgot_password');
    };

    const registerAccountPress = () => {
        Linking.openURL('https://app.licitalab.cl/new_user');
    };

    if (isLoading) {
        return <LoaderScreen />;
    } 

    return (
        <View style={styles.container}>
            <View style={[{ paddingTop: 100 }]}>
                <Image style={styles.logo} source={require('../../assets/LicitaLabLogo.jpg')} />
            </View>

            <Text style={styles.title}>Iniciar sesión</Text>

            <View style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    label="Correo electrónico"
                    placeholder="Ingresa tu correo electrónico."
                    value={email}
                    onChangeText={setEmail}
                    autoFocus
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    label="Contraseña"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCorrect={false}
                    right={
                        <TextInput.Icon
                            icon={() => (
                                <Pressable onPress={() => setShowPassword(!showPassword)}>
                                    <Text style={{ fontSize: 20 }}>{showPassword ? <IonIcon name="eye"/> : <IonIcon name="eye-off"/>}</Text> 
                                </Pressable>
                            )}
                        />
                    }
                />
                <Pressable onPress={forgotPasswordPress}>
                    <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
                </Pressable>
                
                {/* Mostrar mensaje de error si existe */}
                {loginError && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{loginError}</Text>
                    </View>
                )}

                <Button
                    style={styles.button}
                    mode="contained"
                    onPress={handleLogin}
                >
                    Iniciar sesión
                </Button>

                <View style={styles.containerTextos}>
                    <Text style={styles.text}>
                        ¿No tienes cuenta?
                    </Text>
                    <Pressable onPress={registerAccountPress}>
                        <Text style={styles.registerText}>Regístrate aquí</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
    },
    title: {
        fontSize: 26,
        display: 'flex',
        paddingTop: '10%',
        marginLeft: '10%',
        fontWeight: 'bold',
        color: 'black'
    },
    containerInput: {
        paddingTop: '15%'
    },
    logo: {
        width: '80%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    input: {
        marginHorizontal: 50,
        marginTop: 20,
        height: 50
    },
    button: {
        backgroundColor: '#F9523B',
        borderRadius: 10,
        marginTop: 50,
        width: '60%',
        alignSelf: 'center'
    },
    errorContainer: {
        backgroundColor: '#FFCCCC', // Fondo rojo claro
        borderRadius: 8,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 50,
    },
    errorText: {
        color: '#D8000C', // Color del texto del error
        textAlign: 'center',
        fontWeight: 'bold',
    },
    forgotPassword: {
        textAlign: 'right',
        marginRight: 50,
        marginTop: 5,
        color: '#F9523B',
        textDecorationLine: 'underline'
    },
    containerTextos: {
        flexDirection: 'row', 
        justifyContent: 'center',   
        marginTop: 20,
    },
    text: {
        fontSize: 14,      
        color: 'black',
        textAlign: 'center',
    },
    registerText: {
        fontSize: 14,              
        color: '#F9523B',          
        textDecorationLine: 'underline',
        marginLeft: 5,         
    },
});
