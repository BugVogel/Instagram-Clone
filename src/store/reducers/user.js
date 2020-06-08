import {USER_LOGGED_IN, USER_LOGGED_OUT, USER_LOADED, USER_LOADING} from '../actions/actionTypes'


const initialState = {
    name: null,
    email: null,
    loading: false,
    token: null
}


const reducer = ( state = initialState, action) => {


        

    switch(action.type){
        
        case USER_LOGGED_IN :
            return {
                ...state,
                name:  action.payload.name,
                email: action.payload.email,
                token: action.payload.token
            }
        case USER_LOGGED_OUT :
            return {
                ...initialState
            }
        
        case USER_LOADING:
            return{
                ...state,
                loading: true,
            }

        case USER_LOADED :
            return{
                ...state,
                loading: false
            }

        default: 
            return state


    }


}


export default reducer