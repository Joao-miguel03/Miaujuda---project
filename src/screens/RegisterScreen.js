import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';

export default function RegisterScreen({ navigation }) {
  return (
    <View style={[globalStyles.containerCenter, { backgroundColor: colors.marrom }]}>
      <Image source={require('../../assets/images/logo.png')} style={globalStyles.logo} />

      <View style={styles.registerBox}>
        <Text style={styles.title}>CADASTRAR</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Digite seu nome"
          placeholderTextColor={colors.cinzaClaro}
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Digite seu telefone"
          placeholderTextColor={colors.cinzaClaro}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Digite seu email"
          placeholderTextColor={colors.cinzaClaro}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          placeholderTextColor={colors.cinzaClaro}
        />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    
      <Image source={require("../../assets/images/security_cat.png")} style={globalStyles.security_cat}/>

    </View>
  );
}

const styles = StyleSheet.create({
  registerBox: {
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
  button: {
    backgroundColor: colors.bege,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 15,
  },
  buttonText: {
    color: colors.marrom,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});