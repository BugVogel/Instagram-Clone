import React, { Component } from 'react'
import {StyleSheet, Text, View} from 'react-native'
import OptionsPost from './OptionsPost'

export default class InfoPost extends Component {

    render(){

        let view = null

        if(this.props.comments){

            view = this.props.comments.map((item, index) => {

                return(
                    <View style={styles.commentContainer} key={index}>
                        <Text style={styles.nickname}> {item.nickname} 
                           <Text style={styles.comment}>  {item.comment}</Text>
                        </Text>
                    </View>

                )

            })


        }


        return(

            <View style={styles.container}>
                <OptionsPost />
                <View style={{flexDirection: 'row',marginLeft: 4}}>
                    <Text style={styles.nickname}>{this.props.nickname}</Text> 
                    <Text style={styles.comment}>{this.props.title}</Text>
                </View>
                
                {view}
            </View>


        )
    }


}


const styles = StyleSheet.create({
    container:{
        
        marginHorizontal:10,
        flex:0.5
 

    },
    commentContainer:{
        flexDirection: 'row',
        
        

    },
    comment:{
        flexDirection: 'row',
        color: '#555',
        marginLeft: 10,
        fontWeight: 'normal',
        
        
        
       
        
    },
    nickname: {
        color:'#444',
        fontWeight: 'bold',
        
        
    }


})