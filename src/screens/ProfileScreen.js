import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppLayout from '../components/AppLayout';
import { AuthContext } from '../context/AuthContext';
import { colors } from '../styles/colors';

export default function ProfileScreen({ navigation }) {
  const { usuario, logout } = useContext(AuthContext);

  return (
    <AppLayout navigation={navigation}>
      {/* Header customizado da tela de perfil */}
      <View style={styles.headerPerfil}>
        <Text style={styles.headerTitle}>Configurações</Text>
        <View style={styles.userSection}>
          <Image
            source={usuario?.imagem_perfil ? { uri: usuario.imagem_perfil } : require('../../assets/images/defaultprofile.jpeg')}
            style={styles.userImage}
          />
          <View>
            <Text style={styles.ola}>Olá</Text>
            <Text style={styles.userName}>{usuario?.nome}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('EditarPerfil')} style={styles.editButton}>
            <Ionicons name="create-outline" size={20} color={colors.marrom} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main */}
      <View style={styles.main}>
        <TouchableOpacity>
          <Text style={styles.option}>notificações</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.option}>mudar senha</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          logout();
          navigation.replace('Login');
        }}>
          <Text style={styles.logout}>sair</Text>
        </TouchableOpacity>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  headerPerfil: {
    backgroundColor: colors.marromClaro,
    padding: 16,
    borderRadius: 8,
  },
  headerTitle: {
    color: colors.branco,
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  ola: {
    color: colors.branco,
    fontSize: 12,
  },
  userName: {
    color: colors.branco,
    fontWeight: 'bold',
    fontSize: 14,
  },
  editButton: {
    marginLeft: 'auto',
  },
  main: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  option: {
    color: colors.branco,
    fontSize: 16,
    marginBottom: 20,
  },
  logout: {
    color: 'red',
    fontSize: 14,
    marginTop: 40,
  },
});
