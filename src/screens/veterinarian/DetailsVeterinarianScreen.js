import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AppLayout from '../../components/AppLayout';
import { colors } from '../../styles/colors';
import { Ionicons } from '@expo/vector-icons';
import { buscarVeterinarioPorId } from '../../api/veterinario';
import { buscarUsuarioPorId } from '../../api/usuario';

export default function DetailsVeterinarianScreen({ route, navigation }) {
  const veterinarioId = route?.params?.SuperId;
  const [veterinario, setVeterinario] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const vetRes = await buscarVeterinarioPorId(veterinarioId);
        const vetData = Array.isArray(vetRes) ? vetRes[0] : (vetRes.data || vetRes);
        setVeterinario(vetData);

        if (vetData?.id_usuario) {
          const usuarioRes = await buscarUsuarioPorId(vetData.id_usuario);
          const userData = Array.isArray(usuarioRes) ? usuarioRes[0] : (usuarioRes.data || usuarioRes);
          setUsuario(userData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do veterinário:', error);
      }
    }

    carregarDados();
  }, [veterinarioId]);

  if (!veterinario) {
    return (
      <AppLayout navigation={navigation}>
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 40 }}>
          Veterinário não encontrado. Volte e tente novamente.
        </Text>
      </AppLayout>
    );
  }

  return (
    <AppLayout navigation={navigation}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Cabeçalho com avatar */}
        <View style={styles.header}>
          <Text style={styles.title}>VETERINÁRIO</Text>
          <Image
            source={
              usuario?.imagem_perfil
                ? { uri: usuario.imagem_perfil }
                : require('../../../assets/images/doctor-cat.png')
            }
            style={styles.foto}
          />
        </View>

        {/* Card com detalhes */}
        <View style={styles.card}>
          <View style={styles.infoBox}>
            <Text style={styles.info}><Text style={styles.bold}>Nome:</Text> {usuario?.nome || 'Sem nome'}</Text>
            <Text style={styles.info}><Text style={styles.bold}>CRMV:</Text> {veterinario.crmv || 'Não informado'}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Especialidades:</Text> {veterinario.especialidades?.join(', ') || 'Não informado'}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Formação:</Text> {veterinario.formacao || 'Não informado'}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Experiência:</Text> {veterinario.experiencia || 'Não informado'}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Descrição:</Text> {veterinario.descricao || 'Sem descrição'}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Contato:</Text> {usuario?.telefone || 'Não informado'}</Text>
            <Text style={styles.info}>
              <Text style={styles.bold}>Localização:</Text> {usuario?.cidade || ''}, {usuario?.estado || ''}{' '}
              <Ionicons name="location-sharp" size={14} color="red" />
            </Text>
          </View>

          <TouchableOpacity style={styles.botao}>
            <Text style={styles.botaoTexto}>ENTRAR EM CONTATO</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.marrom,
    paddingBottom: 40,
  },
  header: {
    backgroundColor: colors.bege,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  foto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  card: {
    margin: 20,
    backgroundColor: '#1E0F06',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  infoBox: {
    alignSelf: 'stretch',
    marginBottom: 15,
  },
  info: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,
  },
  bold: {
    fontWeight: 'bold',
    color: colors.branco,
  },
  botao: {
    backgroundColor: colors.bege,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 32,
    marginTop: 10,
  },
  botaoTexto: {
    color: colors.marrom,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
