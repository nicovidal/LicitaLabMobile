import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';


export const LoaderScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/LogoCarga.jpg')} style={styles.logo} resizeMode="contain" />
      <ActivityIndicator size="large" color="#F9523B" style={styles.spinner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 150, 
    height: 150, 
    marginBottom: 20, 
  },
  spinner: {
    marginVertical: 10, 
  },
  loadingText: {
    fontSize: 18,
    color: '#555', 
    marginTop: 10,
  },
});
