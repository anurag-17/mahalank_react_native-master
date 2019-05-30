import React, { Component } from 'react';

import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ScrollView, FlatList, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from 'react-native';
class StoreProfile extends Component {

  constructor(props) {

    super(props);

    this.state = {
      storeid: '',
      isLoading: true,
      categorydata: [],
      product_id: '',



      store_name:'',
      banner:'',
      id:'',

      dataSource: {},
      hasCategories: false,


    };

    //       storeid = this.props.navigation.state.params.id ;
    this.makeCategoryRequest()


    AsyncStorage.getItem('banner').then(asyncStorageRes => {
      console.log(asyncStorageRes, "baneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer")
      this.setState({

        banner: asyncStorageRes

      });

    });

    AsyncStorage.getItem('store_name').then(asyncStorageRes => {
      console.log(asyncStorageRes, "store nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
      this.setState({

        store_name: asyncStorageRes

      });

    });



  }

  makeCategoryRequest = () => {

    const url = "https://controlf5.in/client-demo/groznysystems/wp-json/dokan/v1/stores/category";

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "storeid": '5'
      })
    })
      .then((response) => response.json()).then((responseJson) => {

        this.setState({

          isLoading: false,
          categorydata: responseJson.data,
        });

        this._fetchProducts(responseJson.data);
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });

  }

  async _fetchProducts(categories) {


    for (var i = 0; i < categories.length; i++) {

      const url = 'https://controlf5.in/client-demo/groznysystems/wp-json/dokan/v1/stores/5/products?cat_id=' + categories[i].id;


      let response = null;
      let responseJson = null;


      try {
        response = await fetch(url);
        responseJson = await response.json();
      } catch (error) {
        console.log(error);
        this.setState({ error, loading: false });
        return;
      }


      let newData = this.state.dataSource;

      newData["c" + categories[i].id] = responseJson;
      this.setState({
        isLoading: false,
        dataSource: newData,
      });

      if (i == categories.length - 1) {

        this.setState({
          hasCategories: true
        })
      }
    }

  }

  __renderCategories = () => {

    return (
      <ScrollView>
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={this.state.categorydata}
            horizontal={false}

            keyExtractor={({ id }, index) => id.toString()}

            renderItem={({ item }) => {

              let i = 0;
              return (

                <View style={styles.categorycard} key={i++}>
                  <View style={styles.cardContent}>

                    <Text style={styles.categoryname}> {item.name} </Text>

                    <View>

                      {this.__renderProducts(item.id, item.name)}

                    </View>

                  </View>
                </View>

              )
            }
            }
          />
        </View>
      </ScrollView>
    )
  }


  __renderProducts = (cat_id, cat_name) => {

    let listData = this.state.dataSource["c" + cat_id];

    return (
      <ScrollView>
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={listData}
            horizontal={true}

            keyExtractor={({ id }, index) => id.toString()}

            renderItem={({ item }) => {

              let i = 1;

              let productImage = { uri: 'https://controlf5.in/client-demo/groznysystems/wp-content/uploads/2013/06/T_3_front.jpg' };
              let _productImage = item.meta_data;
              let _sendProduct = 'https://controlf5.in/client-demo/groznysystems/wp-content/uploads/2013/06/T_3_front.jpg';
              for (var j = 0; j < _productImage.length; j++) {
                if (_productImage[j].key == "product_thumbnail") {
                  productImage = { uri: _productImage[j].value }
                  _sendProduct = _productImage[j].value;
                  break;
                }
              }

              return (

                <View style={styles.card} key={i++}>

                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewDetailItem', {
                    product_id: item.id,
                    product_image: _sendProduct,
                  })}>

                    <View>
                      <Image key={item.id} style={styles.cardImage} source={productImage} />
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.count}>Price :  {item.price}</Text>
                    </View>

                  </TouchableOpacity>
                </View>

              )
            }
            }
          />
        </View>
      </ScrollView>

    )
  }


  renderAsync() {
    return (

      <ScrollView >
        <View style={styles.headerContent}>

          <View style={styles.storeheaderContent}>
            <View style={styles.storeheader}>
              <ImageBackground
                source={require('./Banner_2.jpg')}
                style={{
                  height: 230,
                  width: 450,
                  position: 'relative',
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('SelectCity')}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 100, }}>
                      <Text style={styles.storename}>
                        {this.state.store_name}
                                      </Text>
                    </View>
                  </TouchableOpacity>


                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddToCart')}>
                      <Image style={{ width: 25, height: 25, marginRight: 80, marginTop: 10 }} source={{ uri: 'https://www.controlf5.in/website-template/mobile/icon/cart.png' }} />
                    </TouchableOpacity>
                  </View>

                </View>

                <View style={{ flex: 1, flexDirection: 'row', }}>
                  <View style={{ flex: 1, alignItems: 'center', }}>
                    <Text style={{ fontSize: 14, color: "#FFFFFF", marginLeft: 150, textAlign: 'center', alignItems: 'center' }}>
                      Amman
                                     </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Image style={{ width: 12, height: 12, alignItems: 'center', marginTop: 5, marginRight: 5 }} source={{ uri: 'https://www.controlf5.in/website-template/mobile/icon/arrow-n.png' }} />
                  </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Image style={styles.avatar} source={{uri: this.state.banner}} />
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SearchTab')}>
                  <View style={{ alignItems: 'center' }}>
                    <View style={styles.inputContainer1}>
                      <TextInput
                        style={styles.inputs}
                        editable={false}
                        underlineColorAndroid='transparent'
                        placeholder= {this.state.store_name}
                        placeholderTextColor="#421a8d" />

                      <Image source={{ uri: 'https://www.controlf5.in/website-template/Consulting/images/search.png' }} style={styles.inputIconMap} />
                    </View>
                  </View>
                </TouchableOpacity>
              </ImageBackground>

            </View>


          </View>

          <View>

            {this.__renderCategories()}

          </View>

        </View>

      </ScrollView>


    );
  }

  render() {
    return (

      <View>
        {this.state.hasCategories && this.renderAsync()}
        {!this.setState.hasCategories &&

          <Text style={styles.loadingbar}>Loading...</Text>

        }
      </View>

    );
  }
}

const styles = StyleSheet.create({

  categoryname: {
    fontSize: 14,
    flex: 1,
    color: "#000",
    marginLeft: 4,
    fontWeight: 'bold',
  },
  loadingbar: {
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 300,
    fontWeight: 'bold',
  },
  contentList: {
    flex: 1,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: "#ebf0f7"
  },
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    padding: 10,
    flexDirection: 'row',
    borderRadius: 6,
  },
  categorycard: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    backgroundColor: "white",
    padding: 5,
    flexDirection: 'row',
    borderRadius: 6,
  },
  container: {
    flex: 1,
  },

  listContainer: {

  },

  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
  cardContent: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },

  headerContent: {
    alignItems: 'center',
  },
  avatar1: {
    width: 300,
    height: 300,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    marginTop: 10,
  },
  name: {
    marginTop: 10,
    fontSize: 14,
    color: "#000000",
    fontWeight: '300',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: "#696969",
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 10,
  },
  cardImage: {
    flex: 1,
    height: 75,
    width: 90,
  },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

  },
  count: {
    marginTop: 10,
    fontSize: 12,
    color: "#0000FF",
    fontWeight: '300',
  },


  storeheader: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  storeheaderContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DCDCDC',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginTop: 10,
  },
  storename: {
    marginLeft: 50,
    marginTop: 10,
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: '300',
    textAlign:'center',
    alignItems: 'center',
    justifyContent:'center',
  },
  inputContainer1: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    height: 35,
    width: 300,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 1,
  },
  inputs: {
    textAlign: 'center',
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIconMap: {
    width: 15,
    height: 15,
    marginLeft: 15,
    justifyContent: 'center',
    position: 'absolute',
    left: 5,
  },

});

export default withNavigation(StoreProfile);