import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Platform, Linking } from 'react-native';
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
        <Text style={styles.carregando}>Notícia não encontrada. Volte e tente novamente.</Text>
      </AppLayout>
    );
  }

  return (
    <AppLayout navigation={navigation}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>DETALHES DA NOTÍCIA</Text>

        <View style={styles.headerBox}>
          {noticia.imagem && (
            <Image source={{ uri: noticia.imagem }} style={styles.imagem} />
          )}
          <Text style={styles.titulo}>{noticia.titulo}</Text>
          <Text style={styles.autor}>
            por {noticia.autor || 'Desconhecido'} - {new Date(noticia.criado_em).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.texto}>{noticia.conteudo}</Text>
        </View>

        <View style={styles.footerCard}>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => {
              if (Platform.OS === 'web') {
                Linking.openURL(noticia.link_materia);
              } else {
                navigation.navigate('NewsWebView', { url: noticia.link_materia });
              }
            }}
          >
            <Text style={styles.botaoTexto}>VISUALIZAR NA ÍNTEGRA</Text>
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
  imagem: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.marrom,
    marginBottom: 6,
    textAlign: 'center',
  },
  autor: {
    fontSize: 12,
    color: colors.marrom,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.marromEscuro,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  texto: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'justify',
    lineHeight: 22,
  },
  footerCard: {
    alignItems: 'center',
    marginBottom: 30,
  },
  botao: {
    backgroundColor: colors.bege,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  botaoTexto: {
    color: colors.marrom,
    fontWeight: 'bold',
    fontSize: 16,
  },
});