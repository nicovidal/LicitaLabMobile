
import { StyleSheet, View } from "react-native"
import { Pressable } from "react-native-gesture-handler";
import { Button, Text, TextInput } from "react-native-paper"


export const AccountScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Nombre"
          placeholder="Ingresa tu nombre."
          autoFocus
          autoCorrect={false} />

        <TextInput
          style={styles.input}
          mode="outlined"
          label="Apellido"
          placeholder="Ingresa tu apellido."
          autoFocus
          autoCorrect={false} />

        <TextInput
          style={styles.input}
          mode="outlined"
          label="Rut Empresa"
          placeholder=""
          autoFocus
          autoCorrect={false} />

        <TextInput
          style={styles.input}
          mode="outlined"
          label="Telefono"
          placeholder=""
          autoFocus
          autoCorrect={false} />

        <TextInput
          style={styles.input}
          mode="outlined"
          editable={false}
          label="hola@gmail.com"
          autoFocus
          autoCorrect={false} />

        <TextInput
          style={styles.input}
          mode="outlined"
          label="Contraseña"
          placeholder="Ingresa tu contraseña."
          secureTextEntry
          autoFocus
          autoCorrect={false} />
          <Text style={{textAlign: 'right', marginRight: 50, color: '#F9523B', textDecorationLine: 'underline'}}>Cambiar contraseña</Text>
      </View>
    
    
      <View style={styles.buttonContainer}>
      <Button
        style={styles.buttonCancel}
        mode="contained"
       >
        <Text style={styles.buttonText}>Cancelar</Text>
      </Button>
      <Button
        style={styles.button}
        mode="contained">
        Guardar
      </Button>
      </View>
      

    </View>
  )
}



const styles = StyleSheet.create({
  container: {
      backgroundColor: '#f5f5f5',
      flex: 1,
      paddingTop: 60
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
    borderWidth: 0.5
},
  buttonText: {
    color: '#020202',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row', // Coloca los botones uno al lado del otro
    justifyContent: 'center', // Espaciado entre los botones
    paddingHorizontal: 50,
  },
});
