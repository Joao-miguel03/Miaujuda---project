import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, TextInput, } from 'react-native';
import AppLayout from '../../components/AppLayout';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { listarGatos } from '../../api/gato';

export default function CatListScreen({ navigation }) {
  const [gatos, setGatos] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');

  useEffect(() => {
    async function carregarGatos() {
      try {
        const res = await listarGatos();
        const dados = res.data || res;
        const ordenados = dados.sort((a, b) =>
          a.nome?.localeCompare(b.nome)
        );
        setGatos(ordenados);
      } catch (error) {
        console.error('Erro ao carregar gatos:', error);
      }
    }

    carregarGatos();
  }, []);

  const gatosFiltrados = gatos.filter((g) =>
    g.nome?.toLowerCase().includes(filtroNome.toLowerCase())
  );

  return (
    <AppLayout navigation={navigation}>
      <ScrollView contentContainerStyle={globalStyles.scrollVertical}>
        {/* Campo de busca */}
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar gato pelo nome"
          value={filtroNome}
          onChangeText={setFiltroNome}
          placeholderTextColor={colors.marromClaro}
        />

        {/* Lista de gatos */}
        {gatosFiltrados.map((gato) => (
          <View key={gato.id} style={globalStyles.card}>
            <Image
              source={
                gato.imagem
                  ? { uri: gato.imagem }
                  : require('../../../assets/images/logo.png')
              }
              style={globalStyles.cardImage}
            />
            <Text style={styles.nome}>{gato.nome || 'Nome não informado'}</Text>
            <Text style={styles.local}>
              Encontrado em: {gato.local_encontrado || 'Desconhecido'}
            </Text>
            <Text style={styles.data}>
              {gato.data_encontrado
                ? `Data: ${new Date(gato.data_encontrado).toLocaleDateString()}`
                : 'Data não informada'}
            </Text>

            <View style={styles.footerCard}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DetailsCat', { SuperId: gato.id })
                }
              >
                <Text style={styles.link}>Ver detalhes</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: colors.bege,
    color: colors.marrom,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 14,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.marrom,
    marginBottom: 6,
  },
  local: {
    fontSize: 14,
    color: colors.marrom,
    marginBottom: 4,
  },
  data: {
    fontSize: 13,
    color: colors.marrom,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  footerCard: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  link: {
    color: '#007bff',
    fontSize: 13,
  },
});
