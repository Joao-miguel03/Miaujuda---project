import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button, StyleSheet, Alert } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { colors } from '../../styles/colors';
import { criarUsuario } from '../../api/usuario';
import { ScrollView } from 'react-native-web';
import bcrypt  from 'react-native-bcrypt'

export default function RegisterScreen({ navigation }) {

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async () => {
    if(!nome || !email || !senha) {
      alert("Preencha todos os Campos obrigatórios");
      return;
    }
    try {
      const salt = bcrypt.genSaltSync(10);
      const senhaCriptografada = bcrypt.hashSync(senha, salt);

      const novoUsuario = {
        nome,
        telefone,
        email,
        senha: senhaCriptografada,
        is_cuidador: false,
        imagem_perfil: null,
      };

      await criarUsuario(novoUsuario);
      Alert.alert('Sucesso',"Cadastro Realizado com sucesso!");
      navigation.replace("Login");
      
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possivel cadastrar. Tente novamente')
    }
  };

  return (
    <View style={[globalStyles.containerCenter, { backgroundColor: colors.marrom }]}>
      <Image source={require('../../../assets/images/logo.png')} style={globalStyles.logo} />

      <View style={styles.registerBox}>
        <Text style={styles.title}>CADASTRAR</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Digite seu nome"
          value = {nome}
          onChangeText={setNome}
          placeholderTextColor={colors.cinzaClaro}
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Digite seu telefone"
          value={telefone}
          onChangeText={setTelefone}
          placeholderTextColor={colors.cinzaClaro}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={colors.cinzaClaro}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value = {senha}
          onChangeText={setSenha}
          placeholderTextColor={colors.cinzaClaro}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    
      <Image source={require("../../../assets/images/security_cat.png")} style={globalStyles.security_cat}/>

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