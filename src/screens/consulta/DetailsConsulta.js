import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import AppLayout from '../../components/AppLayout';
import { colors } from '../../styles/colors';
import { buscarConsultaPorId } from '../../api/consulta';
import { buscarVeterinarioPorId } from '../../api/veterinario';

export default function DetailsConsultaScreen({ route, navigation }) {
  const { idConsulta } = route.params;

  const [consulta, setConsulta] = useState(null);
  const [veterinario, setVeterinario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [dadosConsulta] = await buscarConsultaPorId(idConsulta);
        setConsulta(dadosConsulta);

        if (dadosConsulta?.id_profissional) {
          const [dadosVeterinario] = await buscarVeterinarioPorId(dadosConsulta.id_profissional);
          setVeterinario(dadosVeterinario);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [idConsulta]);

  if (loading) {
    return (
      <AppLayout navigation={navigation}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.bege} />
        </View>
      </AppLayout>
    );
  }

  if (!consulta) {
    return (
      <AppLayout navigation={navigation}>
        <View style={styles.loading}>
          <Text style={styles.value}>Consulta não encontrada.</Text>
        </View>
      </AppLayout>
    );
  }

  const nomeVeterinario = veterinario?.usuario?.nome || '—';
  const especialidade = veterinario?.especialidades || '—';

  return (
    <AppLayout navigation={navigation}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Detalhes da Consulta</Text>
        <View style={styles.detailBox}>
          <DetailItem label="Data" value={consulta.data} />
          <DetailItem label="Tipo" value={consulta.tipo} />
          <DetailItem label="Procedimento" value={consulta.procedimento} />
          <DetailItem label="Valor" value={`R$ ${consulta.valor?.toFixed(2)}`} />
          <DetailItem label="Cliente/Gato" value={consulta.nome_cliente_gato || '—'} />
          <DetailItem label="Especialidade" value={especialidade} />
          <DetailItem label="Profissional" value={nomeVeterinario} />
        </View>
      </ScrollView>
    </AppLayout>
  );
}

function DetailItem({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || '—'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.marrom,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.marrom,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.branco,
    marginBottom: 24,
    textAlign: 'center',
  },
  detailBox: {
    backgroundColor: '#4e2a14',
    borderRadius: 16,
    padding: 16,
    borderColor: colors.bege,
    borderWidth: 1,
  },
  row: {
    marginBottom: 16,
  },
  label: {
    color: colors.bege,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  value: {
    color: colors.branco,
    fontSize: 16,
  },
});
