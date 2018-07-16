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

  halfSize: {
    width: '50%',
  },

  thirdSize: {
    width: '33.3%',
  },

  left: {
    height: '100%',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },

  right: {
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  center: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bucketActive: {
    height: '70%',
    width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    backgroundColor: Colors.detailColor,
  },

  bucketInactive: {
    height: '70%',
    width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    backgroundColor: Colors.detailColorSecondary,
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
