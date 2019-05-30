import React, { Component } from 'react';

import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Platform, Text,ImageBackground } from 'react-native';
import { createDrawerNavigator,createStackNavigator,createAppContainer } from 'react-navigation';
import StoreProfile from './StoreProfile';
import AddToCart from './AddToCart';
import YourOrder from './YourOrder';
import CheckoutScreen from './CheckoutScreen';
import Help from './Help';
import AboutUs from './AboutUs';
import LogOut from './LogOut';
import SearchTab from './SearchTab';
import LoginScreen from '../LoginModule/LoginScreen';
import ViewDetailItem from './ViewDetailItem';
import CustomSidebarMenu from './CustomSidebarMenu';
import SelectCityScreen from '../MainModule/SelectCityScreen';
import SelectCityAreaScreen from '../MainModule/SelectCityAreaScreen';
import ChangePassword from './ChangePassword';
import Settings from './Settings';

global.currentScreenIndex = 0;

    class NavigationDrawerStructure extends Component {

      toggleDrawer = () => {

         this.props.navigationProps.toggleDrawer();

      };

      render() {

        return (

          <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
                   <Image  style={{width:25,height:25,marginLeft:10}} source={{uri:'https://www.controlf5.in/website-template/Consulting/images/sdf.png'}}/>
                </TouchableOpacity>

          </View>

        );

      }

     }

      const FirstActivity_StackNavigator = createStackNavigator({

       First: {
          screen: StoreProfile,
          navigationOptions: ({ navigation }) => ({
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#000000',
          }),
        },
      });


      const Screen2_StackNavigator = createStackNavigator({

        Second: {
          screen: YourOrder,
          navigationOptions: ({ navigation }) => ({
            title: 'Your orders',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

            headerStyle: {
              backgroundColor: '#FF9800',
            },
            headerTintColor: '#fff',
          }),
        },
      });


      const Screen3_StackNavigator = createStackNavigator({

        Third: {
          screen: Settings,
          navigationOptions: ({ navigation }) => ({
            title: 'Settings',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
              backgroundColor: '#FF9800',
            },
            headerTintColor: '#fff',
          }),
        },
      });

      const Screen4_StackNavigator = createStackNavigator({

        Fourth: {
          screen: Help,
          navigationOptions: ({ navigation }) => ({
            title: 'Help',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
              backgroundColor: '#FF9800',
            },
            headerTintColor: '#fff',
          }),
        },
      });

      const Screen5_StackNavigator = createStackNavigator({

        Fifth: {
          screen: AboutUs,
          navigationOptions: ({ navigation }) => ({
            title: 'About us',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
              backgroundColor: '#FF9800',
            },
            headerTintColor: '#fff',
          }),
        },
      });

      const Screen6_StackNavigator = createStackNavigator({

        Sixth: {
          screen: LogOut,
          navigationOptions: ({ navigation }) => ({
            title: 'LogOut',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
              backgroundColor: '#FF9800',
            },
            headerTintColor: '#fff',
          }),
        },
      });


       const drawerStack = createDrawerNavigator(

            {

              NavScreen1: {
                screen: FirstActivity_StackNavigator,
                navigationOptions: {
                  drawerLabel: 'Home',
                },
              },
              NavScreen2: {
                screen: Screen2_StackNavigator,
                navigationOptions: {
                  drawerLabel: 'View cart',
                },
              },
              NavScreen3: {
                screen: Screen3_StackNavigator,
                navigationOptions: {
                  drawerLabel: 'Settings',
                },
              },
              NavScreen4: {
                    screen: Screen4_StackNavigator,
                    navigationOptions: {
                      drawerLabel: 'Help',
                },
              },
              NavScreen5: {
                     screen: Screen5_StackNavigator,
                     navigationOptions: {
                       drawerLabel: 'About us',
                 },
               },
              NavScreen6: {
                screen: Screen6_StackNavigator,
                navigationOptions: {
                  drawerLabel: 'Log Out',
            },
          },  
            },
            {

              contentComponent: CustomSidebarMenu,

              drawerWidth: Dimensions.get('window').width - 130,
            }
          );

          const PrimaryNav = createStackNavigator({

             drawerStack: { screen: drawerStack },
             ViewDetailItem: { screen: ViewDetailItem},
             ChangePassword: {  screen: ChangePassword },
             AddToCart:{ screen: AddToCart},
             Checkout:{ screen: CheckoutScreen},
             SelectCity:{ screen: SelectCityScreen},
             SelectArea: {  screen: SelectCityAreaScreen},
             SearchTab:{screen: SearchTab},
             
           
            },
            {
                headerMode: 'none',

            },

          )

     export default createAppContainer(PrimaryNav);





