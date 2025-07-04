import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import AppLayout from '../../components/AppLayout';
import { globalStyles } from '../../styles/globalStyles';
import { colors } from '../../styles/colors';
import { criarNoticia } from '../../api/noticia';

export default function RegisterNewsScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [autor, setAutor] = useState('');
  const [link, setLink] = useState('');
  const [imagem, setImagem] = useState('');

  const handleCriarNoticia = async () => {
    if (!titulo || !conteudo) {
      alert('Erro. Preencha pelo menos o título e o conteúdo.');
      return;
    }

    const novaNoticia = {
      titulo,
      conteudo,
      autor,
      link_materia: link,
      imagem: imagem,
    };

    try {
      await criarNoticia(novaNoticia);
      alert('Sucesso! Notícia cadastrada com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao criar notícia:', error);
      alert('Erro. Não foi possível cadastrar a notícia.');
    }
  };

  return (
    <AppLayout navigation={navigation}>
      <ScrollView contentContainerStyle={globalStyles.scrollVertical}>
        <View style={styles.registerBox}>
          <Text style={styles.title}>ADICIONAR NOTÍCIA</Text>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Digite o título da notícia"
            value={titulo}
            onChangeText={setTitulo}
            placeholderTextColor={colors.cinzaClaro}
          />

          <Text style={styles.label}>Conteúdo</Text>
          <TextInput
            style={[globalStyles.input, styles.multilineInput]}
            placeholder="Digite o conteúdo"
            value={conteudo}
            onChangeText={setConteudo}
            multiline
            numberOfLines={4}
            placeholderTextColor={colors.cinzaClaro}
          />

          <Text style={styles.label}>Autor</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Digite o autor (opcional)"
            value={autor}
            onChangeText={setAutor}
            placeholderTextColor={colors.cinzaClaro}
          />

          <Text style={styles.label}>Link da matéria</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Link externo (opcional)"
            value={link}
            onChangeText={setLink}
            placeholderTextColor={colors.cinzaClaro}
          />

          <Text style={styles.label}>URL da imagem</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="URL da imagem (opcional)"
            value={imagem}
            onChangeText={setImagem}
            placeholderTextColor={colors.cinzaClaro}
          />

          <TouchableOpacity style={styles.button} onPress={handleCriarNoticia}>
            <Text style={styles.buttonText}>Publicar</Text>
          </TouchableOpacity>
        </View>
        
        <Image source={require("../../../assets/images/news-cat.png")} style={globalStyles.news_cat}/>

      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  registerBox: {
    backgroundColor: colors.marrom,
    borderRadius: 12,
    borderColor: colors.branco,
    borderWidth: 2,
    padding: 20,
    width: '100%',
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.branco,
    marginBottom: 20,
    alignSelf: 'center',
  },
  label: {
    color: colors.branco,
    marginBottom: 5,
    fontSize: 14,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: colors.bege,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 15,
  },
  buttonText: {
    color: colors.marrom,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});