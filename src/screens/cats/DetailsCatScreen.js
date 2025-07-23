import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, } from 'react-native';
import AppLayout from '../../components/AppLayout';
import { colors } from '../../styles/colors';
import { buscarUsuarioPorId } from '../../api/usuario';
import { buscarGatoPorId, adotarGato, cuidarGato } from '../../api/gato';
import { AuthContext } from '../../context/AuthContext';

export default function DetailsCatScreen({ route, navigation }) {
  const gatoId = route?.params?.SuperId;
  const [gato, setGato] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [adotante, setAdotante] = useState(null);
  const [cuidador, setCuidador] = useState(null);
  const [mostrarAjuda, setMostrarAjuda] = useState(false);
  const { usuario: usuarioLogado } = useContext(AuthContext);

  useEffect(() => {
    async function carregarDados() {
      try {
        const gatoRes = await buscarGatoPorId(gatoId);
        const listaGatos = gatoRes.data || gatoRes;
        const gatoEncontrado = Array.isArray(listaGatos) ? listaGatos[0] : listaGatos;
        setGato(gatoEncontrado);

        if (gatoEncontrado?.id_usuario_encontrou) {
          const usuarioRes = await buscarUsuarioPorId(gatoEncontrado.id_usuario_encontrou);
          const usuarioEncontrado = usuarioRes.data || usuarioRes;
          setUsuario(Array.isArray(usuarioEncontrado) ? usuarioEncontrado[0] : usuarioEncontrado);
        }

        if (gatoEncontrado?.id_usuario_adotou) {
          const adotanteRes = await buscarUsuarioPorId(gatoEncontrado.id_usuario_adotou);
          const usuarioEncontrado = adotanteRes.data || adotanteRes
          setAdotante(Array.isArray(usuarioEncontrado) ? usuarioEncontrado[0] : usuarioEncontrado);
        }

        if (gatoEncontrado?.id_usuario_cuidador) {
          const cuidadorRes = await buscarUsuarioPorId(gatoEncontrado.id_usuario_cuidador);
          const usuarioEncontrado = cuidadorRes.data || cuidadorRes
          setCuidador(Array.isArray(usuarioEncontrado) ? usuarioEncontrado[0] : usuarioEncontrado);
        }
      } catch (error) {
        console.error('Erro ao buscar gato:', error);
      }
    }

    carregarDados();
  }, [gatoId]);

  const handleAdotar = async () => {
    try {
      await adotarGato(gatoId, usuarioLogado.id);
      setGato(prev => ({
        ...prev,
        id_usuario_adotou: usuarioLogado.id,
        id_usuario_cuidador: null,
      }));
      setAdotante(usuarioLogado);
      setCuidador(null);
      setMostrarAjuda(false);
    } catch (error) {
      console.error('Erro ao adotar gato:', error);
    }
  };

  const handleCuidar = async () => {
    try {
      await cuidarGato(gatoId, usuarioLogado.id);
      setGato(prev => ({
        ...prev,
        id_usuario_cuidador: usuarioLogado.id,
        id_usuario_adotou: null,
      }));
      setCuidador(usuarioLogado);
      setAdotante(null);
      setMostrarAjuda(false);
    } catch (error) {
      console.error('Erro ao cuidar do gato:', error);
    }
  };

  if (!gato) {
    return (
      <AppLayout>
        <Text style={styles.carregando}>Gato não encontrado. Volte e tente novamente.</Text>
      </AppLayout>
    );
  }

  return (
    <AppLayout navigation={navigation}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>DETALHES DO GATO</Text>

        <View style={styles.headerBox}>
          <Image
            source={gato.imagem ? { uri: gato.imagem } : require('../../../assets/images/logo.png')}
            style={styles.fotoGato}
          />
          <Text style={styles.nomeGato}>{gato.nome || 'Sem nome'}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.info}>
            <Text style={styles.bold}>Usuário:</Text> {usuario?.nome || 'Desconhecido'}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.bold}>Contato:</Text> {usuario?.telefone || 'Não informado'}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.bold}>Local encontrado:</Text> {gato.local_encontrado}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.bold}>Encontrado em:</Text>{' '}
            {gato.data_encontrado
              ? new Date(gato.data_encontrado).toLocaleDateString()
              : 'Data não informada'}
          </Text>

          {gato.id_usuario_adotou && adotante && (
            <Text style={styles.status}>
              Este gato foi adotado por <Text style={styles.bold}>{adotante.nome}</Text>
            </Text>
          )}
          {gato.id_usuario_cuidador && cuidador && (
            <Text style={styles.status}>
              Este gato está sendo cuidado temporariamente por{' '}
              <Text style={styles.bold}>{cuidador.nome}</Text>
            </Text>
          )}
        </View>

        {!gato.id_usuario_adotou && !gato.id_usuario_cuidador && (
          <TouchableOpacity style={styles.botao} onPress={() => setMostrarAjuda(true)}>
            <Text style={styles.botaoTexto}>AJUDAR</Text>
          </TouchableOpacity>
        )}

        <Modal
          visible={mostrarAjuda}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setMostrarAjuda(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitulo}>Como você quer ajudar?</Text>

              <TouchableOpacity style={styles.modalBotao} onPress={handleAdotar}>
                <Text style={styles.modalBotaoTexto}>ADOTAR</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalBotao} onPress={handleCuidar}>
                <Text style={styles.modalBotaoTexto}>LAR TEMPORÁRIO</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBotao, { backgroundColor: colors.marrom }]}
                onPress={() => setMostrarAjuda(false)}
              >
                <Text style={[styles.modalBotaoTexto, { color: colors.branco }]}>CANCELAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.marrom,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  carregando: {
    color: colors.branco,
    textAlign: 'center',
    marginTop: 40,
  },
  title: {
    color: colors.branco,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  headerBox: {
    backgroundColor: colors.bege,
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  fotoGato: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.marrom,
    marginBottom: 12,
  },
  nomeGato: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.marrom,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#1E0F06',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  info: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 8,
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
    color: colors.bege,
  },
  status: {
    color: colors.bege,
    fontSize: 16,
    marginTop: 12,
    fontWeight: 'bold',
  },
  botao: {
    backgroundColor: colors.bege,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 32,
    alignSelf: 'center',
  },
  botaoTexto: {
    color: colors.marrom,
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '80%',
    alignItems: 'center',
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.marrom,
  },
  modalBotao: {
    backgroundColor: colors.bege,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  modalBotaoTexto: {
    color: colors.marrom,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
