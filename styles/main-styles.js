import { StyleSheet } from 'react-native'
import Colors from './colors'

export default mainStyles = StyleSheet.create({ 

  app: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.appPrimary,
  },

  backgroundImage: {
    opacity: 0.2,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },

  panel: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  left: {
    height: '100%',
    width: '50%',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },

  right: {
    height: '100%',
    width: '50%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  innerPanelVertical: {
    padding: '5%',
  },

  innerPanelHorizontal: {
    padding: '2%',
  },

  icon: {
    height: '80%',
    width: '80%',
    resizeMode: 'contain',
    paddingHorizontal: '20%',
    tintColor: Colors.appTertiary,
  },

})
