import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import AppLayout from '../components/AppLayout';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { listarVeterinarios } from '../api/veterinario';
import { listarGatos } from '../api/gato';
import { listarUsuarios } from '../api/usuario';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [veterinarios, setVeterinarios] = useState([]);
  const [gatos, setGatos] = useState([]);
  const [lares, setLares] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const vetsRes = await listarVeterinarios();
        const gatosRes = await listarGatos();
        const usersRes = await listarUsuarios();

        const vetsList = vetsRes.data || vetsRes;
        const usersList = usersRes.data || usersRes;
        const gatosList = gatosRes.data || gatosRes;

        // Junta os dados dos veterinários com dados dos usuários (imagem/nome)
        const vetsCompletos = vetsList.map(vet => {
          const user = usersList.find(u => u.id === vet.id_usuario);
          return {
            ...vet,
            imagem_perfil: user?.imagem_perfil || null,
            nome: user?.nome || 'Veterinário',
          };
        });

        const laresList = usersList.filter(u => u.is_cuidador);

        // Ordena os veterinários pela média de avaliação
        const ordenados = vetsCompletos.sort((a, b) => b.avaliacao_media - a.avaliacao_media);

        setVeterinarios(ordenados);
        setUsuarios(usersList);
        setGatos(gatosList);
        setLares(laresList);
      } catch (error) {
        console.error('Erro ao carregar dados da Home:', error);
      }
    }

    carregarDados();
  }, []);

  const renderMiniCards = (data) => (
    <>
      {data.slice(0, 4).map((item, index) => (
        <Image
          key={index}
          source={
            item.imagem_perfil || item.imagem
              ? { uri: item.imagem_perfil || item.imagem }
              : require('../../assets/images/defaultprofile.jpeg')
          }
          style={styles.cardImage}
        />
      ))}
      <TouchableOpacity style={styles.verMaisBtn}>
        <Ionicons name="chevron-forward" size={24} color="#fff" />
      </TouchableOpacity>
    </>
  );

  return (
    <AppLayout navigation={navigation}>
      <ScrollView contentContainerStyle={globalStyles.scrollVertical}>
        {/* Botão topo */}
        <TouchableOpacity style={styles.topButton} onPress={() => navigation.navigate('RegisterVeterinarian')}>
          <Text style={styles.ButtonText}>CADASTRAR VETERINÁRIO</Text>
          <Ionicons name="add" size={18} color="#fff" style={{ marginLeft: 4 }} />
        </TouchableOpacity>

        {/* Lista de Veterinários */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VETERINÁRIOS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={globalStyles.scrollHorizontal}>
            {renderMiniCards(veterinarios)}
          </ScrollView>
        </View>

        {/* Lista de Gatos */}
        <TouchableOpacity style={styles.addCatBtn} onPress={() => navigation.navigate('RegisterGato')}>
          <Text style={styles.ButtonText}> CADASTRAR GATO </Text>
          <Image source={require('../../assets/images/icon_cat.webp')} style={styles.catIcon} />
          <Ionicons name="add" style={[{marginRight:2}]} size={18} color="#fff" />
        </TouchableOpacity>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GATOS PARA ADOTAR</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={globalStyles.scrollHorizontal}>
            {renderMiniCards(gatos)}
          </ScrollView>
        </View>

        {/* Lista de Lares Temporários */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LAR TEMPORÁRIO</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={globalStyles.scrollHorizontal}>
            {renderMiniCards(lares)}
          </ScrollView>
        </View>
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  topButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: colors.marrom,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.branco,
    marginVertical: 10,
    alignItems: 'center',
  },
  ButtonText: {
    color: colors.branco,
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf:'center',
  },
  section: {
    marginBottom: 50,
  },
  sectionTitle: {
    color: colors.branco,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    marginHorizontal: 16,
    borderColor: colors.branco,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignSelf: 'auto',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    alignItems: 'baseline',
  },
  addCatBtn: {
    flexDirection: 'row',
    marginBottom: 4,
    borderWidth: 1,
    borderRadius:6,
    borderColor: colors.branco,
    alignItems: 'flex-end',
    alignSelf: 'center',
    position: 'relative',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  catIcon: {
    width: 24,
    height: 24,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  verMaisBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
});