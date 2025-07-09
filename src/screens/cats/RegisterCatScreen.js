import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Image, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AppLayout from '../../components/AppLayout';
import { globalStyles } from '../../styles/globalStyles';
import { colors } from '../../styles/colors';
import { AuthContext } from '../../context/AuthContext';
import { criarGato } from '../../api/gato';

export default function RegisterCatScreen({ navigation }) {
  const { usuario } = useContext(AuthContext);

  const [nome, setNome] = useState('');
  const [localEncontrado, setLocalEncontrado] = useState('');
  const [dataEncontrado, setDataEncontrado] = useState('');
  const [imagem, setImagem] = useState(null);

  const escolherImagem = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissao.granted) {
        Alert.alert('Permissão necessária', 'Permita acesso à galeria.');
        return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, base64: true,
        quality: 0.5,
    });

    if (!resultado.canceled && resultado.assets && resultado.assets[0].base64) {
        const base64Img = `data:image/jpeg;base64,${resultado.assets[0].base64}`;
        setImagem(base64Img);
    } else {
        Alert.alert('Erro', 'Não foi possível carregar a imagem.');
    }
  };

  const handleCadastrar = async () => {
    if (!usuario || !usuario.id) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    if (!nome || !localEncontrado || !dataEncontrado || !imagem) {
      Alert.alert('Erro', 'Preencha todos os campos e escolha uma imagem.');
      return;
    }

    const novoGato = {
      nome,
      local_encontrado: localEncontrado,
      data_encontrado: dataEncontrado,
      imagem,
      id_usuario_encontrou: usuario.id,
    };

    try {
      await criarGato(novoGato);
      Alert.alert('Sucesso', 'Gato cadastrado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao cadastrar gato:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o gato.');
    }
  };

  return (
    <AppLayout navigation={navigation}>
      <ScrollView contentContainerStyle={globalStyles.scrollVertical}>
        <View style={styles.registerBox}>
          <Text style={styles.title}>CADASTRAR GATO</Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Nome do gato"
            value={nome}
            onChangeText={setNome}
            placeholderTextColor={colors.cinzaClaro}
          />

          <Text style={styles.label}>Local Encontrado</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Ex: Parque Central"
            value={localEncontrado}
            onChangeText={setLocalEncontrado}
            placeholderTextColor={colors.cinzaClaro}
          />

          <Text style={styles.label}>Data Encontrado</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="YYYY-MM-DD"
            value={dataEncontrado}
            onChangeText={setDataEncontrado}
            placeholderTextColor={colors.cinzaClaro}
          />

          <Text style={styles.label}>Imagem</Text>
          <TouchableOpacity style={styles.imageButton} onPress={escolherImagem}>
            <Text style={styles.imageButtonText}>Escolher Imagem</Text>
          </TouchableOpacity>
          {imagem && (
            <Image source={{ uri: imagem }} style={{ width: 100, height: 100, marginTop: 10, borderRadius: 8 }} />
          )}

          <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        <Image source={require("../../../assets/images/doctor-cat.png")} style={globalStyles.doctor_cat} />
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  registerBox: {
    backgroundColor: colors.marrom,
    borderRadius: 12,
    borderColor: colors.branco,
    borderWidth: 2,
    padding: 20,
    width: '100%',
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
  imageButton: {
    backgroundColor: colors.bege,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 5,
  },
  imageButtonText: {
    textAlign: 'center',
    color: colors.marrom,
    fontWeight: 'bold',
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
