import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { listarConsultas } from '../../api/consulta';
import { buscarVeterinarioPorUsuario } from '../../api/veterinario';
import { colors } from '../../styles/colors';
import AppLayout from '../../components/AppLayout';

const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function AgendaScreen({ navigation }) {
  const ano_atual = new Date().getFullYear();
  const { usuario } = useContext(AuthContext);
  const [consultas, setConsultas] = useState([]);
  const [consultasPorMes, setConsultasPorMes] = useState({});

  useEffect(() => {
  if (usuario?.id) {
    carregarConsultas();
  }
}, [usuario]);

const carregarConsultas = async () => {
  try {
    const todasConsultas = await listarConsultas();
    const veterinarios = await buscarVeterinarioPorUsuario(usuario.id);

    const isVeterinarioLogado = Array.isArray(veterinarios) &&
      veterinarios.some(v => v.id_usuario === usuario.id);

    let consultasFiltradas = [];

    if (isVeterinarioLogado) {
      const veterinarioAtual = veterinarios.find(v => v.id_usuario === usuario.id);
      if (veterinarioAtual?.id) {
        consultasFiltradas = todasConsultas.filter(c => c.id_profissional === veterinarioAtual.id);
      }
    } else {
      consultasFiltradas = todasConsultas.filter(c => c.id_cliente_usuario === usuario.id);
    }

    setConsultas(consultasFiltradas);
    agruparConsultasPorMes(consultasFiltradas);

  } catch (err) {
    console.error("Erro ao carregar consultas:", err);
  }
};

  const agruparConsultasPorMes = (lista) => {
    const agrupadas = {};
    lista.forEach(c => {
      const dataObj = new Date(c.data);
      const mes = dataObj.getMonth();
      const dia = dataObj.getDate();
      const chave = `${mes}-${dia}`;

      if (!agrupadas[mes]) agrupadas[mes] = {};
      if (!agrupadas[mes][dia]) agrupadas[mes][dia] = [];
      agrupadas[mes][dia].push(c);
    });
    setConsultasPorMes(agrupadas);
  };

  const renderizarMes = (mesIndex) => {
    const diasDoMes = new Date(new Date().getFullYear(), mesIndex + 1, 0).getDate();
    const dias = Array.from({ length: diasDoMes }, (_, i) => i + 1);
    const consultasDoMes = consultasPorMes[mesIndex] || {};

    return (
      <View key={mesIndex} style={styles.monthContainer}>
        <Text style={styles.monthTitle}>{meses[mesIndex]}</Text>
        <View style={styles.daysContainer}>
          {dias.map(dia => (
            <View key={dia} style={[styles.dayCircle, consultasDoMes[dia] && styles.markedDay]}>
              <Text style={styles.dayText}>{dia}</Text>
            </View>
          ))}
        </View>
        <View style={styles.events}>
          {Object.entries(consultasDoMes).map(([dia, consultas]) => (
            <View key={dia}>
              {consultas.map((c, i) => (
                <Text key={i} style={styles.eventText}>
                  {dia} - {c.procedimento} ({c.nome_cliente_gato})
                </Text>
              ))}
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <AppLayout navigation={navigation}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>AGENDA DE {ano_atual}</Text>
        {meses.map((_, index) => renderizarMes(index))}
        <View style={{ height: 100 }} />
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.marrom,
  },
  title: {
    fontSize: 28,
    color: colors.branco,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
  },
  monthContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.branco,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  monthTitle: {
    color: colors.branco,
    fontSize: 20,
    marginBottom: 10,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  markedDay: {
    borderColor: colors.red,
    borderWidth: 2,
  },
  dayText: {
    color: '#fff',
    fontSize: 14,
  },
  events: {
    marginTop: 10,
  },
  eventText: {
    color: '#fff',
    fontSize: 13,
  },
});