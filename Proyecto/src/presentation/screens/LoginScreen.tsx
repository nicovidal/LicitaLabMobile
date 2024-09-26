import { Image, StyleSheet, View } from "react-native"
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../navigator/StackNavigator";


interface Props extends StackScreenProps<RootStackParams, 'Login'> { }



export const LoginScreen = ({ navigation }: Props) => {



  return (

    <View style = {styles.container}>
      <View style={[{paddingTop: 100}]}>
        <Image style={ styles.logo}
        source={require('../../assets/LicitaLabLogo.jpg')}
        />
      </View>
      
      <View>
        <TextInput style={ styles.input}
        mode="outlined"
        label="Correo electrónico"
        placeholder="Ingresa tu correo electrónico."
        autoFocus
        autoCorrect={false}
      />
      <TextInput style={ styles.input}
        mode="outlined"
        label="Contraseña"
        placeholder="Ingresa tu contraseña"
        autoFocus
        autoCorrect={false}
      />

      <Button style={styles.button}
      mode="contained" 
      onPress={()=> navigation.navigate('DashBoard')}>
        Iniciar sesión
      </Button>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
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
  },

);
