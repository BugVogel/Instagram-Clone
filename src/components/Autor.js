import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Gravatar} from 'react-native-gravatar'


export default  props => {

    return (

        <View style={styles.container}>
            <Gravatar options={{email: props.email, secure: true}} style={styles.gravatar}/>
            <Text style={styles.nickname}>{props.nickname}</Text>
        </View>

    )

}

const styles = StyleSheet.create({

    container:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    gravatar:{
        height: 30,
        width: 30,
        borderRadius: 15,
        marginHorizontal: 10,
        backgroundColor: 'black'
    },
    nickname:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#444',
        marginVertical: 15
    }

})