import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import AppLayout from '../../components/AppLayout';

export default function NewsWebViewScreen({ route, navigation }) {
  const { url } = route.params;

  return (
    <AppLayout navigation={navigation}>
      <WebView source={{ uri: url }} style={styles.webview} />
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});
