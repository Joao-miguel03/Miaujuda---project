import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import AppLayout from '../../components/AppLayout';
import { colors } from '../../styles/colors';
import { buscarNoticiaPorId } from '../../api/noticia';

export default function DetailsNewsScreen({ route, navigation }) {
  const noticiaId = route?.params?.SuperId;
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const noticiaRes = await buscarNoticiaPorId(noticiaId);
        const noticiaEncontrada = Array.isArray(noticiaRes) ? noticiaRes[0] : noticiaRes?.data || noticiaRes;
        setNoticia(noticiaEncontrada);
      } catch (error) {
        console.error('Erro ao buscar notícia:', error);
      }
    }
    carregarDados();
  }, [noticiaId]);

  if (!noticia) {
    return (
      <AppLayout navigation={navigation}>
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 40 }}>
          Notícia não encontrada. Volte e tente novamente.
        </Text>
      </AppLayout>
    );
  }

  return (
    <AppLayout navigation={navigation}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>NOTÍCIA</Text>
        </View>

        {noticia.imagem && (
          <Image source={{ uri: noticia.imagem }} style={styles.imagem} />
        )}

        <View style={styles.card}>
          <Text style={styles.titulo}>{noticia.titulo}</Text>
          <Text style={styles.autor}>por {noticia.autor || 'Desconhecido'} - {new Date(noticia.criado_em).toLocaleDateString()}</Text>
          <Text style={styles.texto}>{noticia.conteudo}</Text>
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
  },
  imagem: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  card: {
    margin: 20,
    backgroundColor: colors.marromEscuro,
    borderRadius: 15,
    padding: 20,
  },
  titulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  autor: {
    fontSize: 12,
    color: colors.cinzaClaro,
    marginBottom: 12,
    textAlign: 'center',
  },
  texto: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'justify',
  },
});
