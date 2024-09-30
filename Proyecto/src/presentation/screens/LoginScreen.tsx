import React, { useState } from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../navigator/StackNavigator";
import { useAuthStore } from "../../store/auth/loginAuthStore";

interface Props extends StackScreenProps<RootStackParams, 'Login'> {}

export const LoginScreen = ({ navigation }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, status, error } = useAuthStore();

    const handleLogin = async () => {
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
                <Image style={styles.logo} source={require('../../assets/LicitaLabLogo.jpg')} />
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
                    secureTextEntry
                    autoCorrect={false}
                />

                <Button
                    style={styles.button}
                    mode="contained"
                    onPress={handleLogin}
                >
                    Iniciar sesión
                </Button>
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
        width: 450,
        height: 180,
        resizeMode: 'contain',
        marginLeft: 15
    },
    input: {
        marginHorizontal: 50,
        marginTop: 20,
        height: 50
    },
    button: {
        backgroundColor: '#F9523B',
        borderRadius: 10,
        marginHorizontal: 117.5,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%'
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10
    },
});
