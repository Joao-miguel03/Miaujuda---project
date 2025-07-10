import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AppLayout from '../../components/AppLayout';
import { colors } from '../../styles/colors';
import { buscarUsuarioPorId } from '../../api/usuario';
import { buscarGatoPorId } from '../../api/gato';

export default function DetailsCatScreen({ route, navigation }) {
  const  gatoId  = route?.params?.SuperId;
  const [gato, setGato] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    console.log("Id Recebido: ", gatoId);

    async function carregarDados() {
      try {
        const gatoRes = await buscarGatoPorId(gatoId);
        const listaGatos = gatoRes.data || gatoRes;

        const gatoEncontrado = Array.isArray(listaGatos) ? listaGatos[0] : listaGatos;
        setGato(gatoEncontrado);

        if (gatoEncontrado?.id_usuario_encontrou) {
          const usuarioRes = await buscarUsuarioPorId(gatoEncontrado.id_usuario_encontrou);
          const usuarioEncontrado = usuarioRes.data || usuarioRes;
          setUsuario(Array.isArray(usuarioEncontrado) ? usuarioEncontrado[0] : usuarioEncontrado);
        }
      } catch (error) {
        console.error('Erro ao buscar gato:', error);
      }
    }

    carregarDados();
  }, [gatoId]);


  if (!gato) {
    return (
    <AppLayout>
      <Text style={{ color: '#fff', textAlign: 'center', marginTop: 40 }}>
        Gato não encontrado. Volte e tente novamente.
      </Text>
    </AppLayout>
    );
  }

  return (
    <AppLayout navigation={navigation}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>LAR / ADOTAR</Text>
          <Image
            source={
              gato.imagem
                ? { uri: gato.imagem }
                :
                 require('../../../assets/images/logo.png')
            }
            style={{ width: 100, height: 100, marginTop: 10, borderRadius: 8 }}
          />
        </View>

        <View style={styles.card}>
          <View style={styles.infoBox}>
            <Text style={styles.info}><Text style={styles.bold}>Nome:</Text> {gato.nome}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Usuário:</Text> {usuario?.nome || 'Desconhecido'}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Contato:</Text> {usuario?.telefone || 'Não informado'}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Local encontrado:</Text> {gato.local_encontrado}</Text>
            <Text style={styles.info}>
            <Text style={styles.bold}>Encontrado em:</Text>{' '}
            {gato.data_encontrado
              ? new Date(gato.data_encontrado).toLocaleDateString()
              : 'Data não informada'}
            </Text>

          </View>

          <TouchableOpacity style={styles.botao}>
            <Text style={styles.botaoTexto}>AJUDAR</Text>
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
  fotoGato: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
  ilustracao: {
    width: '90%',
    height: 150,
    marginVertical: 12,
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
