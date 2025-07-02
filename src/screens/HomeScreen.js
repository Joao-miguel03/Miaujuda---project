import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image } from 'react-native';
import AppLayout from '../components/AppLayout';

export default function HomeScreen({ navigation }) {
  return (
    <AppLayout navigation = {navigation}>
      <View style={styles.content}>
        <Text style={styles.title}>Bem vindo ao MIAUJUDA!</Text>
        <Text style={styles.subtitle}>Aqui você pode cuidar, adotar e ajudar gatos 🐱</Text>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});
