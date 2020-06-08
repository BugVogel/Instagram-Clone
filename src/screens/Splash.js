import React, { Component } from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'



export default class Splash extends Component {


    componentDidMount = () =>{
        
        setTimeout( () => this.props.navigation.navigate('App'), 2000)

    }


    render(){
        

        return(

                <View style={styles.container}>
                    <Image style={styles.image} source={require('../../assets/imgs/icon.png')} />
                    <Text style={styles.title}>Lambe Lambe</Text>

                </View>
        )

    }
    


}


const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6666ff'
    },
    image:{
        resizeMode: 'contain',
        height: 200,
        width:200,
        
    },
    title:{
        fontFamily: 'shelter',
        fontSize: 70,
        
        

    }

})