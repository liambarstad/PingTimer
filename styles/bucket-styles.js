import { StyleSheet } from 'react-native'
import Colors from './colors'

export default bucketStyles = StyleSheet.create({

  bucket: {
    height: 145,
    backgroundColor: Colors.detailColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
  },

  name: {
    fontSize: 30,
    color: Colors.appTertiary,
  },

})
