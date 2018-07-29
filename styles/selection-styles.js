import { StyleSheet } from 'react-native'
import Colors from './colors'

export default timerStyles = StyleSheet.create({
  
  timerSelection: {
    backgroundColor: Colors.detailColor,
    justifyContent: 'center',
    borderRadius: 10,
  },

  pingSelection: {
    backgroundColor: Colors.pingColor,
    justifyContent: 'center',
    borderRadius: 10,
  }, 

  selected: {
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: 'red',
  },

  selectedDefault: {
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: 'green',
  },

  title: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 17,
  },

})
