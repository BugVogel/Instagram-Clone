import {SET_POST, ADD_COMMENT, CREATED_POST, CREATING_POST} from './actionTypes'
import {setMessage} from '../actions/message'
import axios from 'axios'







export const addPost = post => {

        return async  (dispatch, getState) => {

            
            dispatch(creatingPost())
            axios({

                url: 'uploadImage',
                baseURL: 'https://us-central1-lambe-f625f.cloudfunctions.net',
                method: 'post',
                data:{
                    image: post.source.base64

                }

            })
            .catch(  err =>  dispatch(setMessage({
                title: 'Ops',
                text: 'Não foi possível realizar o upload da imagem'

            })))
            .then( res => {

               

                post.source = res.data.imageUrl

                axios.post(`/posts.json?auth=${getState().user.token}`, { ...post})
                .catch( err =>  dispatch(setMessage({
                    title: 'Ops!',
                    text: 'Não foi possível realizar o seu post'

                })))
                .then( res => {
                    dispatch(createdPost())
                    dispatch(getPosts())
                    }
                )


            })

        }

       // return{
       //     type:ADD_POST,
       //     payload: post
       // }

}


export const addComment = payload => {




    return (dispatch, getState) => {

        axios.get(`/posts/${payload.postId}.json`)
        .catch( err =>   dispatch(setMessage({
            title: 'Ops!',
            text: 'Houve um problema'

        })))
        .then( res => {

          

            
            const comments = res.data.comments || []

            comments.push({
                nickname: payload.nickname,
                comment: payload.comment
            })
            
            axios.patch(`/posts/${payload.postId}.json?auth=${getState().user.token}`, {comments})
            .catch(  err =>  dispatch(setMessage({
                title: 'Ops!',
                text: 'Não foi possível comentar'

            })))
            .then( res => {

                dispatch(getPosts())

            })

            

        })

       // type: ADD_COMMENT,
        //payload

    }

}


export const setPosts = payload => {

    return {

        type: SET_POST,
        payload

    }

}


export const getPosts = () => {


    return dispatch => {

        axios.get('posts.json')
            .catch(  err =>  dispatch(setMessage({
                title: 'Ops!',
                text: 'Houve um problema na tela de feed'

            })))
            .then( res => {

                const rowPosts = res.data
                let posts = []
                for(let key in rowPosts){
                    posts.push({
                        ...rowPosts[key],
                        id: key
                    })

                }

                dispatch(setPosts(posts.reverse()))

            })

    }



}



export const creatingPost = () => {
        return{
            type: CREATING_POST
        }
}

export const createdPost = () => {

    return{
        type: CREATED_POST
    }

}