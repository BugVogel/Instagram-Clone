import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, TouchableOpacityBase , ActivityIndicator} from 'react-native'
import {login, createUser, userloaded} from '../store/actions/user'
import {connect} from 'react-redux'


const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    registerMode: false,
}


 class Login extends Component {


    




    state ={
        
       ...initialState

    }


    componentDidUpdate = prevProps => {

        if(prevProps.loading && !this.props.loading  ){

            this.props.navigation.navigate('Profile')


        }
      
        this.props.onNotLoading()
    
       


    }

    login = () => {

        this.props.onLogin({...this.state})
       
    }


    registerUser = () =>{


        if(this.state.password != this.state.confirmPassword ){

            Alert.alert('Ops!', 'Confirmação de senha falhou, insira novamente')
            this.setState({password: '', confirmPassword: ''})
            return
        }

        this.props.onRegister({

            name: this.state.name,
            email: this.state.email,
            password: this.state.password,

            

        })

        this.setState({...initialState})

    }


    render(){


        let view = this.props.loading ? <ActivityIndicator  style={{flex:1}} size={'large'} /> :
        <View style={styles.container}>
            <Text style={styles.title}>Lambe Lambe</Text>
            
            { this.state.registerMode && 
                <TextInput value={this.state.name} onChangeText={ name => this.setState({name})} placeholder={"Nome"} style={styles.input}/>
            }
            <TextInput keyboardType={'email-address'} value={this.state.email} onChangeText={ email => this.setState({email})} placeholder={"Email"} style={styles.input}/> 
            <TextInput secureTextEntry={true} value={this.state.password} onChangeText={ password => this.setState({password})} placeholder={"Senha"} style={styles.input}/> 

            
            { this.state.registerMode && 
                <TextInput  secureTextEntry={true} value={this.state.confirmPassword} onChangeText={ confirmPassword => this.setState({confirmPassword})} placeholder={"Confirme a senha"} style={styles.input}/>
            }

            <TouchableOpacity style={styles.buttom} onPress={this.state.registerMode ? this.registerUser : this.login}>
                <Text style={styles.textButtom}>{this.state.registerMode ? 'Cadastrar' : 'Entrar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop:50}} onPress={() => this.setState({registerMode: !this.state.registerMode})}>
                <Text style={styles.registerButtom}>{this.state.registerMode ? 'Já possui conta ?' : 'Ainda não possui conta ?'}</Text>
            </TouchableOpacity>


        </View>
       


        return(

            <View style={{flex:1}}>
                {view}
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
    input:{
       
        marginTop: 20,
        width: '90%',
        borderRadius: 2,
        height: 40,
        padding: 10,
        backgroundColor: 'white'

    },
    textButtom:{
        fontSize: 20,
        color: '#FFF'
    },
    buttom:{
        backgroundColor: '#696969',
        marginTop: 20,
        padding: 5,
        width: '90%',
        borderRadius: 2,
        alignItems: 'center'


    },
    registerButtom:{
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    title:{
        fontSize: 50,
        fontFamily: 'shelter'
    }



})


const mapDispatchToProps = dispatch => {

    return{
    onLogin: user => dispatch(login(user)),
    onRegister : user => dispatch(createUser(user)),
    onNotLoading : () => dispatch(userloaded())
    }

}

const mapStateToProps =  ({user}) => {

    return {

        loading: user.loading,
        email: user.email,
        name: user.name
   
    }


}






export default connect(mapStateToProps, mapDispatchToProps)(Login)