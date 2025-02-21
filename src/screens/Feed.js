import React, {Component} from 'react'
import {View, StyleSheet, FlatList} from 'react-native'
import Header from '../components/Header'
import Post from '../components/Post'
import {connect} from 'react-redux'
import {getPosts} from '../store/actions/posts'




 class Feed extends Component {


    componentDidMount = () => {

        this.props.onGetPosts()

    }


    render(){


        return(
            <View style={styles.container}>
                <Header />
                <FlatList  data={this.props.posts} keyExtractor={item => `${item.id}`} renderItem={({item}) => <Post  key={item.id} {...item} />}/>

            </View>

        )

    }


}


const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF'
    }
    


})


const mapStateToProps = ({posts}) => {

    return {
        posts: posts.posts

    }

}


const mapDispatchToProps = dispatch => {


    return {

        onGetPosts: () =>  dispatch(getPosts())

    }

}


export default connect(mapStateToProps, mapDispatchToProps)(Feed)
