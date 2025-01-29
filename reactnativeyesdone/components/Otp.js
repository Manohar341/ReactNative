import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Otp = () => {
  const navigation = useNavigation();
  
  const [inputs, setInputs] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: '',
  });

  const [errors, setErrors] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: '',
  });

  const [userEmail, setUserEmail] = useState('');

  const inputRefs = {
    input1: useRef(null),
    input2: useRef(null),
    input3: useRef(null),
    input4: useRef(null),
    input5: useRef(null),
    input6: useRef(null),
  };

  useEffect(() => {
    const getEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
    };
    getEmail();
  }, []);

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });

    if (value && !/^[a-zA-Z0-9]*$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'Only alphanumeric characters allowed',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }

    if (value.length === 1) {
      const nextInput = getNextInput(name);
      if (nextInput && inputRefs[nextInput]) {
        inputRefs[nextInput].current.focus();
      }
    }
  };

  const getNextInput = (currentInput) => {
    const inputOrder = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
    const currentIndex = inputOrder.indexOf(currentInput);
    if (currentIndex < inputOrder.length - 1) {
      return inputOrder[currentIndex + 1];
    }
    return null;
  };

  const handleVerify = async () => {
    const otp = Object.values(inputs).join(''); // Join the OTP parts into a single string

    // Validate the OTP
    if (!/^[a-zA-Z0-9]{6}$/.test(otp)) {
      console.log('Error', 'Please enter a valid OTP (6 alphanumeric characters)');
      return;
    }

    try {
      const response = await axios.post('verify-otp-email', { otp, userEmail });
      console.log(response.data); // Log the response for debugging

      if (response.data.success) {
        
        navigation.navigate("Login");
      } 
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while verifying the OTP.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputRow}>
        {['input1', 'input2', 'input3', 'input4', 'input5', 'input6'].map((inputName, index) => (
          <View key={inputName} style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder=''
              value={inputs[inputName]}
              onChangeText={(text) => handleChange(inputName, text)}
              keyboardType="numeric" // Optional: Only numeric input
              maxLength={1} // Limit each box to 1 character
              ref={inputRefs[inputName]} // Assign ref for focus management
            />
            {errors[inputName] ? <Text style={styles.errorText}>{errors[inputName]}</Text> : null}
          </View>
        ))}
      </View>

      <Button title="Verify OTP" onPress={handleVerify} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',  // Ensure the background is visible
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  inputContainer: {
    width: 40, // Small input box width
    marginHorizontal: 5,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center', // Center the text inside the box
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default Otp;
