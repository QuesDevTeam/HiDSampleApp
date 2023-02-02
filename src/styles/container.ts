import { StyleSheet } from 'react-native';
import Colors from './colors';

const ContainerStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  screenContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.white,
  },
  common: {
    flex: 1,
    width: '100%',
  },
  verticalCenter: {
    justifyContent: 'center',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  drawerContainer: {
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalInnerContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingBottom: 6,
  },
});

export default ContainerStyles;
