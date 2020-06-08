import {USER_LOGGED_IN, USER_LOGGED_OUT, USER_LOADING, USER_LOADED} from './actionTypes'
import axios from 'axios'
import {setMessage} from './message'



const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'

const API_KEY = 'AIzaSyDscYbPihZWrSYzn3mFCj8nNIo0DjHd5MA'




export const userLogged = user => {

    return{
        type: USER_LOGGED_IN,
        payload: user
    }


} 

export const login = user => {

    return  dispatch => {

        dispatch(userLoading())
        
        axios.post(`${authBaseURL}/verifyPassword?key=${API_KEY}`, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
        .catch(  err =>{ dispatch(setMessage({
                    title: 'Opa',
                    text: 'Não foi possivel realizar o login, verifique suas credenciais'

        }))
    
    })
        .then( res => {

            if(res.data.localId){
                user = {
                    ...user,
                    token: res.data.idToken
                }
                axios.get(`/users/${res.data.localId}.json`)
                .catch( err =>  {dispatch(setMessage({
                    title: 'Ops!',
                    text: 'Usuário não encontrado'

                }))
              
            })
                .then( res => {

                   
                    user.password = null,
                    user.name = res.data.name
                    

                    dispatch(userloaded())
                    dispatch(userLogged(user))
                 

                })

            }


        })



    }
}

export const logout = () =>{

    return{
        type: USER_LOGGED_OUT
    }

}



export const createUser = user =>{

    return  dispatch => {

        /*
        axios({

            baseUrl: `${authBaseURL}`,
            url: `signupNewUser?key=${API_KEY}`,
            method: 'post',
            data: {
                email: user.email,
                password: user.password,
                returnSecureToken : true
            }


        }) */
        axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`, {
                email: user.email,
                password: user.password,
                returnSecureToken : true
        })
        .catch(err =>    dispatch(setMessage({
                        title: 'Ops!',
                        text: 'Não foi possivel realizar o cadastro, utilize um email válido e senha com no mínimo 6 dígitos'

        })))
        .then( res => {

            
            if(res.data.localId){


                axios.put(`/users/${res.data.localId}.json`, {
                    name: user.name
                })
                .catch(  err => dispatch(setMessage({
                            title: 'Ops',
                            text: 'Cadastro não foi completo, aconteceu um erro inesperado'

                })))
                .then( res => {
    
                    dispatch(setMessage({
                        title:`Bem vindo ${user.name}!`,
                        text: 'Cadastro realizado com sucesso!'

                    }))
    
                })
                
            }

        })



    }


}


export const userloaded = () => {
    return{
        type: USER_LOADED
    }
}


export const userLoading = () => {
    return{

        type: USER_LOADING
    }

}