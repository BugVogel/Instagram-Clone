import React, { Component } from 'react'
import {Alert} from 'react-native'
import {connect} from 'react-redux'
import Navigator from './Navigator'
import { setMessage } from './store/actions/message'




class App extends Component {

    componentDidUpdate = () => {
    
        if(this.props.text && this.props.text.toString().trim()){
           
           
            Alert.alert(this.props.title || 'Mensagem', this.props.text.toString() )
            this.props.onClearMessage()

        }


    }


    render(){

        return(
            <Navigator />

        )

    }


}


const mapDispatchToProps = dispatch => {

    return {

        onClearMessage: () => dispatch(setMessage({
            title: '',
            text: ''
        }))

    }

}



 const mapStateToProps = ({message})=> {

    return{
        title: message.title,
        text: message.text

    }

 }


export default connect(mapStateToProps, mapDispatchToProps)(App)