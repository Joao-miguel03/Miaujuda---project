import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const globalStyles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.marrom,
    padding: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.branco,
    borderRadius: 6,
    padding: 10,
    color: colors.branco,
    marginBottom: 10,
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },

  security_cat: {
    width: 400,
    height: 400,
    marginTop: 20,
    marginBottom: -100,
    resizeMode: 'contain',
    alignSelf:'center',
  },
  news_cat: {
    width: 230,
    height: 230,
    marginTop: 20,
    marginBottom: -100,
    resizeMode: 'contain',
    alignSelf:'center',
  },

  scrollVertical: {
    padding: 16,
    paddingBottom: 100,
  },

  scrollHorizontal: {
    paddingHorizontal: 16,
  },

  card: {
    backgroundColor: colors.bege,
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
  },

  cardImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
});
