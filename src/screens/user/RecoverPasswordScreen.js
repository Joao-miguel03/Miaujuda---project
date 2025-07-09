import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { colors } from '../../styles/colors';
import { listarUsuarios, atualizarUsuario } from '../../api/usuario';
import bcrypt from 'react-native-bcrypt';

export default function RecoverPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [senhaAntiga, setSenhaAntiga] = useState('');
  const [mostrarSenhaAntiga, setMostrarSenhaAntiga] = useState(false);

  const handleRecuperarSenha = async () => {
    if (!email || !novaSenha) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const res = await listarUsuarios();
      const usuarios = res.data || res;
      const usuario = usuarios.find(u => u.email === email);

      if (!usuario) {
        Alert.alert('Erro', 'Usuário não encontrado.');
        return;
      }

      const ehAdmin = usuario.is_admin == true;

      if (ehAdmin && !senhaAntiga) {
        setMostrarSenhaAntiga(true);
        Alert.alert('Administrador detectado', 'Digite a senha antiga para alterar.');
        return;
      }

      if (ehAdmin && !bcrypt.compareSync(senhaAntiga, usuario.senha)) {
        Alert.alert('Erro', 'Senha antiga incorreta.');
        return;
      }

      const senhaCriptografada = bcrypt.hashSync(novaSenha, 10);

      await atualizarUsuario(usuario.id, { senha: senhaCriptografada });

      Alert.alert('Sucesso', 'Senha atualizada com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar senha:', error);
      Alert.alert('Erro', 'Não foi possível alterar a senha.');
    }
  };

  return (
    <View style={[globalStyles.containerCenter, { backgroundColor: colors.marrom }]}>
      <Image source={require('../../../assets/images/logo.png')} style={globalStyles.logo} />

      <View style={styles.card}>
        <Text style={styles.title}>Recuperar Senha</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Nova Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Nova senha"
          secureTextEntry
          value={novaSenha}
          onChangeText={setNovaSenha}
          placeholderTextColor="#aaa"
        />

        {mostrarSenhaAntiga && (
          <>
            <Text style={styles.label}>Senha Antiga</Text>
            <TextInput
              style={styles.input}
              placeholder="Senha antiga"
              secureTextEntry
              value={senhaAntiga}
              onChangeText={setSenhaAntiga}
              placeholderTextColor="#aaa"
            />
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={handleRecuperarSenha}>
          <Text style={styles.buttonText}>Alterar Senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.back} onPress={()=>navigation.goBack()}>
        <Text style={styles.textBack}> Voltar </Text>
        </TouchableOpacity>

      </View>

      <Image source={require('../../../assets/images/security-cat.png')} style={globalStyles.security_cat} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '80%',
    backgroundColor: colors.marrom,
    borderColor: colors.branco,
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: colors.branco,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    color: colors.branco,
    marginLeft: 10,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 5,
  },
  button: {
    backgroundColor: colors.bege,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: colors.marrom,
    fontWeight: 'bold',
  },
  back:{
    marginTop: 10,
    paddingVertical: 10,
    color: colors.branco,
    fontSize: 13,
    textAlign: 'center',
  },
    textBack:{
    color: colors.branco,
    fontSize: 13,
    textAlign: 'center',
  },
});
