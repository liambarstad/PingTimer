import { StyleSheet } from 'react-native'
import Colors from './colors'

export default modalStyles = StyleSheet.create({
  
  top: {
    justifyContent: 'flex-start',
  },

  center: {
    justifyContent: 'center',
  },

  bottom: {
    justifyContent: 'flex-end',
  },

  body: {
    flexDirection: 'column',
    height: '45%',
    backgroundColor: Colors.appTertiary,
    borderRadius: 13,
  },

  lightText: {
    color: Colors.appTertiary,
  },

  darkText: {
    color: Colors.appPrimary,
  },

  title: {
    alignSelf: 'center',
    fontSize: 25,
    justifyContent: 'center',
    padding: '5%',
  },

  returnButton: {
    width: '100%',
    height: '10%',
    backgroundColor: Colors.appSecondary,
    borderRadius: 13, 
  },

  redButton: {
    width: '100%',
    height: '10%',
    backgroundColor: 'red',
    borderRadius: 13,
  },

})
