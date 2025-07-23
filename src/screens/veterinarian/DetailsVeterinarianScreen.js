import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AppLayout from '../../components/AppLayout';
import { colors } from '../../styles/colors';
import { Ionicons } from '@expo/vector-icons';
import { buscarVeterinarioPorId, atualizarAvaliacaoVeterinario } from '../../api/veterinario';
import { AuthContext } from '../../context/AuthContext';

export default function DetailsVeterinarianScreen({ route, navigation }) {
  const veterinarioId = route?.params?.SuperId;
  const [veterinario, setVeterinario] = useState(null);
  const [avaliacao, setAvaliacao] = useState(0);
  const [mostrarAvaliacao, setMostrarAvaliacao] = useState(false);
  const { usuario: usuarioLogado } = useContext(AuthContext);

  useEffect(() => {
    async function carregarDados() {
      try {
        const vetRes = await buscarVeterinarioPorId(veterinarioId);
        const vetData = Array.isArray(vetRes) ? vetRes[0] : (vetRes.data || vetRes);
        setVeterinario(vetData);
      } catch (error) {
        console.error('Erro ao carregar dados do veterinário:', error);
      }
    }
    carregarDados();
  }, [veterinarioId]);

  const handleConfirmarAvaliacao = async () => {
    try {
      const novoSomatorio = (veterinario.somatorio_avaliacao || 0) + avaliacao;
      const novoNumeroAvaliacoes = (veterinario.numero_avaliacoes || 0) + 1;
      const novaMedia = novoSomatorio / novoNumeroAvaliacoes;

      await atualizarAvaliacaoVeterinario(veterinarioId, {
        somatorio_avaliacao: novoSomatorio,
        numero_avaliacoes: novoNumeroAvaliacoes,
        avaliacao_media: novaMedia.toFixed(2),
      });

      setVeterinario({
        ...veterinario,
        somatorio_avaliacao: novoSomatorio,
        numero_avaliacoes: novoNumeroAvaliacoes,
        avaliacao_media: parseFloat(novaMedia.toFixed(2)),
      });

      setMostrarAvaliacao(false);
      Alert.alert('Obrigado!', 'Sua avaliação foi registrada com sucesso.');
    } catch (error) {
      console.error('Erro ao registrar avaliação:', error);
      Alert.alert('Erro', 'Não foi possível registrar sua avaliação.');
    }
  };

  if (!veterinario) {
    return (
      <AppLayout navigation={navigation}>
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 40 }}>
          Veterinário não encontrado.
        </Text>
      </AppLayout>
    );
  }

  const avaliacaoMedia = Math.round(veterinario.avaliacao_media || 0);
  const estrelas = '★'.repeat(avaliacaoMedia) + '☆'.repeat(10 - avaliacaoMedia);

  const aumentar = () => setAvaliacao(Math.min(avaliacao + 1, 10));
  const diminuir = () => setAvaliacao(Math.max(avaliacao - 1, 0));

  return (
    <AppLayout navigation={navigation}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>DETALHES DO VETERINÁRIO</Text>

        <View style={styles.headerBox}>
          <Image
            source={
              veterinario.usuario?.imagem_perfil
                ? { uri: veterinario.usuario.imagem_perfil }
                : require('../../../assets/images/doctor-cat.png')
            }
            style={styles.fotoUsuario}
          />
          <Text style={styles.nomeUsuario}>{veterinario.usuario?.nome || 'Sem nome'}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.info}><Text style={styles.bold}>Avaliação:</Text> {estrelas} ({veterinario.avaliacao_media?.toFixed(1) || '0.0'})</Text>
          <Text style={styles.info}><Text style={styles.bold}>CRMV:</Text> {veterinario.crmv || 'Não informado'}</Text>
          <Text style={styles.info}><Text style={styles.bold}>Especialidades:</Text> {veterinario.especialidades?.join(', ') || 'Não informado'}</Text>
          <Text style={styles.info}><Text style={styles.bold}>Formação:</Text> {veterinario.formacao || 'Não informado'}</Text>
          <Text style={styles.info}><Text style={styles.bold}>Experiência:</Text> {veterinario.experiencia_anos || 0} anos</Text>
          <Text style={styles.info}><Text style={styles.bold}>Descrição:</Text> {veterinario.descricao || 'Sem descrição'}</Text>
          <Text style={styles.info}><Text style={styles.bold}>Telefone:</Text> {veterinario.usuario?.telefone || 'Não informado'}</Text>
          <Text style={styles.info}><Text style={styles.bold}>Email:</Text> {veterinario.usuario?.email || 'Não informado'}</Text>
          <Text style={styles.info}><Text style={styles.bold}>Localização:</Text> {veterinario.endereco || ''} <Ionicons name="location-sharp" size={14} color="red" /></Text>
        </View>

        <TouchableOpacity style={styles.botao} onPress={() => setMostrarAvaliacao(!mostrarAvaliacao)}>
          <Text style={styles.botaoTexto}>{mostrarAvaliacao ? 'CANCELAR' : 'AVALIAR'}</Text>
        </TouchableOpacity>

        {mostrarAvaliacao && (
          <View style={styles.avaliacaoBox}>
            <Text style={styles.avaliacaoTexto}>Nota: {avaliacao}</Text>
            <View style={styles.controleEstrelas}>
              <TouchableOpacity onPress={diminuir} style={styles.ajuste}>
                <Text style={styles.ajusteTexto}>-</Text>
              </TouchableOpacity>
              <Text style={styles.estrelasSelecionadas}>{'★'.repeat(avaliacao) + '☆'.repeat(10 - avaliacao)}</Text>
              <TouchableOpacity onPress={aumentar} style={styles.ajuste}>
                <Text style={styles.ajusteTexto}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.botaoConfirmar} onPress={handleConfirmarAvaliacao}>
              <Text style={styles.botaoTexto}>CONFIRMAR AVALIAÇÃO</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.marrom,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  title: {
    color: colors.branco,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  headerBox: {
    backgroundColor: colors.bege,
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  fotoUsuario: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.marrom,
    marginBottom: 12,
  },
  nomeUsuario: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.marrom,
  },
  card: {
    backgroundColor: '#1E0F06',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  info: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 8,
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
    color: colors.bege,
  },
  botao: {
    backgroundColor: colors.bege,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 32,
    alignSelf: 'center',
    marginBottom: 10,
  },
  botaoTexto: {
    color: colors.marrom,
    fontWeight: 'bold',
    fontSize: 16,
  },
  avaliacaoBox: {
    backgroundColor: '#1E0F06',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  avaliacaoTexto: {
    color: colors.branco,
    fontSize: 16,
    marginBottom: 10,
  },
  controleEstrelas: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  ajuste: {
    backgroundColor: colors.bege,
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  ajusteTexto: {
    color: colors.marrom,
    fontWeight: 'bold',
    fontSize: 20,
  },
  estrelasSelecionadas: {
    color: colors.bege,
    fontSize: 20,
    fontWeight: 'bold',
  },
  botaoConfirmar: {
    backgroundColor: colors.bege,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
});