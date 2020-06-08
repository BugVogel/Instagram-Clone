import {SET_POST, ADD_COMMENT, CREATING_POST, CREATED_POST} from '../actions/actionTypes'



const initialState = {

    posts: [],
    isUploading: false,

}

const reducer = (state = initialState, action) => {


    switch(action.type){

        case SET_POST : 
            return {
                ...state,
                posts: action.payload
            }

        case ADD_COMMENT :
            return{
                
                ...state,
                posts: state.posts.map(post => {
                   
                    if(post.id == action.payload.postId){
                        
                        if(post.comments){
                            console.log('entrou')
                            post.comments = post.comments.concat({
                                nickname: action.payload.nickname,
                                comment: action.payload.comment
                            })
                            
                        }
                        else{
                            post.comments = [{
                                nickname: action.payload.nickname,
                                comment: action.payload.comment
                            }]


                        }

                    }
                    return post

                })


            }

        case CREATING_POST: 
            return {
                ...state,
                isUploading: true
            }

        case CREATED_POST:
            return{
                ...state,
                isUploading: false
            }

        default: 
            return state


    }


}


export default reducer