import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native'
import Autor from "./Autor"
import Comments from './Comments'
import AddComments from './AddComments'



export default class Post extends Component {

    render(){
        return(

            <View style={{flex:1}}>
                <Autor  email={this.props.email}nickname={this.props.nickname}/>
                <Image style={styles.image} source={{uri: this.props.source}} />
                <Comments nickname={this.props.nickname} title={this.props.title}comments={this.props.comments}/>
                <AddComments postId={this.props.id} email={this.props.email} />
            </View>

        );

    }

}


const styles = StyleSheet.create({
    image:{
        height: Dimensions.get('window').width * 3/4,
        width: Dimensions.get('window').width,
        resizeMode: 'contain'
    }

})


