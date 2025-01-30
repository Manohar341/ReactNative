import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axiosInstance from "../axios";
import Icon from "react-native-vector-icons/Ionicons";

const TOKEN_KEY = "access_token";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Validate email and password
  const validateInputs = () => {
    if (!email || !emailRegex.test(email)) {
      setLoginError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const loginUser = async (email, password) => {
    const url = `login`;
    const data = { email, password };
    try {
      const response = await axiosInstance.post(url, data);
      if (response?.data?.status === 200) {
        const token = response?.data?.data?.access_token;
        await AsyncStorage.setItem(TOKEN_KEY, token);

        Toast.show({
          type: "success",
          text1: "Login Successful!",
        });

        setTimeout(() => {
          navigation.navigate("Home");
        }, 1000);

        return response?.data;
      } else {
        setLoginError("Invalid credentials");
        return null;
      }
    } catch (error) {
      console.error("Login Error:", error);
      setLoginError("Invalid credentials. Please try again.");
      throw new Error(error.message);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setLoginError(null);

    if (validateInputs()) {
      try {
        await loginUser(email, password);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <ScrollView contentContainerStyle={styles.logincontainer}>
      <View style={styles.logincard}>
        <Text style={styles.loginheader}>Log In</Text>
        <Image
  source={{ uri: "https://medicalbreakthrough.org/cdn/shop/files/new-logo3r_1_-1.png?v=1732598848" }}
  style={styles.logo}
/>
        <TextInput
          style={styles.logininput}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => setIsFocused(true)}  
          onBlur={() => setIsFocused(false)} 
        />
        {loginError && <Text style={styles.errorText}>{loginError}</Text>}

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.logininput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.togglePassword}
          >
           <Icon 
  name={passwordVisible ? "eye-off" : "eye"} 
  size={20} 
  color="black" 
/>
          </TouchableOpacity>
        </View>
         <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>

     

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotPassword}>Forgot Your Password?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logincontainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  logincard: {
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
  loginheader: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  logininput: {
    backgroundColor: "#f1f1f3",
    paddingTop: 10,
    paddingBottom:12,
    paddingHorizontal:10,
    marginBottom: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#b4aeae",
  },
  button: {
    backgroundColor: "#0196da",
    padding: 10,
    borderRadius: 25,
    width: "100%",
    alignContent: "center",
    cursor: "pointer",
    marginHorizontal: "auto",
    marginTop:10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  forgotPassword: {
    marginTop: 18,
    textAlign: "center",
    fontSize:14,
  },
  passwordContainer: {
    position: "relative",
  },
  togglePassword: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  togglePasswordText: {
    color: "#007bff",
  },
  errorText: {
    color: "red",
    marginBottom: 15,
  },
  signtext: {
    color: "#007bff",
    cursor: "pointer",
  },
  logo: {
    width: 180, 
    maxWidth:280,
    height:50,
    resizeMode:"contain",
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default Login;
