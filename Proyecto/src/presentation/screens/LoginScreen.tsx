import React, { useState } from "react";
import { Image, StyleSheet, View, Text, Linking } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../navigator/StackNavigator";
import { useAuthStore } from "../../store/auth/loginAuthStore";

interface Props extends StackScreenProps<RootStackParams, 'Login'> {}

export const LoginScreen = ({ navigation }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login, error } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null); 

    const handleLogin = async () => {
        setIsLoading(true);
        setLoginError(null); 

        const success = await login(email, password);
        if (success) {
            navigation.navigate('BottomTabNavigator');
        } else {
            console.log("Error al iniciar sesión:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={[{ paddingTop: 100 }]}>
                <Image style={styles.logo} source={require('../../assets/LicitaLabLogo.png')} />
            </View>

            <View>
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
                />

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
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%'
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
        marginTop: 10
    },
});
