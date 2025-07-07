import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/user/LoginScreen';
import RegisterScreen from '../screens/user/RegisterScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import NewsListScreen from '../screens/news/NewsListScreen';
import RegisterNewsScreen from '../screens/news/RegisterNewsScreen';
import RegisterVeterinarianScreen from '../screens/veterinarian/RegisterVeterinarianScreen';
import CadastrarConsultaScreen from '../screens/consulta/CadastrarConsultaScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="NewsList" component={NewsListScreen} />
      <Stack.Screen name="RegisterNews" component={RegisterNewsScreen} />
      <Stack.Screen name = "Profile" component={ProfileScreen} />
      <Stack.Screen name = "RegisterVeterinarian" component={RegisterVeterinarianScreen} />
      <Stack.Screen name='MarcarConsulta' component={CadastrarConsultaScreen} />
    </Stack.Navigator>
  );
}
