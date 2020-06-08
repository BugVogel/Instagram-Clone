import React, { Component} from 'react'
import {Text, TextInput, StyleSheet, View, Alert} from 'react-native'
import { Gravatar } from 'react-native-gravatar'
import {connect} from 'react-redux'
import { addComment} from '../store/actions/posts'



class AddComments extends Component {


    state ={
        comment : '',
        editMode: false,

    }


    handleAddComment = () => {
        

        this.props.onAddComment({

            postId: this.props.postId,
            nickname: this.props.name,
            comment: this.state.comment

        })


        this.setState({comment: '', editMode: false})


    }

    render(){

    
            
                
        return (

        
                <View style={styles.container}>
                    <Gravatar options={{email: this.props.email, secure: true}} style={styles.gravatar}/>
                    <TextInput  onSubmitEditing={this.handleAddComment} style={styles.commentInput} placeholder={"Adicione um comentário..."} value={this.state.comment} onChangeText={comment => this.setState({comment})}/>
                </View>
    
        )

        

    }

}


const styles = StyleSheet.create({

    container: {
     
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 10,
        flex:0.2
   
        



    },
    gravatar:{
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: 'black'
      
    },
    commentInput:{
        marginLeft: 10
    }

})



const mapDispatchToProps = dispatch => {

    return{
        onAddComment: payload => dispatch(addComment(payload))
    }

}


const mapStateToProps = ({user}) => {

    return{
        name: user.name,
        email: user.email
    }


}


export default connect(mapStateToProps, mapDispatchToProps)(AddComments)