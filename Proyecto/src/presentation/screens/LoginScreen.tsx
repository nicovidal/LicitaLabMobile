import React, { useState } from "react";
import { Image, StyleSheet, View, Text, Linking, Dimensions } from "react-native";
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
    const [loginError, setLoginError] = useState<string | null>(null);

    const { width } = Dimensions.get('window');
    const isTablet = width > 168;

    const handleLogin = async () => {
        setIsLoading(true);
        setLoginError(null);

        const success = await login(email, password);

        setTimeout(() => {
            setIsLoading(false);
            if (success) {
                navigation.navigate('BottomTabNavigator');
            } else {
                setLoginError("Error en la contraseña o el correo electrónico.");
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
        <View style={isTablet ? styles.containerTablet : styles.container}>
            <View style={{ paddingTop: isTablet ? 50 : 100 }}>
                <Image style={isTablet ? styles.logoTablet : styles.logo} source={require('../../assets/LicitaLabLogo.jpg')} />
            </View>

            <Text style={isTablet ? styles.titleTablet : styles.title}>Iniciar sesión</Text>

            <View style={isTablet ? styles.containerInputTablet : styles.containerInput}>
                <TextInput
                    style={isTablet ? styles.inputTablet : styles.input}
                    mode="outlined"
                    label="Correo electrónico"
                    placeholder="Ingresa tu correo electrónico."
                    value={email}
                    onChangeText={setEmail}
                    autoFocus
                    autoCorrect={false}
                />
                <TextInput
                    style={isTablet ? styles.inputTablet : styles.input}
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

                {loginError && (
                    <View style={isTablet ? styles.errorContainerTablet : styles.errorContainer}>
                        <Text style={styles.errorText}>{loginError}</Text>
                    </View>
                )}

                <Button
                    style={isTablet ? styles.buttonTablet : styles.button}
                    mode="contained"
                    onPress={handleLogin}
                >
                    Iniciar sesión
                </Button>

                <View style={styles.containerTextos}>
                    <Text style={styles.text}>¿No tienes cuenta?</Text>
                    <Pressable onPress={registerAccountPress}>
                        <Text style={styles.registerText}>Regístrate aquí</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
    },
    containerTablet: {
        backgroundColor: '#f5f5f5',
        flex: 1,
        paddingHorizontal: '20%',
    },
    title: {
        fontSize: 26,
        paddingTop: '10%',
        marginLeft: '10%',
        fontWeight: 'bold',
        color: 'black',
    },
    titleTablet: {
        fontSize: 40,
        paddingTop: '70%',
        marginLeft: '10%',
        fontWeight: 'bold',
        color: 'black',
    },
    containerInput: {
        paddingTop: '15%',
    },
    containerInputTablet: {
        paddingTop: '10%',
    },
    logo: {
        width: '80%',
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    logoTablet: {
        width: '100%',
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    input: {
        marginHorizontal: 50,
        marginTop: 20,
        height: 50,
    },
    inputTablet: {
        marginHorizontal: 20,
        marginTop: 20,
        height: 60,
    },
    button: {
        backgroundColor: '#F9523B',
        borderRadius: 10,
        marginTop: 50,
        width: '60%',
        alignSelf: 'center',
    },
    buttonTablet: {
        backgroundColor: '#F9523B',
        borderRadius: 15,
        marginTop: 50,
        width: '40%',
        alignSelf: 'center',
    },
    errorContainer: {
        backgroundColor: '#FFCCCC',
        borderRadius: 8,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 50,
    },
    errorContainerTablet: {
        backgroundColor: '#FFCCCC',
        borderRadius: 8,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    errorText: {
        color: '#D8000C',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    forgotPassword: {
        textAlign: 'right',
        marginRight: 50,
        marginTop: 5,
        color: '#F9523B',
        textDecorationLine: 'underline',
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
