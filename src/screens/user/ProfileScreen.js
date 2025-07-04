import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppLayout from '../../components/AppLayout';
import { AuthContext } from '../../context/AuthContext';
import { colors } from '../../styles/colors';
import { atualizarUsuario } from '../../api/usuario';

export default function ProfileScreen({ navigation }) {
  const { usuario, logout, setUsuario } = useContext(AuthContext);
  const [isCuidador, setIsCuidador] = useState(usuario?.is_cuidador || false);
  const [showModal, setShowModal] = useState(false);

  const handleToggleSwitch = (value)=>{
    if (!isCuidador && value) {
      setShowModal(true);
    }else{
      atualizarStatusCuidador(value);
    }
  };

  const atualizarStatusCuidador = async (novoStatus) => {
    try {
      await atualizarUsuario(usuario.id, { is_cuidador: novoStatus });
      setIsCuidador(novoStatus);
      setUsuario({ ...usuario, is_cuidador: novoStatus });
    } catch (error) {
      console.error('Erro ao atualizar cuidador:', error);
    }
  };

  const confirmCuidador = () => {
    atualizarStatusCuidador(true);
    setShowModal(false);
  } 

  return (
    <AppLayout navigation={navigation}>
      {/* Header customizado da tela de perfil */}
      <View style={styles.headerPerfil}>
        <Text style={styles.headerTitle}>Configurações</Text>
        <View style={styles.userSection}>
          <Image
            source={usuario?.imagem_perfil ? { uri: usuario.imagem_perfil } : require('../../../assets/images/defaultprofile.jpeg')}
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

      {/* O que é lar temporário */}
      <Modal visible={showModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>O que é ser um lar temporário?</Text>
            <Text style={styles.modalText}>
              Um lar temporário abriga gatos resgatados até encontrarem um lar definitivo. Você pode ajudar um animal a se recuperar e ser adotado com amor e segurança.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={confirmCuidador}>
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Main */}
      <View style={styles.main}>
        <TouchableOpacity>
          <Text style={styles.option}>notificações</Text>
        </TouchableOpacity>

        <View style={styles.switchContainer}>
          <Text style={styles.option}>Ser um lar temporário</Text>
          <Switch
            value={isCuidador}
            onValueChange={handleToggleSwitch}
            thumbColor={isCuidador ? colors.marromClaro : '#ccc'}
            trackColor={{ false: '#ccc', true: colors.marrom }}
          />
        </View>

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
    marginTop: -16,
    backgroundColor: colors.marromClaro,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    padding: 16,
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
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logout: {
    color: 'red',
    fontSize: 14,
    marginTop: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: colors.bege,
    borderRadius: 12,
    padding: 20,
    width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.marrom,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: colors.marrom,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    backgroundColor: colors.marromClaro,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  modalButtonText: {
    color: colors.branco,
    fontWeight: 'bold',
  },
});
