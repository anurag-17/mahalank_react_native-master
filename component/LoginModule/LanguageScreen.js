// import React, { Component } from "react";
// import { Platform, StyleSheet, View, Button, Picker, Alert,Text } from "react-native";

// export default class LanguageScreen extends Component {

//   constructor(){
//      super();
//      this.state={
//        PickerSelectedVal : ''
//      }
//    }

//   //  getSelectedPickerValue=()=>{
//   //     Alert.alert("Selected country is : " +this.state.PickerSelectedVal);
//   //   }


//   render() {
//     return (
//       <View style={styles.container}>
//       <Picker
//            selectedValue={this.state.PickerSelectedVal}
//            onValueChange={(itemValue, itemIndex) => this.setState({PickerSelectedVal: itemValue})} >

//            <Picker.Item label="English" value="English" />
//            <Picker.Item label="Arabic" value="Arabic" />


//          </Picker>

//          <Button color="#421a8d" title="Select Your Language" onPress={() => this.props.navigation.navigate('SelectCity')} />
//       </View>
//     );
//   }

// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     margin :30
//   },
//   color:{
//     backgroundColor: "#421a8d"
//   }
// });


import React, { Component } from "react";
import { Platform, StyleSheet, View, Button, Picker, Alert, Text,AsyncStorage} from "react-native";

export default class LanguageScreen extends Component {

  constructor() {
    super();
    this.state = {
      PickerSelectedVal: ''
    }
  }

  //  getSelectedPickerValue=()=>{
  //     Alert.alert("Selected country is : " +this.state.PickerSelectedVal);
  //   }
  setlog = () => {
    AsyncStorage.setItem('session_is', '');
    AsyncStorage.clear();
    AsyncStorage.setItem('user_email', '')
    AsyncStorage.setItem('ID', '')
    this.props.navigation.navigate('LoginHome')
  }
  Logout = () => {
    Alert.alert(
      '',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', onPress: () => { cancelable: false }, style: 'cancel' },
        { text: 'OK', onPress: () => this.setlog() },
      ],
      { cancelable: false }
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.state.PickerSelectedVal}
          onValueChange={(itemValue, itemIndex) => this.setState({ PickerSelectedVal: itemValue })} >
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Arabic" value="Arabic" />
        </Picker>

        <Button color="#421a8d" title="Select Your Language" onPress={() => this.props.navigation.navigate('SelectCity')} />
        <Button color="#421a8d" title="Log out" onPress={() => this.Logout()} />


      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 30
  },
  color: {
    backgroundColor: "#421a8d"
  }
});