import { StyleSheet } from 'react-native'
import Colors from './colors'

export default timerStyles = StyleSheet.create({
  
  timerSelection: {
    backgroundColor: Colors.detailColor,
    justifyContent: 'center',
    borderRadius: 10,
  },

  selected: {
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: 'red',
  },

  title: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 17,
  },

})
