import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import AppLayout from '../components/AppLayout';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { listarVeterinarios } from '../api/veterinario';
import { listarConsultas } from '../api/consulta';
import { listarGatos } from '../api/gato';
import { listarNoticias } from '../api/noticia';
import { listarUsuarios } from '../api/usuario';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const {usuario} = useContext(AuthContext);
  const [consultas, setConsultas] = useState([]);

  const [veterinarios, setVeterinarios] = useState([]);
  const [gatos, setGatos] = useState([]);
  const [lares, setLares] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [noticias, setNoticias] = useState([]);

  const isVeterinarioLogado = veterinarios.some(v => v.id_usuario === usuario?.id);

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const hoje = new Date();
  const miniCalendario = Array.from({ length: 7 }, (_, i) => {
    const dia = new Date();
    dia.setDate(hoje.getDate() + i);
    return {
      dia: dia.getDate(),
      semana: diasSemana[dia.getDay()],
      dataCompleta: dia,
    };
  });

  useEffect(() => {
    async function carregarConsultas() {
      try {
        const res = await listarConsultas();
        const lista = res.data || res;
        setConsultas(lista);
      } catch (e) {
        console.error("Erro ao buscar consultas:", e);
      }
    }

    carregarConsultas();
  }, []);

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

  const renderMiniCards = (data, nav, navDetails, mostrarTitulo = false) => (
    <>
      {data.slice(0, 4).map((item, index) => (
      <TouchableOpacity key={index} onPress={()=>{
       navigation.navigate(navDetails, {SuperId: item.id})
      }}
      style={styles.cardContainer}
      >
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
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={()=> navigation.navigate(nav)} style={styles.verMaisBtn}>
        <Ionicons name="chevron-forward" size={24} color="#fff" />
      </TouchableOpacity>
    </>
  );

  const diasComConsulta = miniCalendario.map(diaObj => {
    const dataFormatada = diaObj.dataCompleta.toISOString().split('T')[0];
    const consultasDoDia = consultas.filter(c => c.data === dataFormatada);
    return {
      ...diaObj,
      consultas: consultasDoDia,
    };
  });

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
            {renderMiniCards(veterinarios, 'VeterinarianList', 'DetailsVeterinarian')}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.addCatBtn} onPress={() => navigation.navigate('RegisterCat')}>
          <Text style={styles.ButtonText}> CADASTRAR GATO </Text>
          <Image source={require('../../assets/images/icon_cat.webp')} style={styles.catIcon} />
          <Ionicons name="add" style={[{marginRight:2}]} size={18} color="#fff" />
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GATOS PARA ADOTAR</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={globalStyles.scrollHorizontal}>
            {renderMiniCards(gatos, 'CatList', 'DetailsCat')}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LAR TEMPORÁRIO</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={globalStyles.scrollHorizontal}>
            {renderMiniCards(lares, 'ListCuidador', 'DetailsUser')}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NOTÍCIAS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={globalStyles.scrollHorizontal}>
            {renderMiniCards(noticias,'NewsList',  'DetailsNews', true
            )}
          </ScrollView>
        </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PRÓXIMOS DIAS</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={globalStyles.scrollHorizontal}>
          {diasComConsulta.map((d, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.dayBox, d.consultas.length > 0 && { borderColor: 'red', borderWidth: 2 }]}
              onPress={() => {
                if (d.consultas.length === 1) {
                  navigation.navigate('DetailsConsulta', { idConsulta: d.consultas[0].id });
                } else if (d.consultas.length > 1) {
                  navigation.navigate('AgendaConsultas', { data: d.dataCompleta });
                }
              }}
            >
              <Text style={styles.diaTexto}>{d.dia}</Text>
              <Text style={styles.semanaTexto}>{d.semana}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => navigation.navigate('AgendaConsultas')}
            style={[styles.verMaisBtn, { marginTop: 12, borderWidth: 1, borderColor: colors.branco, borderRadius: 12, padding: 8 }]}
          >
            <Text style={{ color: colors.branco, fontWeight: 'bold' }}>Ver mais</Text>
            <Ionicons name="calendar-outline" size={18} color="#fff" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
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
    calendarSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  calendarBox: {
    backgroundColor: colors.bege,
    borderRadius: 16,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.marrom,
    marginBottom: 12,
  },
  calendarGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 12,
  },
  dayBox: {
    backgroundColor: colors.marrom,
    borderColor: colors.bege,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 8,
    width: 60,
  },
  diaTexto: {
    color: colors.branco,
    fontSize: 18,
    fontWeight: 'bold',
  },
  semanaTexto: {
    color: colors.bege,
    fontSize: 14,
  },

});