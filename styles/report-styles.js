import { StyleSheet } from 'react-native'
import Colors from './colors'

export default reportStyles = StyleSheet.create({
  
  reportBars: {
    height: '70%',
    flexDirection: 'row',
  },

  barEntry: {
    height: '100%',
    flexDirection: 'column',
  },

  barContainer: {
    height: '70%',
    paddingHorizontal: '2%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  barTitle: {
    justifyContent: 'center',
  },

  bar: {
    backgroundColor: Colors.appPrimary,
    borderRadius: 13,
  },

  barFooter: {
    fontSize: 20,
    transform: [{ rotate: '90deg' }],
    color: Colors.appSecondary,
  },

  divider: {
    backgroundColor: 'black',
    height: 2,
    width: '100%',
    padding: 3,
  },

})
