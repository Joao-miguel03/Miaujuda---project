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
import RecoverPasswordScreen from '../screens/user/RecoverPasswordScreen';
import RegisterCatScreen from '../screens/cats/RegisterCatScreen';
import AgendaConsultasScreen from '../screens/consulta/AgendaConsultasScreen'
import DetailsCatScreen from '../screens/cats/DetailsCatScreen';
import DetailsUserScreen from '../screens/user/DetailsUserScreen';
import DetailsVeterinarianScreen from '../screens/veterinarian/DetailsVeterinarianScreen';
import DetailsNewsScreen from '../screens/news/DetailsNewsScreen';
import EditProfileScreen from '../screens/user/EditProfileScreen';
import UserListScreen from '../screens/user/UserListScreen';
import CatListScreen from '../screens/cats/CatListScreen';
import NewsWebViewScreen from '../screens/news/NewsWebViewScreen';
import AdminMenuScreen from '../screens/AdminMenuScreen';
import VeterinarioListScreen from '../screens/veterinarian/VeterinarianList';
import DetailsConsultaScreen from '../screens/consulta/DetailsConsulta';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="RecoverPassword" component={RecoverPasswordScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name='AdminMenu' component={AdminMenuScreen} />

      <Stack.Screen name="NewsList" component={NewsListScreen} />
      <Stack.Screen name='DetailsNews' component={DetailsNewsScreen} />
      <Stack.Screen name="RegisterNews" component={RegisterNewsScreen} />
      <Stack.Screen name="NewsWebView" component={NewsWebViewScreen}
      options={{title: "Notícia"}} />

      <Stack.Screen name = "Profile" component={ProfileScreen} />

      <Stack.Screen name = "RegisterVeterinarian" component={RegisterVeterinarianScreen} />
      <Stack.Screen name='DetailsVeterinarian' component={DetailsVeterinarianScreen} />
      <Stack.Screen name='VeterinarianList' component={VeterinarioListScreen} />
      <Stack.Screen name='MarcarConsulta' component={CadastrarConsultaScreen} />
      <Stack.Screen name='AgendaConsultas' component={AgendaConsultasScreen} />
      <Stack.Screen name='DetailsConsulta' component={DetailsConsultaScreen} />

      <Stack.Screen name='RegisterCat' component={RegisterCatScreen} />
      <Stack.Screen name='DetailsCat' component={DetailsCatScreen} />
      <Stack.Screen name='CatList' component={CatListScreen} />

      <Stack.Screen name='DetailsUser' component={DetailsUserScreen} />
      <Stack.Screen name='EditProfile' component={EditProfileScreen} />
      <Stack.Screen name='UserList' component={UserListScreen} />
      <Stack.Screen name='ListCuidador' component={UserListScreen} />



    </Stack.Navigator>
  );
}
