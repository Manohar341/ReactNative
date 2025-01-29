import { 
  View, Text, TextInput, TouchableOpacity, ActivityIndicator, 
  StyleSheet, ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import axiosInstance from '../axios';
import Toast from "react-native-toast-message";

const Signup = ({ navigation }) => {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (name, value) => {
      setFormData({ ...formData, [name]: value });
    };

    const handlePhoneChange = (value) => {
      let formattedValue = value.replace(/\D/g, ""); // Remove non-numeric characters

      if (formattedValue.length <= 3) {
        formattedValue = formattedValue.replace(/(\d{0,3})/, "$1");
      } else if (formattedValue.length <= 6) {
        formattedValue = formattedValue.replace(/(\d{3})(\d{0,3})/, "$1-$2");
      } else {
        formattedValue = formattedValue.replace(/(\d{3})(\d{3})(\d{0,4})/, "$1-$2-$3");
      }

      setFormData({ ...formData, phone: formattedValue });
    };

    const handleRegister = async () => {
      setError("");

      if (!formData.firstName || !formData.lastName || !formData.phone || 
          !formData.email || !formData.password || !formData.confirmPassword) {
        setError("Please fill in all required fields.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address.");
        return;
      }

      const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
      if (!phoneRegex.test(formData.phone)) {
        setError("Please enter a valid phone number (XXX-XXX-XXXX).");
        return;
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        setError("Password must have at least 8 characters, one uppercase letter, one number, and one special character.");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      setIsLoading(true);

      try {
        const response = await axiosInstance.post("register", {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword,
          status: 1,
        });

        if (response.status === 200 || response.status === 201) {
          Toast.show({
                  type: "success",
                  text1: "Register Successful!",
                });
        
                setTimeout(() => {
                  navigation.navigate("Login");
                }, 1000);
        
        } else {
          setError("User is already registered. Please log in.");
        }

        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

      } catch (error) {
        console.error("API Error:", error);
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message + " Please click on login.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Sign Up</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(value) => handleInputChange("firstName", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={(value) => handleInputChange("lastName", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number (XXX-XXX-XXXX)"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={handlePhoneChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={(value) => handleInputChange("password", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(value) => handleInputChange("confirmPassword", value)}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    card: {
      width: '85%',
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
      width: '50%',
      alignSelf: 'center',
      marginVertical: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      marginBottom: 10,
    },
});
