import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,TouchableOpacity,TextInput,FlatList,ToastAndroid
} from 'react-native';



export default class CheckoutScreen extends Component {

  constructor(props) {
    super(props);


     this.state = {
           dataSource:[],
           subtotal:'',
           shipping_total:'',
           total:'',
           shipping_tax:'',
           product_id:'',
           quantity:'',

         };
  }

  componentDidMount() {

      return fetch('https://controlf5.in/client-demo/groznysystems/wp-json/wc/v2/cart?consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96')
              .then((response) => response.json())

              .then((responseJson) => {

                    for(var j=0; j < responseJson.length; j++){
                
                      this.setState({

                        product_id: responseJson[j].product_id ,
                        quantity: responseJson[j].quantity ,
                      
                      });

                      break;
                        
                    }
                
                    this.setState({

                      dataSource: responseJson,
                    
                    });

              })
              .catch((error) => {
                console.error(error);
              });
   }


   _placeOrder = () => {

    const url =  "https://controlf5.in/client-demo/groznysystems/wp-json/wc/v2/orders?consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96";

      fetch(url, {
              method: 'POST',
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({
                  "payment_method": "bacs",
                  "payment_method_title": "Direct Bank Transfer",
                  "set_paid": true,
                  "billing": {
                  "first_name": "John",
                  "last_name": "Doe",
                  "address_1": "969 Market",
                  "address_2": "area",
                  "city": "San Francisco",
                  "state": "CA",
                  "postcode": "94103",
                  "country": "US",
                  "email": "john@example.com",
                  "phone": "(555) 555-5555"
                  },
                  "shipping": {
                  "first_name": "John",
                  "last_name": "Doe",
                  "address_1": "969 Market",
                  "address_2": "area",
                  "city": "San Francisco",
                  "state": "CA",
                  "postcode": "94103",
                  "country": "US"
                  },
                  "customer_id": 21,
                  "line_items": [
                  {
                  "product_id": this.state.product_id,
                  "quantity": this.state.quantity
                  }
                
                  ]
                  })
        })
      .then((response) => response.json()).then((responseJson) => {

            ToastAndroid.show('Your ordered is' +  responseJson.status , ToastAndroid.SHORT);   

            this.props.navigation.navigate('Second')   

      })
      .catch(error => {
        this.setState({ error, loading: false });
      });

}

   __cartTotal(){

         const url = 'https://controlf5.in/client-demo/groznysystems/wp-json/wc/v2/cart/totals' ;

              fetch(url)
                .then(res => res.json())
                .then(responseJson => {
                  console.log(responseJson,"responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
                   this.setState({

                        subtotal: responseJson.subtotal,
                        shipping_total:responseJson.shipping_total,
                        total:responseJson.total,
                        shipping_tax:responseJson.shipping_tax,
                        

                   });
                })
                .catch(error => {
                  this.setState({ error, loading: false });
                });

                return(
                  <View style={{backgroundColor:'#F5FCFF', flexDirection:'row', justifyContent: 'space-between',alignItems: 'center',}}>

                          <View style={{flex:1, justifyContent: 'flex-start', marginLeft:10}}>
                            <Text>Sub Total</Text>
                            <Text>Delivery Charges</Text>
                            <Text>Shipping tax</Text>
                          </View>

                         <View style={{flex:1, justifyContent: 'flex-end', alignItems:'flex-end', marginRight:10}}>
                            <Text>{this.state.subtotal}</Text>
                            <Text>{this.state.shipping_total}</Text>
                            <Text>{this.state.shipping_tax}</Text>
                         </View>

                  </View>

                )

   }

  render() {
    return (

        <View style={styles.container}>
        <ScrollView style={{ backgroundColor : "#DCDCDC"}}>
           <View style={{flexDirection:'row', justifyContent:'space-between', alignItems: 'center',backgroundColor:'white',marginTop:10,height:50}}>
             <View style={{flex: 1, flexDirection:'row',justifyContent: 'flex-start',}}>
               <Image  style={{width:25,height:25,marginLeft:15,}} source={{uri:'https://www.controlf5.in/website-template/Consulting/images/Bag.png'}}/>
               <Text style={styles.name}>Items </Text>
             </View>
           </View>
          <ScrollView horizontal = { true } showsHorizontalScrollIndicator = { false }>
           <View style={styles.photosCard}>
            <View style={styles.photosContainer}>


                   <FlatList
                         contentContainerStyle={styles.listContainer}
                         data={this.state.dataSource}
                         horizontal={true}

                         keyExtractor={({id}, index) => id}

                         renderItem={({item}) => {

                           return (

                                 <View style={styles.card}>

                                     <TouchableOpacity>

                                        <View>

                                            <Image style={styles.photo} source={{uri: item.product_image}} />

                                        </View>

                                     </TouchableOpacity>

                                  </View>

                               )
                             }
                          }
                       />

             </View>
             </View>
         </ScrollView>

        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems: 'center',backgroundColor:'white',marginTop:10,height:50}}>
          <View style={{flex: 1, flexDirection:'row',justifyContent: 'flex-start',}}>
            <Image  style={{width:25,height:25,marginLeft:15,}} source={{uri:'https://www.controlf5.in/website-template/Consulting/images/Wallet.png'}}/>
          <Text style={styles.name}>Cash On Delivery </Text>
          </View>
         </View>

          <View style={[styles.card, styles.profileCard]}>

                  {this.__cartTotal()}

         </View>

         <View style={[styles.card1, styles.profileCard1,styles.gap,]}>

           <View style={{backgroundColor:'#F5FCFF', flexDirection:'row', justifyContent: 'space-between',alignItems: 'center',}}>

            <View style={{flex:1, justifyContent: 'flex-start', marginLeft:10}}>
              <Text style={{fontWeight: "bold",color:'black'}}> Total</Text>
            </View>

           <View style={{flex:1, justifyContent: 'flex-end', alignItems:'flex-end', marginRight:10}}>
             <Text>{this.state.total}</Text>
           </View>

          </View>
        </View>


       <View style={{flexDirection:'row', justifyContent:'space-between', alignItems: 'center',backgroundColor:'white',marginTop:5,height:50}}>
         <View style={{flex: 1, flexDirection:'row',justifyContent: 'flex-start',}}>
            <Image  style={{width:25,height:25,marginLeft:15,}} source={{uri:'https://www.controlf5.in/website-template/Consulting/images/Map.png'}}/>
          <Text style={styles.name}>Address</Text>
         </View>
      </View>


<View style={styles.containeradd}>
    <View style={styles.rowadd}>
      <View style={styles.inputWrapadd}>
        <View style={styles.inputContainer2add}>
        <TextInput style={styles.inputs2add}  onChangeText={(f_name) => this.setState({first_name: f_name})}
        placeholder="PinCode"   />

       </View>
      </View>

    <View style={styles.inputWrapadd}>
      <View style={styles.inputContainer2add}>
        <TextInput style={styles.inputs2add} onChangeText={(l_name) => this.setState({last_name: l_name})}
          placeholder="State"
          />
      </View>
     </View>
     </View>

  <View style={styles.row3add}>
     <View style={styles.inputContainer3add}>
       <TextInput style={styles.inputs3add} onChangeText={(e_mail) => this.setState({email: e_mail})}
       placeholder="Address(Home No,Building,Streat,Area)"
       />
      </View>
  </View>

  <View style={styles.row3add}>
     <View style={styles.inputContainer3add}>
       <TextInput style={styles.inputs3add} onChangeText={(pswd) => this.setState({password: pswd})}
       placeholder="Locality/Town"/>
     </View>
 </View>
 <View style={styles.row3add}>
      <View style={styles.inputContainer3add}>
        <TextInput style={styles.inputs3add} onChangeText={(pswd) => this.setState({password: pswd})}
        placeholder="City/District"/>
      </View>
  </View>


  </View>


      <View style={styles.addToCarContainer}>
       <TouchableOpacity style={styles.shareButton} onPress={this._placeOrder}  >
       <Text style={styles.shareButtonText}>Place Order</Text>
       </TouchableOpacity>
      </View>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor : "#DCDCDC"
  },
  gap:{
  marginTop:5,
  },
  cardTittle:{
    color:"#808080",
    fontSize:22,
    marginBottom:5,
  },
  avatar:{
    width:150,
    height:150,
  },
  card:{
    backgroundColor: "#FFFFFF",
    borderRadius:10,
    padding:10,
    height:100,
    marginTop:5,
  },
  profileCard:{
    height:100,
    alignItems: 'center',
    marginTop:5,
  },
   card1:{
      backgroundColor: "#FFFFFF",
      borderRadius:10,
      padding:10,
      height:100,
      marginTop:5,
    },
    profileCard1:{
      height:30,
      alignItems: 'center',
    },
  name:{
    marginTop:5,
    fontSize:16,
    color:'black',
    marginLeft:10,
    fontWeight: "bold"
  },
  photosContainer:{
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    flexWrap: 'wrap',
    height: 'auto',
    backgroundColor:'white',
  },
  photosCard:{
    marginTop:5,
    backgroundColor:'white',
  },
  photo:{
    width:100,
    height:80,
    marginTop:2,
    marginRight:2,
    marginBottom:2,
    marginLeft:2
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
    containeradd:{
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor:'white',
         marginTop:10

     },
      rowadd: {
        flex: 1,
        flexDirection: "row",
        marginTop:10,

      },
        row5: {
          flex: 1,
          flexDirection: "row",
          marginTop:10,
        },
     row1add: {
          flex: 1,
          flexDirection: "row",
          padding:5,
        },
     row2add: {
            flex: 1,
            flexDirection: "row",
          },

     row3add: {
             flex: 1,
             flexDirection: "row",
             marginTop:10,
           },
          inputContainer3add: {
                  borderBottomColor: '#F5FCFF',
                  backgroundColor: '#FFFFFF',
                  borderBottomWidth: 1,
                  width: '100%',
                  height:45,
                  flexDirection: 'row',

                  shadowColor: "#808080",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.10,
                  shadowRadius: 1.15,

                  elevation: 1,
                },
                inputs3add:{
                  height:45,
                  borderBottomColor: '#FFFFFF',
                  flex:1,
                },

     row4add: {
        flex: 1,
        flexDirection: "row",
         padding:5,
          },
      inputWrapadd: {
        flex: 1,
      },
       inputIconadd:{
          width:100,
          height:50,
          marginLeft:5,
        },
      inputContaineradd: {
            borderBottomColor: '#F5FCFF',
            backgroundColor: '#FFFFFF',
            borderBottomWidth: 1,
            marginLeft:-75,
            marginTop:2,
            width:280,
            height:45,
            flexDirection: 'row',

            shadowColor: "#808080",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.10,
            shadowRadius: 1.15,

            elevation: 1,
          },
          inputsadd:{
            height:45,
            borderBottomColor: '#FFFFFF',
            flex:1,
          },
         inputContainer2add: {
               borderBottomColor: '#F5FCFF',
               backgroundColor: '#FFFFFF',
               borderBottomWidth: 1,
               marginTop:2,
               marginLeft:5,
               width:'95%',
               height:45,
               flexDirection: 'row',

               shadowColor: "#808080",
               shadowOffset: {
                 width: 0,
                 height: 1,
               },
               shadowOpacity: 0.10,
               shadowRadius: 1.15,

               elevation: 1,
             },
             inputs2add:{
               height:45,
               borderBottomColor: '#FFFFFF',
               flex:1,
             },


          headeradd:{
              backgroundColor: 'black',
            },
          inputContainer1add: {
                 borderBottomColor: '#F5FCFF',
                 backgroundColor: '#FFFFFF',
                 borderBottomWidth: 1,
                 marginTop:2,
                 width:280,
                 height:45,
                 flexDirection: 'row',

                 shadowColor: "#808080",
                 shadowOffset: {
                   width: 0,
                   height: 1,
                 },
                 shadowOpacity: 0.10,
                 shadowRadius: 1.15,

                 elevation: 1,
               },
               inputs1add:{
                 height:45,
                 borderBottomColor: '#FFFFFF',
                 flex:1,
               },
         buttonContaineradd: {
                height:45,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom:10,
                padding:10,
                width:'90%',
                marginTop:100,

                backgroundColor:'transparent'
              },
              loginButtonadd: {
                  backgroundColor: "#421a8d",
                  marginBottom:30,

                  shadowColor: "#421a8d",
                  shadowOffset: {
                    width: 0,
                    height: 9,
                  },
                  shadowOpacity: 0.50,
                  shadowRadius: 12.35,

                  elevation: 3,
                },
                loginTextadd: {
                    color: 'white',
                  },
                   questioniconadd:{
                      width:30,
                      height:30,
                    },
          buttonContainer1add: {
            height:45,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:30,
            width:'80%',
            backgroundColor:'transparent'
          },
            fbButoonadd: {
              backgroundColor: "#36579b",

              shadowColor: "#36579b",
              shadowOffset: {
                width: 0,
                height: 9,
              },
              shadowOpacity: 0.50,
              shadowRadius: 12.35,

              elevation: 9,
            },
            fbText: {
              color: 'white',
              fontSize: 18,
            },
              iconadd:{
                  width:30,
                  height:30,
                  marginRight:20,
                },
});