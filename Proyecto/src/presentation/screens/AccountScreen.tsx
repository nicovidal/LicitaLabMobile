import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text, Snackbar } from "react-native-paper";
import { getDataAccount } from "../../actions/getDataAccount/getDataAccount";
import { patchSetUserProfile } from "../../actions/updateDataAccount/updateDataAccount";

export const AccountScreen = () => {
  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    rut: '',
    phone: '',
    email: '',
  });
  
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [visible, setVisible] = useState(false); // Para el Snackbar de éxito
  const [errorMessage, setErrorMessage] = useState(''); // Para posibles errores

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataAccount();
        setUserData({
          name: data.name || '',
          lastName: data.last_name || '',
          rut: data.tax_number || '',
          phone: data.phone || '',
          email: data.email || '',
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await patchSetUserProfile({
        name: userData.name,
        last_name: userData.lastName,
        tax_number: userData.rut,
        phone: userData.phone,
  
      });
      setVisible(true); 
    } catch (error) {
      setErrorMessage('Error al guardar los datos, por favor intenta de nuevo.');
      console.error('Error updating user details:', error);
    } finally {
      setLoading(false);
    }
  };

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cuenta</Text>

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Nombre"
        placeholder="Ingresa tu nombre."
        value={userData.name}
        onChangeText={(text) => setUserData({ ...userData, name: text })}
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Apellido"
        placeholder="Ingresa tu apellido."
        value={userData.lastName}
        onChangeText={(text) => setUserData({ ...userData, lastName: text })}
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Rut Empresa"
        placeholder="Ingresa tu rut."
        value={userData.rut}
        onChangeText={(text) => setUserData({ ...userData, rut: text })}
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Teléfono"
        placeholder="Ingresa tu teléfono."
        value={userData.phone}
        onChangeText={(text) => setUserData({ ...userData, phone: text })}
        autoCorrect={false}
      />

      <TextInput
        style={[styles.input, styles.disabledInput]} // Añadir estilo para el input del email
        mode="outlined"
        label="Email"
        value={userData.email}
        editable={false} // No editable
        autoCorrect={false}
      />

      <View style={styles.buttonContainer}>
    
        <Button 
          style={styles.button} 
          mode="contained" 
          onPress={handleSave} 
          loading={loading}
          disabled={loading}
        >
          Actualizar datos
        </Button>
      </View>

      {/* Snackbar para mostrar éxito */}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={3000}
      >
        ¡Datos guardados con éxito!
      </Snackbar>

      {/* Mostrar mensaje de error si ocurre un problema */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    paddingTop: 60,
  },
  title: {
    fontSize: 30, // Tamaño grande para el título
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginHorizontal: 50,
    marginTop: 20,
    height: 50,
  },
  disabledInput: {
    backgroundColor: '#e0e0e0', // Color gris para el input del email
  },
  button: {
    backgroundColor: '#F9523B',
    borderRadius: 10,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
    flex: 1,
    marginLeft: 10,
  },
  buttonCancel: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    flex: 1,
    marginRight: 10,
    borderColor: '#020202',
    borderWidth: 0.5,
  },
  buttonText: {
    color: '#020202',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
