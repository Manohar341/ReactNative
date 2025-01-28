import axios from 'axios';
import config from './environment';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const axiosInstance = axios.create({
  baseURL: `${config.baseUrl}${config.apiServer}`,
});

const useJWT = async (config) => {
  try {
    const jwt = await AsyncStorage.getItem('token');
    if (jwt) {
      config.headers['Authorization'] = 'Bearer ' + jwt;
    }
  } catch (error) {
    console.error('Error fetching token from AsyncStorage:', error);
  }
  return config;
};

axiosInstance.interceptors.request.use(useJWT);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const navigation = useNavigation();

    if (error?.code === 'ERR_NETWORK') {
      Alert.alert(
        'Network Error',
        'There is an issue with your network. Please try again later.',
        [{ text: 'OK', onPress: () => navigation.navigate('NetworkError') }]
      );
      return null;
    }

    if (error?.response && error?.response?.status === 401) {
      try {
        await AsyncStorage.removeItem('token'); // Clear token if unauthorized
      } catch (storageError) {
        console.error('Error removing token from AsyncStorage:', storageError);
      }
      navigation.navigate('Login');
      return null;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
