import React from 'react'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createAppContainer, createSwitchNavigator, createStackNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import Splash from './screens/Splash'
import Feed from './screens/Feed'
import AddPhoto from './screens/AddPhoto'
import Profile from './screens/Profile'
import Login from './screens/Login'


const loginOrProfileRouter = createSwitchNavigator({
    Profile: Profile,
    Auth: Login
}, {
    initialRouteName: 'Auth'

})


const MenuRoutes = {

    Feed: {
        name: 'Feed',
        screen:Feed,
        navigationOptions: {
            title: 'Feed',
            tabBarIcon: ({tintColor}) => <Icon name={"home"} size={30} color={tintColor}/>
        }
    },
    Add: {
        name: 'Add',
        screen: AddPhoto,
        navigationOptions: {
            title: 'Add',
            tabBarIcon: ({tintColor}) => <Icon name={"camera"} size={30} color={tintColor}/>
        }
    },
    Profile: {
        name: 'Profile',
        screen: loginOrProfileRouter,
        navigationOptions: {
            title: 'Profile',
            tabBarIcon: ({tintColor}) => <Icon name={"user"} size={30} color={tintColor}/>,
            
            
        }
    }


}


loginOrProfileRouter.navigationOptions = ({navigation}) => {

    let tabBarVisible = true
    
    if(navigation.state.routes[navigation.state.index].routeName == 'Auth'){
        
        tabBarVisible = false
    }

    return{
        tabBarVisible,
    }

}





const MenuConfig = {

    initialRouteName: 'Profile',
    tabBarOptions: {
        showLabel: false,
    }

}

const MenuNavigator = createBottomTabNavigator(MenuRoutes,MenuConfig)


const SplashRouter =  createSwitchNavigator({

    Splash: Splash,
    App: createAppContainer(MenuNavigator)
},{
    initialRouteName: 'Splash'
})



export default  createAppContainer(SplashRouter)