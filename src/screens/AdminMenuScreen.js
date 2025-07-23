import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AppLayout from '../components/AppLayout';
import { colors } from '../styles/colors';
import { Ionicons, Entypo } from '@expo/vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyles } from '../styles/globalStyles';

export default function AdminMenuScreen({ navigation }) {
  return (
    <AppLayout navigation={navigation}>
      <ScrollView contentContainerStyle={globalStyles.scrollVertical}>
        <Text style={styles.titulo}>Menu do Administrador</Text>

        {/* Linha 1 */}
        <View style={styles.linha}>
          <TouchableOpacity
            style={styles.circulo}
            onPress={() => navigation.navigate('VeterinarianList')}
          >
            <FontAwesome5 name="user-md" size={40} color="#fff" />
            <Text style={styles.texto}>Veterinários</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.circulo}
            onPress={() => navigation.navigate('CatList')}
          >
            <MaterialCommunityIcons name="cat" size={40} color="#fff" />
            <Text style={styles.texto}>Gatinhos</Text>
          </TouchableOpacity>
        </View>

        {/* Linha 2 */}
        <View style={styles.linha}>
          <TouchableOpacity
            style={styles.circulo}
            onPress={() => navigation.navigate('UserList')}
          >
            <Ionicons name="people-outline" size={40} color="#fff" />
            <Text style={styles.texto}>Usuários</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.circulo}
            onPress={() => navigation.navigate('NewsList')}
          >
            <Entypo name="news" size={40} color={colors.branco} />
            <Text style={styles.texto}>Notícia</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: colors.branco,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.branco,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 8,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30,
  },
  circulo: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderColor: colors.branco,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  texto: {
    color: colors.branco,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});
