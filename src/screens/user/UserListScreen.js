import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AppLayout from '../../components/AppLayout';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { listarUsuarios } from '../../api/usuario';
import { AuthContext } from '../../context/AuthContext';

export default function UserListScreen({ navigation }) {
  const route = useRoute()
  const [usuarios, setUsuarios] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');
  const { usuario: usuarioLogado } = useContext(AuthContext);

  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const res = await listarUsuarios();
        let dados = res.data || res;

        if (route.name === 'ListCuidador') {
          dados = res.filter(u => u.is_cuidador);
        }
        const ordenados = dados.sort((a, b) => a.nome.localeCompare(b.nome));
        setUsuarios(ordenados);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      }
    }

    carregarUsuarios();
  }, []);

  const usuariosFiltrados = usuarios.filter((u) => {
    const visivelParaUsuario = usuarioLogado?.is_admin || !u.is_admin;
    return (
      u.nome.toLowerCase().includes(filtroNome.toLowerCase()) && visivelParaUsuario
    );
  });

  return (
    <AppLayout navigation={navigation}>
      <ScrollView contentContainerStyle={globalStyles.scrollVertical}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar usuário pelo nome"
          value={filtroNome}
          onChangeText={setFiltroNome}
          placeholderTextColor={colors.marromClaro}
        />

        {usuariosFiltrados.map((usuario) => (
          <View key={usuario.id} style={styles.usuarioCard}>
            <View style={styles.leftContainer}>
              <Image
                source={
                  usuario.imagem_perfil
                    ? { uri: usuario.imagem_perfil }
                    : require('../../../assets/images/defaultprofile.jpeg')
                }
                style={styles.profileImage}
              />
              <View>
                <Text style={styles.nome}>{usuario.nome}</Text>
                <Text style={styles.email}>
                  {usuario.email === 'admin@miau.com' ? 'Email protegido' : usuario.email}
                </Text>
              </View>
            </View>
            <View style={styles.botoesContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('DetailsUser', { userId: usuario.id })}
              >
                <Text style={styles.link}>Ver perfil</Text>
              </TouchableOpacity>
              {usuarioLogado?.is_admin && usuario.email !== 'admin@miau.com' && (
                <TouchableOpacity
                  onPress={() => navigation.navigate('EditUser', { userId: usuario.id })}
                >
                  <Text style={styles.linkEditar}>Editar</Text>
                </TouchableOpacity>
              )}
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
  usuarioCard: {
    backgroundColor: colors.bege,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.marrom,
  },
  email: {
    fontSize: 13,
    color: colors.marromClaro,
  },
  botoesContainer: {
    alignItems: 'flex-end',
  },
  link: {
    color: '#007bff',
    fontSize: 13,
    marginBottom: 4,
  },
  linkEditar: {
    color: '#28a745',
    fontSize: 13,
  },
});
