import { View, Text, StyleSheet , Switch} from 'react-native'
import React from 'react'

const SwitchType = ({title, value, setMethod}) => {


  return (
    <View style={styles.container}>
      <Text style={styles.switchText}>{title}</Text>
      <Switch onValueChange={setMethod} value={value} ></Switch>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})

export default SwitchType