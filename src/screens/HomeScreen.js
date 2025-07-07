import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import AppLayout from '../components/AppLayout';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { listarVeterinarios } from '../api/veterinario';
import { listarGatos } from '../api/gato';
import { listarNoticias } from '../api/noticia';
import { listarUsuarios } from '../api/usuario';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const {usuario} = useContext(AuthContext);

  const [veterinarios, setVeterinarios] = useState([]);
  const [gatos, setGatos] = useState([]);
  const [lares, setLares] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [noticias, setNoticias] = useState([]);

  const isVeterinarioLogado = veterinarios.some(v => v.id_usuario === usuario?.id);

  useEffect(() => {
    async function carregarDados() {
      try {
        const vetsRes = await listarVeterinarios();
        const gatosRes = await listarGatos();
        const usersRes = await listarUsuarios();
        const newsRes = await listarNoticias();

        const vetsList = vetsRes.data || vetsRes;
        const usersList = usersRes.data || usersRes;
        const gatosList = gatosRes.data || gatosRes;
        const newsList = newsRes.data || newsRes

        const vetsCompletos = vetsList.map(vet => {
          const user = usersList.find(u => u.id === vet.id_usuario);
          return {
            ...vet,
            imagem_perfil: user?.imagem_perfil || null,
            nome: vet.nome || user?.nome || 'Veterinário',
          };
        });

        const laresList = usersList.filter(u => u.is_cuidador);

        const ordenados = vetsCompletos.sort((a, b) => b.avaliacao_media - a.avaliacao_media);

        setVeterinarios(ordenados);
        setUsuarios(usersList);
        setGatos(gatosList);
        setLares(laresList);
        setNoticias(newsList);
      } catch (error) {
        console.error('Erro ao carregar dados da Home:', error);
      }
    }

    carregarDados();
  }, []);

  const renderMiniCards = (data, nav, mostrarTitulo = false) => (
    <>
      {data.slice(0, 4).map((item, index) => (
        <View key={index} style={styles.cardContainer}>
          <Image
            source={
              item.imagem_perfil || item.imagem
                ? { uri: item.imagem_perfil || item.imagem }
                : mostrarTitulo
                  ? require('../../assets/images/newsDefault.jpeg')
                  : require('../../assets/images/defaultprofile.jpeg')
            }
            style={styles.cardImage}
          />
          <Text style={styles.cardLabel}>{mostrarTitulo ? item.titulo || 'Sem título' : item.nome || 'Nome não informado'}</Text>
        </View>
      ))}
      <TouchableOpacity onPress={()=> navigation.navigate(nav)} style={styles.verMaisBtn}>
        <Ionicons name="chevron-forward" size={24} color="#fff" />
      </TouchableOpacity>
    </>
  );

  return (
    <AppLayout navigation={navigation}>
      <ScrollView contentContainerStyle={globalStyles.scrollVertical}>
        
        {usuario && (
          <TouchableOpacity style={styles.topButton} onPress={() => isVeterinarioLogado
            ? navigation.navigate('MarcarConsulta')
            : navigation.navigate('RegisterVeterinarian')
          }
          >
            <Text style={styles.ButtonText}>
              {isVeterinarioLogado ? 'MARCAR CONSULTA' : 'CADASTRAR VETERINÁRIO'}
            </Text>
            <Ionicons name='add' size={18} color={colors.branco} style={{ marginLeft:4 }} />
          </TouchableOpacity>
        )}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VETERINÁRIOS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={globalStyles.scrollHorizontal}>
            {renderMiniCards(veterinarios, nav='VeterinarianList')}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.addCatBtn} onPress={() => navigation.navigate('RegisterGato')}>
          <Text style={styles.ButtonText}> CADASTRAR GATO </Text>
          <Image source={require('../../assets/images/icon_cat.webp')} style={styles.catIcon} />
          <Ionicons name="add" style={[{marginRight:2}]} size={18} color="#fff" />
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GATOS PARA ADOTAR</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={globalStyles.scrollHorizontal}>
            {renderMiniCards(gatos, nav='CatList')}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LAR TEMPORÁRIO</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={globalStyles.scrollHorizontal}>
            {renderMiniCards(lares, nav='ListLarTemp')}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NOTÍCIAS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={globalStyles.scrollHorizontal}>
            {renderMiniCards(noticias,nav='NewsList', mostrarTitulo=true)}
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
    borderRadius:12,
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
  cardContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
    maxWidth: 100,
    borderWidth:1,
    borderColor: colors.branco,
    borderRadius:5,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  cardLabel: {
    color: colors.branco,
    fontSize: 12,
    marginTop: 4,
    textAlign:'center',
  },
  verMaisBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
});
