import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { AuthContext } from '../context/AuthContext';

export default function AppLayout({ navigation, children }) {
  const { usuario } = useContext(AuthContext);

  const isHomeScreen =
    navigation?.getState()?.routes?.[navigation.getState().index]?.name === 'Home';
  const canGoBack = navigation?.canGoBack?.();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        {canGoBack && !isHomeScreen && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} color={colors.marrom} />
          </TouchableOpacity>
        )}

        <View style={styles.userInfo}>
          <Text style={styles.username}>
            {usuario ? usuario.nome : ''}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={
                usuario?.imagem_perfil
                  ? { uri: usuario.imagem_perfil }
                  : require('../../assets/images/defaultprofile.jpeg')
              }
              style={styles.userIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* MAIN CONTENT */}
      <View style={styles.mainContainer}>
        {children}
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={24} color={colors.marrom} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('NewsList')}>
          <Entypo name="news" size={24} color={colors.marrom} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Info')}>
          <MaterialIcons name="pets" size={24} color={colors.marrom} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AgendaConsultas')}>
          <Ionicons name="calendar-outline" size={24} color={colors.marrom} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.marrom,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.bege,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: colors.marrom,
    fontWeight: 'bold',
    marginRight: 10,
  },
  userIcon: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  mainContainer: {
    flex: 1,
    padding: 16,
  },
  footer: {
    backgroundColor: colors.bege,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
});
