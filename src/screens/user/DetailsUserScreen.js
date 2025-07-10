import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AppLayout from '../../components/AppLayout';
import { colors } from '../../styles/colors';
import { buscarUsuarioPorId } from '../../api/usuario';
import { AuthContext } from '../../context/AuthContext';

export default function DetailsUserScreen({ route, navigation }) {
  const userId  = route?.params?.SuperId;
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

    carregarDados();
  }, [userId]);

  if (!usuario) {
    return (
      <AppLayout>
        <Text style={styles.carregando}>Usuário não encontrado.</Text>
      </AppLayout>
    );
  }

  const podeEditar = usuarioLogado?.is_admin;

  return (
    <AppLayout navigation={navigation}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>DETALHES DO USUÁRIO</Text>
          <Image
            source={usuario.imagem_perfil ? { uri: usuario.imagem_perfil } : require('../../../assets/images/defaultprofile.jpeg')}
            style={styles.fotoUsuario}
          />
        </View>

        <View style={styles.card}>
          <View style={styles.infoBox}>
            <Text style={styles.info}><Text style={styles.bold}>Nome:</Text> {usuario.nome || 'Não informado'}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Telefone:</Text> {usuario.telefone || 'Não informado'}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Email:</Text> {usuario.email || 'Não informado'}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Região:</Text> {usuario.regiao || 'Não informado'}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Tipo:</Text> {usuario.is_cuidador ? 'Lar Temporário' : 'Usuário'}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Admin:</Text> {usuario.is_admin ? 'Sim' : 'Não'}</Text>
          </View>

          {podeEditar && (
            <TouchableOpacity
              style={styles.botao}
              onPress={() => navigation.navigate('EditUserScreen', { userId: usuario.id })}
            >
              <Text style={styles.botaoTexto}>EDITAR USUÁRIO</Text>
            </TouchableOpacity>
          )}
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
  carregando: {
    color: colors.branco,
    textAlign: 'center',
    marginTop: 40,
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
  fotoUsuario: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
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
    marginBottom: 4,
  },
  bold: {
    color: colors.branco,
    fontWeight: 'bold',
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
