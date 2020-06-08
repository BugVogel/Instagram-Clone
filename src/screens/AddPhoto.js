import React, { Component } from 'react'
import {View, Text, StyleSheet, Dimensions, Platform, TouchableOpacity, Alert, ScrollView, TextInput, Image, ActivityIndicator } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { connect} from 'react-redux'
import {addPost} from '../store/actions/posts' 

const initialState = {
    image: null,
    title: '',

}


 class AddPhoto extends Component {

    state= {
        ...initialState
    }

    componentDidUpdate = prevProps => {

        if(prevProps.loading && !this.props.loading){

         this.setState({...initialState})
         this.props.navigation.navigate('Feed')

        }



    }


    pickImage = () => {

        ImagePicker.showImagePicker({
            title: 'Escolha a imagem',
            maxHeight: 800,
            maxWidth: 600,

        }, res => {

            if(!res.didCancel){

                this.setState({image: {uri: res.uri, base64: res.data}})

            }

        })

    }

    save =  () => {

        this.props.onPost({

           
            nickname: this.props.name,
            email: this.props.email,
            source: this.state.image,
            title: this.state.title,
            comments: []
            

        })
  
        

    }


    render(){

        let view = this.props.loading ?   <ActivityIndicator style={{flex:1}} size={'large'}/> :
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Compartilhe uma foto</Text>
                <View style={styles.imageContainer}>
                    <Image source={this.state.image} style={styles.image} />
                </View>
                <TouchableOpacity disabled={this.props.loading} onPress={this.pickImage} style={[styles.buttom, this.props.loading ? styles.buttomDisabled : null]}>
                    <Text style={styles.textButtom}>Escolha uma imagem</Text>
                </TouchableOpacity>
                <TextInput placeholder={"Coloque uma legenda na sua foto"} style={styles.input} onChangeText={title => this.setState({title})} value={this.state.title}/>
                <TouchableOpacity disabled={this.props.loading} onPress={this.save} style={[styles.buttom, this.props.loading ? styles.buttomDisabled: null]}>
                    <Text style={styles.textButtom}>Salvar </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

        return(
                <View style={this.props.loading ? {flex: 1} : null}>
                    {view}
                </View>
            
        )

    }


}



const styles = StyleSheet.create({

    container: {
        flex:1,
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: Platform.OS === 'ios' ? 30 : 10
    },

    imageContainer: {
        width: '90%',
        backgroundColor: '#EEE',
        height: Dimensions.get('window').width * 3/4,
        marginTop: 10,
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 3/4,
        resizeMode: 'center'
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    textButtom: {
        fontSize: 20,
        color: '#FFF'

    },
    input:{
        marginTop: 10,
        width: '90%'
    },

    buttomDisabled:{
        backgroundColor: '#AAA'
    }


})



const mapStateToProps = ({user,posts}) => {

    return {
        email: user.email,
        name: user.name,
        loading: posts.isUploading
    }

}


const mapDispatchToProps = dispatch => {

    return{

        onPost: post => dispatch(addPost(post))

    }

}


export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)