import React, { Component } from 'react';
import { Button, View, Text,AppRegistry } from 'react-native';

import SplashScreen from './component/LoginModule/SplashScreen';
import LanguageScreen from './component/LoginModule/LanguageScreen';
import LoginScreen from './component/LoginModule/LoginScreen';
import SelectCityScreen from './component/MainModule/SelectCityScreen';
import MainMenuScreen from './component/MainModule/MainMenuScreen';
import SelectCityAreaScreen from './component/MainModule/SelectCityAreaScreen';
import StoreDetailTab from './component/TabModule/StoreDetailTab';
import LogIn from './component/LoginModule/LogIn';
import SignUp from './component/LoginModule/SignUp';
import ForgotPassword from './component/LoginModule/ForgotPassword';

import { createStackNavigator, createAppContainer } from 'react-navigation';

const RootStack = createStackNavigator(
    {
      LoginHome: {
        screen: LoginScreen,
      },
      SplashView: {
              screen: SplashScreen,
            },
      SelectLanguage: {
        screen: LanguageScreen,
      },
      SelectCity: {
        screen: SelectCityScreen,
      },
      StoreDetailTab: {
        screen: StoreDetailTab,
      },
      SelectArea: {
        screen: SelectCityAreaScreen,
      },
      MainMenuTab: {
        screen: MainMenuScreen,
      },

      LogIn: {
             screen: LogIn,
      },
      SignUp: {
         screen: SignUp,
      },

      ForgotPassword: {
         screen: ForgotPassword,
      },
  },
  {
    headerMode: 'none',
    initialRouteName: 'SplashView',
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

AppRegistry.registerComponent('reactTutorialApp', () => reactTutorialApp)

