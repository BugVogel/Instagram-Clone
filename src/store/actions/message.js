import { SET_MESSAGE, SET_POST} from './actionTypes'



export const setMessage = message =>{

    return {

        type: SET_MESSAGE,
        payload: message

    }
}


