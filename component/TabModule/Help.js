import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Help extends Component {
  constructor(props) {

    super(props);

    this.state = {


    }

  }



  componentDidMount() {

    return fetch('https://controlf5.in/client-demo/groznysystems/wp-json/wc/v2/cart?consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96')
      .then((response) => response.json())
      .then((responseJson) => {

        console.log(responseJson, "ssssssssssssssssssssssrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")

        this.setState({

          // dataSource: responseJson,


        });

      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 23 }}> Help</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
});