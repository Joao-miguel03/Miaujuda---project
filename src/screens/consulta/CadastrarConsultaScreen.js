import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Image } from 'react-native';
import AppLayout from '../../components/AppLayout';
import { globalStyles } from '../../styles/globalStyles';
import { colors } from '../../styles/colors';
import { AuthContext } from '../../context/AuthContext';
import { criarConsulta } from '../../api/consulta'; 
import { buscarVeterinarioPorUsuario } from '../../api/veterinario';

export default function CadastrarConsultaScreen({ navigation }) {
  const { usuario } = useContext(AuthContext);
  const [veterinario, setVeterinario] = useState('');
  const [data, setData] = useState('');
  const [tipo, setTipo] = useState('');
  const [procedimento, setProcedimento] = useState('');
  const [valor, setValor] = useState('');
  const [nomeClienteGato, setNomeClienteGato] = useState('');
  const [emailCliente, setEmailCliente] = useState('');

  useEffect(()=>{
    async function carregarVeterinario() {
        if (usuario?.id) {
            const res = await buscarVeterinarioPorUsuario(usuario.id);
            if (res && res.length) {
                setVeterinario(res[0]);
            }
        }
    }
    carregarVeterinario();

  }, [usuario]);

  const handleCadastrarConsulta = async () => {
    if (!usuario || !usuario.id || !veterinario || !veterinario.id) {
      Alert.alert('Erro', 'Usuário ou veterinário não autenticado.');
      return;
    }

    if (!data || !nomeClienteGato || !emailCliente) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const consulta = {
        data,
        tipo,
        procedimento,
        valor: parseFloat(valor),
        nome_cliente_gato: nomeClienteGato,
        id_profissional: veterinario.id,
        email_cliente: emailCliente
      };

      await criarConsulta(consulta);
      Alert.alert('Sucesso', 'Consulta cadastrada com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao cadastrar consulta:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar.');
    }
  };

  return (
    <AppLayout navigation={navigation}>
      <ScrollView contentContainerStyle={globalStyles.scrollVertical}>
        <View style={styles.registerBox}>
          <Text style={styles.title}>Cadastrar Consulta</Text>

          <Text style={styles.label}>Data</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="AAAA-MM-DD HH:mm"
            value={data}
            onChangeText={setData}
            placeholderTextColor={colors.cinzaClaro}
          />

          <Text style={styles.label}>Tipo</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Ex: Emergência, Rotina"
            value={tipo}
            onChangeText={setTipo}
            placeholderTextColor={colors.cinzaClaro}
          />

          <Text style={styles.label}>Procedimento</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Ex: Vacinação, Exame"
            value={procedimento}
            onChangeText={setProcedimento}
            placeholderTextColor={colors.cinzaClaro}
          />

          <Text style={styles.label}>Valor (R$)</Text>
          <TextInput
            style={globalStyles.input}
            keyboardType="decimal-pad"
            placeholder="Ex: 120.00"
            value={valor}
            onChangeText={setValor}
            placeholderTextColor={colors.cinzaClaro}
          />

          <Text style={styles.label}>Nome do Cliente ou Gato</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Digite o nome"
            value={nomeClienteGato}
            onChangeText={setNomeClienteGato}
            placeholderTextColor={colors.cinzaClaro}
          />

          <Text style={styles.label}>Email do Cliente</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="exemplo@email.com"
            value={emailCliente}
            onChangeText={setEmailCliente}
            placeholderTextColor={colors.cinzaClaro}
          />

          <TouchableOpacity style={styles.button} onPress={handleCadastrarConsulta}>
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
