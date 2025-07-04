import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';

export default function SplashScreen({ navigation }) {
  const curiosidades = [
    "Os bigodes dos gatos ajudam na percepção de espaço.",
    "Gatos dormem cerca de 70% da vida.",
    "Eles usam o miado apenas para se comunicar com humanos.",
    "Gatos em japones ne escreve 猫 🐱."
  ];

  const [curiosidade, setCuriosidade] = useState("");

  useEffect(() => {
    // Pega uma curiosidade aleatória
    const index = Math.floor(Math.random() * curiosidades.length);
    setCuriosidade(curiosidades[index]);

    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, []);

  return (
    <View style={[globalStyles.containerCenter, { backgroundColor: colors.bege }]}>
      <Image source={require('../../assets/images/logo.png')} style={globalStyles.logo} />
      <Text style={styles.curiosidade}>{curiosidade}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  curiosidade: {
    position: 'absolute',
    bottom: 30,
    fontSize: 14,
    color: colors.preto,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});
