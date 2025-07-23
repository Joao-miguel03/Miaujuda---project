import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import AppLayout from '../../components/AppLayout';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import * as ImagePicker from 'expo-image-picker';
import { atualizarUsuario } from '../../api/usuario'; // você deve ter esse método ou algo semelhante

export default function EditProfileScreen({ navigation }) {
  const { usuario, setUsuario } = useContext(AuthContext);

  const [nome, setNome] = useState(usuario?.nome || '');
  const [email, setEmail] = useState(usuario?.email || '');
  const [telefone, setTelefone] = useState(usuario?.telefone || '');
  const [senha, setSenha] = useState(''); // por segurança, deixar vazio
  const [imagem, setImagem] = useState(usuario?.imagem_perfil || null);

  const escolherImagem = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissao.granted) {
      Alert.alert('Permissão negada', 'É necessário permitir acesso à galeria.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.5,
    });

    if (!resultado.canceled && resultado.assets && resultado.assets[0].base64) {
      const base64Img = `data:image/jpeg;base64,${resultado.assets[0].base64}`;
      setImagem(base64Img);
    }
  };

  const salvarAlteracoes = async () => {
    if (!nome || !email || !telefone) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    try {
      const dadosAtualizados = {
        nome,
        email,
        telefone,
        imagem_perfil: imagem,
      };

      await atualizarUsuario(usuario.id ,dadosAtualizados);
      Alert.alert('Sucesso', 'Perfil atualizado!');
      setUsuario(dadosAtualizados);
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      Alert.alert('Erro ao atualizar perfil');
    }
  };

  return (
    <AppLayout navigation={navigation}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.voltar}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
          <TouchableOpacity onPress={salvarAlteracoes}>
            <Text style={styles.salvar}>SAVE</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fotoBox}>
          <Image
            source={imagem ? { uri: imagem } : require('../../../assets/images/defaultprofile.jpeg')}
            style={styles.avatar}
          />
          <TouchableOpacity onPress={escolherImagem} style={styles.editFotoBtn}>
            <Image source={require('../../../assets/images/icon_camera.png')} style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>nome</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} />

          <Text style={styles.label}>email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} editable={false} />

          <Text style={styles.label}>telefone</Text>
          <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} />
        </View>
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.marromClaro,
    paddingBottom: 30,
  },
  header: {
    backgroundColor: colors.marrom,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  voltar: {
    color: colors.branco,
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.branco,
  },
  salvar: {
    color: colors.branco,
    fontSize: 14,
    fontWeight: 'bold',
  },
  fotoBox: {
    alignItems: 'center',
    backgroundColor: colors.marrom,
    paddingVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editFotoBtn: {
    position: 'absolute',
    bottom: 18,
    right: '38%',
  },
  cameraIcon: {
    width: 28,
    height: 28,
  },
  form: {
    paddingHorizontal: 16,
    backgroundColor: colors.marromClaro,
    borderRadius:20,
    paddingTop: 20,
  },
  label: {
    color: colors.marromEscuro,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 6,
    color: '#000',
  },
});