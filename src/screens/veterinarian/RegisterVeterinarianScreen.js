import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import AppLayout from '../../components/AppLayout';
import { globalStyles } from '../../styles/globalStyles';
import { colors } from '../../styles/colors';
import { AuthContext } from '../../context/AuthContext';
import { criarVeterinario } from '../../api/veterinario';

export default function RegisterVeterinarianScreen({ navigation }) {
  const { usuario } = useContext(AuthContext); 
  const [especialidades, setEspecialidades] = useState('');
  const [formacao, setFormacao] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [descricao, setDescricao] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [disponibilidade, setDisponibilidade] = useState('');

  const handleCadastrar = async () => {
    if (!usuario || !usuario.id) {
      Alert.alert('Erro', 'Usuário não está autenticado.');
      return;
    }

    const novoVet = {
      id_usuario: usuario.id,
      especialidades: especialidades.split(',').map(e => e.trim()),
      formacao,
      experiencia_anos: parseInt(experiencia),
      descricao,
      endereco,
      cidade,
      estado,
      disponibilidade,
    };

    try {
      await criarVeterinario(novoVet);
      Alert.alert('Sucesso', 'Veterinário cadastrado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao cadastrar veterinário:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar. Tente novamente.');
    }
  };

  return (
    <AppLayout navigation={navigation}>
      <ScrollView contentContainerStyle={globalStyles.scrollVertical}>
        <View style={styles.registerBox}>
          <Text style={styles.title}>CADASTRAR VETERINÁRIO</Text>

          <Text style={styles.label}>Especialidades (separe por vírgulas)</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Ex: Gatos, Cirurgia, Emergência"
            value={especialidades}
            onChangeText={setEspecialidades}
            placeholderTextColor={colors.cinzaClaro}
          />

          <Text style={styles.label}>Formação</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Ex: Medicina Veterinária - UFPE"
            value={formacao}
            onChangeText={setFormacao}
            placeholderTextColor={colors.cinzaClaro}
          />

          <Text style={styles.label}>Anos de Experiência</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Ex: 5"
            value={experiencia}
            onChangeText={setExperiencia}
            keyboardType="numeric"
            placeholderTextColor={colors.cinzaClaro}
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[globalStyles.input, styles.multilineInput]}
            placeholder="Fale um pouco sobre seu trabalho"
            value={descricao}
            onChangeText={setDescricao}
            multiline
            numberOfLines={4}
            placeholderTextColor={colors.cinzaClaro}
          />

          <Text style={styles.label}>Endereço</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Rua, número, bairro"
            value={endereco}
            onChangeText={setEndereco}
            placeholderTextColor={colors.cinzaClaro}
          />

          <Text style={styles.label}>Cidade</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Ex: Recife"
            value={cidade}
            onChangeText={setCidade}
            placeholderTextColor={colors.cinzaClaro}
          />

          <Text style={styles.label}>Estado</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Ex: PE"
            value={estado}
            onChangeText={setEstado}
            placeholderTextColor={colors.cinzaClaro}
          />

          <Text style={styles.label}>Disponibilidade</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Ex: Segunda a Sexta, 9h às 17h"
            value={disponibilidade}
            onChangeText={setDisponibilidade}
            placeholderTextColor={colors.cinzaClaro}
          />

          <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
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
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
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