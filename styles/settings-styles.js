import { StyleSheet } from 'react-native'
import Colors from './colors'

export default settingsStyles = StyleSheet.create({

  settingsBackground: {
    height: '100%',
    flexDirection: 'column',
    backgroundColor: Colors.appPrimary,
  },

  title: {
    alignSelf: 'center',
    fontSize: 30,
    color: Colors.appTertiary,
  },

  mainView: {
    height: '91%',
    paddingTop: '5%',
  },

  returnButton: {
    width: '100%',
    height: '10%',
    backgroundColor: Colors.appSecondary,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },

  divider: {
    height: 3,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: 'black',
  },

  listItem: {
    justifyContent: 'center',
    paddingBottom: '5%',
  },

  listTitle: {
    fontSize: 25,
    color: Colors.appTertiary,
    paddingHorizontal: '5%',
  },

  color: {
    width: 40,
    height: 40,
    borderRadius: 13,
  },

})
