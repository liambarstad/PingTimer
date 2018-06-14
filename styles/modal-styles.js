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

  optionList: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.appSecondary,
    paddingVertical: '5%',
    borderRadius: 13,
  },

  listOptionActive: {
    width: '100%',
    height: '10%',
    backgroundColor: Colors.appTertiary,
    borderWidth: 1,
    paddingTop: '2%',
  },

  listOptionInactive: {
    width: '100%',
    height: '10%',
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: 1,
    paddingTop: '2%',
  },

  listOptionTextActive: {
    alignSelf: 'center',
    fontSize: 25, 
    color: Colors.appPrimary,
  },

  listOptionTextInactive: {
    alignSelf: 'center',
    fontSize: 25,
    color: Colors.appTertiary,
  },

})
