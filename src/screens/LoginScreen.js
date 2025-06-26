import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';

export default function LoginScreen({ navigation }) {
  return (
    <View style={[globalStyles.containerCenter,{backgroundColor: colors.marrom}]}>
      <Image source={require('../../assets/images/logo.png')} style={globalStyles.logo} />

      <View style={styles.loginBox}>
        <Text style={styles.title}>LOGIN</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput style={globalStyles.input} placeholder="Digite seu email" placeholderTextColor="#ccc" />

        <Text style={styles.label}>Senha</Text>
        <TextInput style={globalStyles.input} placeholder="Digite sua senha" secureTextEntry placeholderTextColor={colors.cinzaClaro} />

        <TouchableOpacity onPress={()=> navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgot}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Logar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.register}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      <Image source={require("../../assets/images/security_cat.png")} style={globalStyles.security_cat}/>

    </View>
  );
}

const styles = StyleSheet.create({
  loginBox: {
    backgroundColor: colors.marrom,
    borderRadius: 12,
    borderColor: colors.branco,
    borderWidth: 2,
    padding: 20,
    width: '80%',
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.branco,
    marginBottom: 20,
    alignSelf: 'center',
  },
  label: {
    color: colors.branco,
    marginBottom: 5,
    fontSize: 14,
  },
  forgot: {
    color: colors.branco,
    fontSize: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: colors.bege,
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonText: {
    color: colors.marrom,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  register: {
    color: colors.branco,
    fontSize: 13,
    textAlign: 'center',
  },
});