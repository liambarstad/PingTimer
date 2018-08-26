import { StyleSheet } from 'react-native'
import Colors from './colors'

export default reportStyles = StyleSheet.create({
  
  reportBackground: {
    height:'100%',
    flexDirection: 'column',
    backgroundColor: Colors.appPrimary,
  },

  returnButton: {
    width: '100%',
    height: '10%',
    backgroundColor: Colors.appSecondary,
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },

  title: {
    color: Colors.appTertiary,
    alignSelf: 'center',
    fontSize: 25,
    justifyContent: 'center',
    padding: '5%',
  },

  reportBars: {
    height: '70%',
    flexDirection: 'row',
  },

  barEntry: {
    height: '100%',
    flexDirection: 'column',
  },

  barContainer: {
    height: '80%',
    paddingHorizontal: '2%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  barTitle: {
    alignSelf: 'center',
    color: Colors.appTertiary,
  },

  bar: {
    backgroundColor: Colors.appSecondary,
    borderRadius: 13,
  },

  barFooterContainer: {
    height: '20%',
    flexDirection: 'column',
  },

  barFooter: {
    fontSize: 20,
    transform: [{ rotate: '40deg' }],
    color: Colors.appTertiary,
    alignSelf: 'flex-end',
  },

  divider: {
    backgroundColor: 'black',
    height: 5,
    width: '100%',
    margin: 3,
  },

})
