import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Linking, StyleSheet, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppLayout from '../../components/AppLayout';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { listarNoticias } from '../../api/noticia';

export default function NewsListScreen({ navigation }) {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    async function carregarNoticias() {
      try {
        const res = await listarNoticias();
        const dados = res.data || res;
        const ordenadas = dados.sort(
          (a, b) => new Date(b.criado_em) - new Date(a.criado_em)
        );
        setNoticias(ordenadas);
      } catch (error) {
        console.error('Erro ao carregar notícias:', error);
      }
    }

    carregarNoticias();
  }, []);

  return (
    <AppLayout navigation={navigation}>
      <ScrollView contentContainerStyle={globalStyles.scrollVertical}>
        {/* Botão para adicionar nova notícia */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('RegisterNews')}
        >
          <Ionicons name="add-circle-outline" size={22} color={colors.marrom} />
          <Text style={styles.addButtonText}>Adicionar Notícia</Text>
        </TouchableOpacity>

        {/* Lista de notícias */}
        {noticias.map((noticia) => (
          <View key={noticia.id} style={globalStyles.card}>
            <Image
              source={
                noticia.imagem
                  ? { uri: noticia.imagem }
                  : require('../../../assets/images/newsDefault.jpeg')
              }
              style={globalStyles.cardImage}
            />
            <Text style={styles.titulo}>{noticia.titulo}</Text>
            <Text style={styles.conteudo} numberOfLines={3}>
              {noticia.conteudo}
            </Text>
            <View style={styles.footerCard}>
              <TouchableOpacity onPress={() => Linking.openURL(noticia.link_materia)}>
                <Text style={styles.link}>Ver notícia</Text>
              </TouchableOpacity>
              <Text style={styles.autor}>
                {noticia.autor || 'Autor desconhecido'}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bege,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: colors.marrom,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.marrom,
    marginBottom: 6,
  },
  conteudo: {
    fontSize: 14,
    color: colors.marrom,
    marginBottom: 8,
  },
  footerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    color: '#007bff',
    fontSize: 13,
  },
  autor: {
    color: colors.marrom,
    fontSize: 13,
    fontStyle: 'italic',
  },
});
