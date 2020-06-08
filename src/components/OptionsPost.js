import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import Like from 'react-native-vector-icons/AntDesign'
import Comment from 'react-native-vector-icons/EvilIcons'
import Icon from 'react-native-vector-icons/FontAwesome'




export default class OptionsPost extends Component{


    render(){
        return(
            
            <View style={styles.container}>
                <View style={styles.firstItens}>
                    <TouchableOpacity>
                        <Like name={"hearto"} size={20} color={'#444'}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Comment name={"comment"} size={30} color={'#444'}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name={"location-arrow"} size={30} color={'#444'}/>
                    </TouchableOpacity>
                </View>
                <View styles={styles.backItems}>
                    <TouchableOpacity>
                        <Icon  name={"bookmark-o"} size={20} color={'#444'}/>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }


}


const styles = StyleSheet.create({


    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex:0.6,
        marginHorizontal: 2
  
    },
    firstItens:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex:0.1,
    },
    backItems:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    
    },
    

})