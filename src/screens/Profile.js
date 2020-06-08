import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, FlatList} from 'react-native'
import {Gravatar} from 'react-native-gravatar'
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import {logout} from '../store/actions/user'


 class Profile extends Component {


    state = {

        myPosts: true,
        markedPosts: false,
        imageSources: 
        [
        require('../../assets/imgs/boat.jpg'),
        require('../../assets/imgs/bw.jpg'),
        require('../../assets/imgs/fence.jpg'),
        require('../../assets/imgs/gate.jpg'),
        require('../../assets/imgs/fence.jpg'),
        require('../../assets/imgs/boat.jpg'),
        require('../../assets/imgs/gate.jpg'),
        require('../../assets/imgs/fence.jpg'),
        require('../../assets/imgs/bw.jpg'),
        require('../../assets/imgs/boat.jpg'),
        ]
    }


    logout = () => {

        this.props.navigation.navigate('Auth')


    }

    getMyPosts = () => {

        this.setState({myPosts: true, markedPosts: false})
        console.log(this.props.name)

    }

    getMarkedPosts = () => {

        this.setState({myPosts: false, markedPosts: true})
    }


    
    render(){
        const options = { email: this.props.email, secute:true}

        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.logout}>
                        <Icon name={"sign-out"} size={20} color={"#D0D0D0"}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerConfig}>
                    <View style={styles.info}>
                        <Gravatar options={options} style={styles.avatar}/>
                        <View>
                            <Text style={styles.infoNum}>19</Text>
                            <Text style={styles.profileText}>Publicações</Text>
                        </View>
                        <View>
                            <Text style={styles.infoNum}>786</Text>
                            <Text style={styles.profileText}>Seguidores</Text>
                        </View>
                        <View>
                            <Text style={styles.infoNum}>614</Text>
                            <Text style={styles.profileText}>Seguindo</Text>
                        </View>
                    </View>
                    <View style={styles.bio}>
                        <Text style={styles.nickName} >{this.props.name}</Text>
                        <Text style={styles.profileText}>Engenharia de Computação - UEFS ({this.props.email})</Text>
                    </View>
                    <TouchableOpacity style={styles.editButtom}>
                        <Text style={styles.textButtomEdit}>Editar Perfil</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.postsContainer}>
                    <View style={styles.postOptions}>
                        <View style={[styles.buttomPost,this.state.myPosts ? styles.buttomPostSelected : {}]}>
                            <TouchableOpacity onPress={this.getMyPosts} ><Icon name={"user"} size={23}  color={"#D0D0D0"} /></TouchableOpacity>
                        </View>
                        <View style={[styles.buttomPost, this.state.markedPosts ? styles.buttomPostSelected : {} ]}>
                            <TouchableOpacity onPress={this.getMarkedPosts}><Icon name={"users"} size={23} color={"#D0D0D0"} /></TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.postsPhotos}>
                        <FlatList numColumns={3}  data={this.state.imageSources} keyExtractor={item => `${item}`} renderItem={({item}) =>
                        <TouchableOpacity style={styles.photo}> 
                            <Image style={styles.photoPost} source={item}/>
                        </TouchableOpacity> }/>
                    </View>
                </View>

            </View>



        )

    }



}


const styles = StyleSheet.create({

    container: {
        flex:1,

    },
    info:{
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal:10,
       
    },
    infoNum: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    profileText:{
        fontSize: 13,
        color: '#444'
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 25,
        
    },
    bio:{
        marginHorizontal: 10,
        marginTop: 10,

    },
    nickName:{
        fontWeight: 'bold',
        fontSize: 15
    },
    editButtom: {
        marginTop: 10,
        marginHorizontal: 10,
        borderColor: '#D0D0D0',
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'center',
        padding: 5
    },
    postsContainer:{
        flex:2,
        borderWidth: 1,
        borderColor: '#D0D0D0',
        marginTop: 10
    },
    containerConfig: {
        flex:1,
    },

    buttomPostSelected: {
        borderBottomColor: '#505050',
        borderBottomWidth: 1,
        
    },
    buttomPost:{
        flex:1, 
        alignItems:'center', 
        padding:5
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
        marginHorizontal: 15,
    },
    photoPost:{
        height: 100,
        width: Dimensions.get('window').width /3,
      
    },
    postsPhotos:{
        flex:1,
    },
    postOptions:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,

    },
    photo: {
        margin:1,
        marginLeft:0,
        marginBottom:0,
        
        
    }




})


const mapStateToProps = ({user}) => {

    return {
        email: user.email,
        name: user.name
    }

}


const mapDispatchToProps = dispatch => {

    return {
    onLogout: () => dispatch(logout())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Profile)