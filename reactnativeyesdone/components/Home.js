import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Pressable, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.homecard}>
     <Text style={styles.heading}>Log in/Sign up</Text>
      {/* <Image source={require("../assets/logo.png")} style={styles.image} /> */}
     <Text style={styles.subtitle}>Please log in or sign up to continue</Text>
     <TouchableOpacity  onPress={() => navigation.navigate("Signup")} style={styles.signupbutton}>
      <Text style={styles.sgnuptext}>Signup</Text>
     </TouchableOpacity>
     <Pressable onPress={() => navigation.navigate("Login")} style={styles.loginbutton}>
      <Text style={styles.logintext}>Login</Text>
     </Pressable>
    </View>
    </ScrollView>
 
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  heading:{
fontSize:25,
fontWeight:500,
textAlign:"center",
marginBottom:26,
  },
  homecard:{
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 15,
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight:700,
    color: "#666",
    marginBottom: 15,
    textAlign: "center",
  },
  signupbutton:{
    backgroundColor: '#28a745',
    borderRadius: 25,
    paddingTop: 7,
    paddingBottom:10,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    marginVertical: 10,
    alignItems:"center",
  },
  sgnuptext:{
    fontSize:16,
    color:"white",
    fontWeight:600,
},
    loginbutton:{
      backgroundColor: "#fff",
      paddingTop: 7,
      paddingBottom:10,
      alignItems: 'center',
      width: '80%',
      alignSelf: 'center',
      marginVertical: 10,
      borderRadius: 28,
      borderWidth: 2,
      borderColor: "#ddd",
  },
  logintext:{
    fontSize:16,
    color:"black",
    fontWeight:600,
},
  image: {
    width: 100, 
    height: 100,
    resizeMode: "contain", 
    marginBottom: 20,
    alignSelf: "center",
  },
})