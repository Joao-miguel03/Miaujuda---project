import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { colors } from '../../styles/colors';
import { listarUsuarios } from '../../api/usuario';
import { AuthContext } from '../../context/AuthContext';
import { ScrollView } from 'react-native-web';
import bcrypt from 'react-native-bcrypt'

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () =>{
    try {
      const res = await listarUsuarios();
      const usuarios = res.data || res;
      
      const usuarioEncontrado = usuarios.find((u) => u.email === email);

      if (usuarioEncontrado && bcrypt.compareSync(senha, usuarioEncontrado.senha)) {
        login(usuarioEncontrado);
        navigation.replace('Home');
      } else {
        Alert.alert('Erro','Email ou senha inválidas');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Email ou senha inválidos');
    }
  }

  return (
    <View style={[globalStyles.containerCenter,{backgroundColor: colors.marrom}]}>
      <Image source={require('../../../assets/images/logo.png')} style={globalStyles.logo} />

      <View style={styles.loginBox}>
        <Text style={styles.title}>LOGIN</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput 
          style={globalStyles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#ccc" 
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={globalStyles.input} 
          placeholder="Digite sua senha" 
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          placeholderTextColor={colors.cinzaClaro}
        />

        <TouchableOpacity onPress={()=> navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgot}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Logar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.register}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      <Image source={require("../../../assets/images/security-cat.png")} style={globalStyles.security_cat}/>

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