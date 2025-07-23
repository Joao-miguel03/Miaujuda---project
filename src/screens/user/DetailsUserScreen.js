import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AppLayout from '../../components/AppLayout';
import { colors } from '../../styles/colors';
import { buscarUsuarioPorId } from '../../api/usuario';
import { AuthContext } from '../../context/AuthContext';

export default function DetailsUserScreen({ route, navigation }) {
  const userId = route?.params?.userId || route?.params?.SuperId;
  const { usuario: usuarioLogado } = useContext(AuthContext);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const resposta = await buscarUsuarioPorId(userId);
        const userEncontrado = resposta.data || resposta;
        setUsuario(Array.isArray(userEncontrado) ? userEncontrado[0] : userEncontrado);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    }

    if (userId) {
      carregarDados();
    }
  }, [userId]);

  if (!usuario) {
    return (
      <AppLayout>
        <Text style={styles.carregando}>Usuário não encontrado.</Text>
      </AppLayout>
    );
  }

  const podeEditar = usuarioLogado?.is_admin && usuario.email != "admin@miau.com";

  return (
    <AppLayout navigation={navigation}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Título */}
        <Text style={styles.title}>DETALHES DO USUÁRIO</Text>

        {/* Box com imagem e nome */}
        <View style={styles.headerBox}>
          <Image
            source={
              usuario.imagem_perfil
                ? { uri: usuario.imagem_perfil }
                : require('../../../assets/images/defaultprofile.jpeg')
            }
            style={styles.fotoUsuario}
          />
          <Text style={styles.nomeUsuario}>{usuario.nome || 'Sem nome'}</Text>

          {podeEditar && (
            <TouchableOpacity
              style={styles.botao}
              onPress={() => navigation.navigate('EditUserScreen', { userId: usuario.id })}
            >
              <Text style={styles.botaoTexto}>EDITAR USUÁRIO</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Informações */}
        <View style={styles.card}>
          <Text style={styles.info}><Text style={styles.bold}>Telefone:</Text> {usuario.telefone || 'Não informado'}</Text>
          <Text style={styles.info}><Text style={styles.bold}>Email:</Text> {usuario.email || 'Não informado'}</Text>
          <Text style={styles.info}><Text style={styles.bold}>Região:</Text> {usuario.regiao || 'Não informada'}</Text>
          <Text style={styles.info}><Text style={styles.bold}>Tipo:</Text> {usuario.is_cuidador ? 'Lar Temporário' : 'Usuário'}</Text>
          <Text style={styles.info}><Text style={styles.bold}>Admin:</Text> {usuario.is_admin ? 'Sim' : 'Não'}</Text>
        </View>
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
  carregando: {
    color: colors.branco,
    textAlign: 'center',
    marginTop: 40,
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
    paddingHorizontal: 10,
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
    marginBottom: 10,
  },
  botao: {
    backgroundColor: colors.marrom,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 32,
    marginTop: 10,
  },
  botaoTexto: {
    color: colors.branco,
    fontWeight: 'bold',
    fontSize: 16,
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
});