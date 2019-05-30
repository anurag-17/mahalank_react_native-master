import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet, Text, View} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import AboutUs from '../TabModule/AboutUs';
import NavigationDrawerStructure from '../TabModule/NavigationDrawerStructure';
import CustomerProfile from '../TabModule/CustomerProfile';
import SearchTab from '../TabModule/SearchTab';
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from 'react-native';

class MainMenuScreen extends Component {
  
    render() {

        const { navigation } = this.props;
        const storeId = navigation.getParam('store_id', '0');
        console.log(storeId,"store idddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
        const store_name = navigation.getParam('store_name', '');
        console.log(store_name,"store nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        const banner = navigation.getParam('banner', '');
        console.log(banner,"baneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
        const RootStack = createBottomTabNavigator(

             {
               StoreProfile:{
                screen:NavigationDrawerStructure,
                params:{id:storeId},
                params:{store_name:store_name},
                navigationOptions:{
                  tabBarLabel:'Home',
                  tabBarIcon:({tintColor})=>(
                      <Icon name="ios-home" color={tintColor} size={25}/>
                  )
                }
              },
              Search:{
                    screen:SearchTab,
                    params:{id:storeId},
                    navigationOptions:{
                      tabBarLabel:'Search',
                      tabBarIcon:({tintColor})=>(
                          <Icon name="ios-search" color={tintColor} size={25}/>
                      )
                    }
              },
              Aboutus:{
                      screen:AboutUs,
                      navigationOptions:{
                        tabBarLabel:'About us',
                        tabBarIcon:({tintColor})=>(
                            <Icon name="ios-more" color={tintColor} size={25}/>
                        )
                      }
              },
              CustomerProfile: {
                screen:CustomerProfile,
                navigationOptions:{
                  tabBarLabel:'Profile',
                  tabBarIcon:({tintColor})=>(
                      <Icon name="ios-person" color={tintColor} size={25}/>
                  )
                }
              },
            },
            {
              initialRouteName: "StoreProfile"
            },
        );


        const styles = StyleSheet.create({
              container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              },
            });


        const AppContainer = createAppContainer(RootStack);

        return <AppContainer />;
    }

  }


  export default withNavigation(MainMenuScreen);





