import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet,FlatList,Image,ScrollView ,ToastAndroid} from "react-native";
import { Container, Header, Content, SwipeRow, Icon, Button } from 'native-base';
import PropTypes from "prop-types";

export default class AddToCart extends Component {
  constructor(props) {
    super(props);

      this.state = {

          number: this.props.start,
          dataSource:[]
    };

    // bind functions..
    this.onPressMinus = this.onPressMinus.bind(this);
    this.onPressPlus = this.onPressPlus.bind(this);
  }

  componentDidMount() {

    return fetch('https://controlf5.in/client-demo/groznysystems/wp-json/wc/v2/cart?consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96')
            .then((response) => response.json())
            .then((responseJson) => {

                 console.log(responseJson,"response view cart ")

                  this.setState({

                    dataSource: responseJson,


                  });

            })
            .catch((error) => {
              console.error(error);
            });
   }

  onPressMinus() {
    const { number } = this.state;
    const minusNumber = number - 1;

    if (number == this.props.min) {
      return;
    }


    return this.setState({ number: minusNumber }, () =>
      this.props.onChange(minusNumber, "-")
    );
  }

  onPressPlus() {
    const { number } = this.state;
    const plusNumber = number + 1;

    if (number == this.props.max) {
      return;
    }

    return this.setState({ number: plusNumber }, () =>
      this.props.onChange(plusNumber, "+")
    );
  }

  renderMinusButton() {
    const {
      min,
      touchableDisabledColor,
      touchableColor,
      minusIcon
    } = this.props;
    const isMinusDisabled = min == this.state.number;
    const buttonStyle = {
      borderColor: isMinusDisabled ? touchableDisabledColor : touchableColor
    };

    return (
      <TouchableOpacity
        style={[Styles.touchable, buttonStyle]}
        onPress={this.onPressMinus}
        activeOpacity={isMinusDisabled ? 0.9 : 0.2}
      >
        {this.props.minusIcon ? (
          this.props.minusIcon(
            isMinusDisabled,
            touchableDisabledColor,
            touchableColor
          )
        ) : (
          <Text
            style={[
              Styles.iconText,
              {
                color: isMinusDisabled ? touchableDisabledColor : touchableColor
              }
            ]}
          >
             -
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  renderPlusButton() {
    const {
      max,
      touchableDisabledColor,
      touchableColor,
      plusIcon
    } = this.props;
    const isPlusDisabled = max == this.state.number;
    const buttonStyle = {
      borderColor: isPlusDisabled ? touchableDisabledColor : touchableColor
    };

    return (
      <TouchableOpacity
        style={[Styles.touchable, buttonStyle]}
        onPress={this.onPressPlus}
        activeOpacity={isPlusDisabled ? 0.9 : 0.2}
      >
        {this.props.plusIcon ? (
          this.props.plusIcon(
            isPlusDisabled,
            touchableDisabledColor,
            touchableColor
          )
        ) : (
          <Text
            style={[
              Styles.iconText,
              {
                color: isPlusDisabled ? touchableDisabledColor : touchableColor
              }
            ]}
          >
            +
          </Text>
        )}
      </TouchableOpacity>
    );
  }

 removeItem(key) {

      const url = "https://controlf5.in/client-demo/groznysystems/wp-json/wc/v2/cart/add?consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96";

               fetch(url, {
                       method: 'DELETE',
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            "cart_item_key": key,

                          })
                 })
               .then((response) => response.json()).then((responseJson) => {

                            let data = this.state.dataSource
                            data = data.filter((item) => item.key !== key)
                            this.setState({
                              dataSource: data,
                            })

                         ToastAndroid.show('Your item is deleted!', ToastAndroid.SHORT);

               })
               .catch(error => {
                 this.setState({ error, loading: false });
               });


  }

  updateItem(key){
         const url = "https://controlf5.in/client-demo/groznysystems/wp-json/wc/v2/cart/cart-item?consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96";

                    fetch(url, {
                            method: 'POST',
                               headers: {
                                 'Accept': 'application/json',
                                 'Content-Type': 'application/json',
                               },
                               body: JSON.stringify({
                                 "cart_item_key": key,
                                 "quantity":'1'

                               })
                      })
                    .then((response) => response.json()).then((responseJson) => {

                              ToastAndroid.show('Your item is Updated!', ToastAndroid.SHORT);

                    })
                    .catch(error => {
                      this.setState({ error, loading: false });
                    });
  }

  __Clear = () => {

    fetch("https://controlf5.in/client-demo/groznysystems/wp-json/wc/v2/cart/clear?consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {

        ToastAndroid.show('Cart is cleared !', ToastAndroid.SHORT);

        this.props.navigation.navigate('Checkout')

      })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {
    const { number } = this.state;

    return (
    <ScrollView>
     <View>
     <Content scrollEnabled={false}>
     <FlatList
                 data={this.state.dataSource}
                 renderItem={({ item }) => <SwipeRow
                   leftOpenValue={75}
                   rightOpenValue={-75}
                   left={
                     <Button success onPress={() => this.updateItem(item.key)} >
                       <Icon active name="add" />
                     </Button>
                   }
                   body={
                    
                      <View style={{flex:1,flexDirection:'row'}}>

                      <TouchableOpacity   onPress={() => this.props.navigation.navigate('ViewDetailItem', {
                                                                                            product_id: item.product_id,
                                                                                            product_image:item.product_image,
                                                                                                          })}>

                       <Image style={Styles.image} source={{uri: item.product_image}}/>

                    </TouchableOpacity>

                        <View style={Styles.boxContent}>
                           <Text style={Styles.title}>{item.product_name}</Text>
                           <View style={Styles.container}>

                               <View><Text style={Styles.text} >Quantity : </Text></View>
                               <View style={Styles.number}>
                                        <Text style={[Styles.text, { color: this.props.textColor }]}>{item.quantity}</Text>
                               </View>
                               <View><Text  style={Styles.text}>Price : 14 $</Text></View>
                           </View>
                        </View>


                     </View>
                   }
                   right={
                     <Button danger onPress={() => this.removeItem(item.key)}>
                       <Icon active name="trash" />
                     </Button>
                   }
                 />}
               />

             </Content>

             <View style={Styles.addToCarContainer}>
               <TouchableOpacity style={Styles.shareButton} onPress={() => this.props.navigation.navigate('Checkout')} >
               <Text style={Styles.shareButtonText}>Checkout Now</Text>
               </TouchableOpacity>
             </View>
            
           </View>
</ScrollView>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
     marginTop:20,
    flexDirection: "row"
  },
box: {
    padding:20,
    marginTop:5,
    marginBottom:5,
    backgroundColor: 'white',
    flexDirection: 'row',
  },

  text: {
    fontSize: 14,
    marginLeft:10,

  },
   image: {
      width:90,
      height:80,
    },
      boxContent: {
        flex:1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft:10,
      },
      description:{
        marginTop:10,
        fontSize:15,
        color: "#646464",
      },
      title:{
        fontSize:18,
        color:"#151515",
      },

   product_name: {
      fontSize: 20,
      paddingLeft: 15,
      paddingRight: 15,
      marginTop:5
    },

  iconText: {
    fontSize: 22,
    marginTop: -3
  },

  number: {
    minWidth: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  shareButton: {
          marginTop:10,
          height:45,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: "#421a8d",
          marginBottom:20,
        },
        shareButtonText:{
          color: "#FFFFFF",
          fontSize:20,
        },
        addToCarContainer:{
          marginHorizontal:10
        },

  touchable: {
    width: 35,
    height: 26,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  }
});

AddToCart.propTypes = {
  start: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,

  textColor: PropTypes.string,
  touchableColor: PropTypes.string,
  touchableDisabledColor: PropTypes.string,

  minusIcon: PropTypes.func,
  plusIcon: PropTypes.func
};

AddToCart.defaultProps = {
  start: 0,
  min: 0,
  max: 10,
  onChange(number, type) {
    // Number, - or +
  },
   shareButton: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#421a8d",
        marginBottom:20,
      },
      shareButtonText:{
        color: "#FFFFFF",
        fontSize:20,
      },
      addToCarContainer:{
        marginHorizontal:10
      },

  textColor: "#196583",
  touchableColor: "#27AAE1",
  touchableDisabledColor: "#B5E9FF",

  minusIcon: null,
  plusIcon: null
};