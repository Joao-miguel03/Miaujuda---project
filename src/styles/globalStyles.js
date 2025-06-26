import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const globalStyles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: colors.branco,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 40,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 15,
    marginTop: 10, 
  },
  security_cat:{
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: -100,
  },
});
