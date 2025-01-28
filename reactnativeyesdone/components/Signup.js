
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import React, {useState} from 'react'

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [secondName, setsecondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignUp = () => {
      console.log('Sign Up Details:', { name, email, password });
      // Add sign-up logic here
    };
  
    return (
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="First name"
            value={firstName}
            onChangeText={setFirstName}
          />
            <TextInput
            style={styles.input}
            placeholder="Second name"
            value={secondName}
            onChangeText={setsecondName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
           <TextInput
            style={styles.input}
            placeholder="confirm Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
  
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>

    );
}


export default Signup

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    card: {
      width:'85%',
      maxWidth: 400,
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginBottom: 15,
      fontSize: 14,
    },
    button: {
      backgroundColor: 'green',
      borderRadius: 25,
      paddingVertical: 12,
      alignItems: 'center',
      width:"50%",
      marginHorizontal:"auto",
      marginVertical:10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  