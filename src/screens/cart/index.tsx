/*************************************************************************
 * 
 * Poorvika CONFIDENTIAL
 * __________________
 * 
 *  2009 - 2020 Poorvika Systems Incorporated 
 *  All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of Poorvika Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Poorvika Systems Incorporated
 * and its suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Poorvika Systems Incorporated.
 */
import React, { useState, Component, useEffect } from 'react';
import { Dimensions, Image, SafeAreaView, StatusBar, ActivityIndicator, AsyncStorage, FlatList, ScrollView, TouchableOpacity, Alert, addons } from 'react-native';
import { Navigation } from "react-native-navigation";
import { useDispatch, useSelector } from "react-redux";
import styles from './styles'
import I18n from 'locale/i18n';
import { Colors, Typography, Spacings, Button, Modal, Card, Carousel, WheelPicker, Text, View, LoaderScreen } from 'react-native-ui-lib';
import { orange100 } from 'react-native-paper/lib/typescript/src/styles/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input'
import { navigatetoscreen } from "navigation/navigatetoscreen";
import Renderindicator from 'components/loaingoverlay'
import SimpleHeader from 'components/simpleheader'
import {removecartapi, updatecartquantity } from 'screens/productinfo/service'

const cart: cartproducttype = (cartproductprops): JSX.Element => {

  const [componentId, setcomponentId] = useState(cartproductprops.componentId);
  const [enableback, setBack] = useState(cartproductprops.enableback);
  const [loading, setloading] = useState<boolean>(true)
  const [fav, setfav] = useState<boolean>(false)
  const [quantity, setquantity] = useState<number>(0)
  const [overlay, setOverlay] = useState<boolean>(false)

  const showloading = useSelector((state: boolean) => state.cartstate.showLoading)
  const cartitems = useSelector((state: cartItemState) => state.cartstate.cartItem)
  const favitems = useSelector((state: favItemState) => state.favouritestate.favItem)
  const login = useSelector((state: any) => state.loginstate.status)
  const dispatch = useDispatch()

  //get item from cart redux
  const Getitems = async () => {
    setloading(false)
    //Alert.alert('--->>>'+cartproductprops.title)
  }

  // Add items to the cart
  const AddToCart = (item: cartItemState) => {
    dispatch({
      type: 'addtocart', item:
      {
        "id": item.id, "price": item.price, "name": item.name,
        "url": item.url, "by": item.by, "quantity": item.quantity
      }
    })
  }
  // Reset cartitem from async storage if it length ==0
  const Reset = async () => {
    if (cartitems != null && cartitems.length == 0) {
      try {
        const cartitems = await AsyncStorage.getItem('cartitems')
        const cartitem = JSON.parse(cartitems);
        //Alert.alert('Cart Items '+cartitem.length)
        cartitem.forEach((json: cartItemState) => {
         // console.log('ID ' + json.id)
          AddToCart(json);
        });
      }
      catch (err) {

      }

    }
  }

  // update bottomTab badge
  useEffect(() => {
    //Reset()
    if (cartitems.length > 0) {
      Navigation.mergeOptions(componentId, {
        bottomTab: {
          badge: '' + cartitems.length
        },
      });
    }
    else
      Navigation.mergeOptions(componentId, {
        bottomTab: {
          badge: ''
        },
      });

  }, [cartitems, favitems]);

  // check total of the cart Items quantity
  const CheckTotal = () => {
    cartitems.forEach(item => {
      //console.log('deva---'+item.quantity)
    });
    let temp = 0;
    cartitems.forEach((item: any) => {
      var price=item.price.replace("Rs.","").replace(",","");
      console.log('PRICE>>'+price + ' '+item.quantity)
      temp +=  parseInt(price) * parseInt(item.quantity)
      console.log(""+temp);
    });
    // var formatter = new i18n.number.NumberFormat('en-IN', {
    //   minimumFractionDigits: 0,
    // });
    return temp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  // goto Checkout screen
  const GotoCheckout = () => {
    Navigation.push(componentId, {
      component: {
        name: 'Checkout',
        passProps: {
          cartitems: cartitems
        },
        options: {
          topBar: {
            visible: false,
            title: {
              text: 'Confirm Address' // Set the TopBar title of the new Screen
            }
          },
          bottomTabs: { visible: false, drawBehind: true, animate: true },
        }
      }
    })
  }

  // goto product details screen
  const GotoScreen = (rowData: { id: string }) => {
    const options = {
      topBar: {
        //hideOnScroll: true, drawBehind:true, animate: true, 
        //hideOnScroll: true,
        hideOnScroll: false, drawBehind: false, animate: true,
      },
      bottomTabs: { visible: false, drawBehind: true, animate: true },
      layout: {
        orientation: ["portrait"],
      }
    }
    const passProps = {
      id: rowData.id,
    }
    navigatetoscreen(I18n.t('screenname.productinfo'), componentId, options, passProps)
  }

  // remove items from cart by dispatch
  const RemoveItemFromCart = async (id: string, key:string) => {
    if(login==true)
    {
      const response= await removecartapi(key)
    }
    dispatch({
      type: 'removefromcart', item:
      {
        "id": id
      }
    })
    setOverlay(false)
  }
  // remove item from the cart
  const Remove = (rowData: { id: string, key:string }) => {
    setOverlay(true)
    setTimeout(async () => {
      RemoveItemFromCart(rowData.id, rowData.key)
    });
  }
  // Remove item from fav by dispatch
  const RemoveItemFromFav = async (id: number) => {
    await dispatch({
      type: 'remove', item: {
        "id": id,
      }
    })
    setOverlay(false)
  }
  // add items to favourite by dispatch
  const AddItemsToFav = async (id: number, price: string, name: string, url: string, by: string) => {
    dispatch({
      type: 'add', item:
      {
        "id": id,
        "price": price,
        "name": name,
        "url": url,
        "by": by
      }
    })
    setOverlay(false)
  }

  // add & remove item in favitem. if exists, then remove, if not then add
  const Add = (rowData: { id: number, price: string, name: string, url: string, by: string }) => {
    var favexist = false
    favitems.forEach(item => {
      if (rowData.id == item.id) {
        favexist = true;
      }
    });

    if (favexist) {
      setOverlay(true)
      setTimeout(async () => {
        RemoveItemFromFav(rowData.id);
      });
    }
    else {
      setOverlay(true)
      setTimeout(async () => {
        AddItemsToFav(rowData.id, rowData.price, rowData.name, rowData.url, rowData.by)
      });
    }
    Getitems()
  }

  // update quantity function
  const UpdateQuantity = async (rowData: { key: number, id: number, price: string, name: string, url: string, quantity: string, by: string }, noofitems: number) => {
    //console.log('...>>>>'+showloading)
    dispatch({ type: 'loading' })
    if(login==true)
    {
        const response = await updatecartquantity(rowData.key, noofitems)
        //Alert.alert(''+response.success)
        if(response.success==1)
        {
          setTimeout(async () => {
            await dispatch({
              type: 'updatequantity', item:
              {
                "key": rowData.key,
                "id": rowData.id,
                "quantity": noofitems
              }
            })
          });
        }
        else{
            
        }
        //Alert.alert(JSON.stringify(response.data))
    }
    else
    {
      setTimeout(async () => {
        await dispatch({
          type: 'updatequantity', item:
          {
            "key": rowData.key,
            "id": rowData.id,
            "quantity": noofitems
          }
        })
      });
    }
   

  }

  // render fav icon
  const RenderFav = (rowData: object) => {
    //Alert.alert('--->>>'+rowData.id+" "+favornot.includes(rowData.id))
    var favexist = false

    favitems.forEach(item => {
      if (rowData.id == item.id)
        favexist = true;
    });
    return (
      <Icon name={(favexist == true ? "heart" : "heart-o")} color={(favexist == true ? Colors.orange10 : "grey")} size={20} onPress={() => { }} />
    )
  }

  // Render loading if showloading==true
  const RenderLoading = () => {

    if (showloading == true) {
      return (

        <View style={styles.loadingcart}>
          <View style={styles.wait}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={{ color: 'white' }}>Please wait...</Text>
          </View>
        </View>

      )
    }
    else {
      return (
        <View></View>
      );
    }
  }

  // render listview
  const RenderContent = () => {
    if (cartitems.length == 0) {
      return (
        <View flex-1 center>
          <Text normalText style={{ color: 'grey' }}>No Items Added</Text>
        </View>
      )
    }
    else {
      return (
        <View marginT-10 bg-white style={{ marginBottom: (cartproductprops.enableback) ? 170 : 120 }}>

          {/* <Card containerStyle={{ marginBottom: 10, height:0 }}>
                <View style={{height: 60, justifyContent: 'center'}}> 
                      <Text marginL-10 heading style={{color:Colors.orange10}}>Order Total (incl.GST)</Text>
                </View>
            </Card> */}
          <FlatList
            data={cartitems}
            style={styles.list}
            horizontal={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item: rowData, index }) => {
              return (
                //<Card marginB-0 marginL-5 marginR-5 marginT-5></Card>
                <Card padding-3 marginL-5 marginR-5 marginV-5 borderRadius-30 onPress={() => { }}>
                  <TouchableOpacity activeOpacity={0.8} onPress={
                    () => {
                      GotoScreen(rowData)
                    }
                  }>
                    <View row flex-1>
                      <View style={styles.imagerow}>
                        <Image
                          source={{ uri: rowData.url, }}
                          resizeMode={"contain"}
                          style={{
                            width: '100%',
                            height: undefined,
                            aspectRatio: 1
                          }}
                        />
                      </View>

                      <View style={styles.datarow}>
                        <Text normalText style={{ fontSize: 18, color: 'black' }} numberOfLines={2} ellipsizeMode='tail' textAlign marginB-5 marginT-15>{rowData.name}</Text>
                        <Text textAlign marginB-5 grey20 heading>{rowData.by} {rowData.key} </Text>
                        <Text textAlign marginB-5 orange10 heading>{rowData.price} </Text>
                        <NumericInput

                          value={parseInt(rowData.quantity)}
                          onChange={quantity => {
                            UpdateQuantity(rowData, quantity)
                          }
                          }
                          // onLimitReached={(isMin, msg) => console.log(isMin, msg)}
                          totalWidth={100}
                          totalHeight={30}
                          iconSize={15}
                          step={1}
                          minValue={0}
                          maxValue={100}
                          valueType="real"
                          rounded editable={true}
                          textColor='gray'

                          iconStyle={{ color: "grey" }}
                          rightButtonBackgroundColor="white"
                          leftButtonBackgroundColor="white"
                        />
                      </View>
                    </View>

                    <View marginT-10 bg-white>
                      <View flex-1 row marginT-0>

                        <TouchableOpacity style={styles.removebutton}
                          onPress={
                            () => {
                              Remove(rowData)
                            }
                          }>
                          <View row style={{ alignItems: 'center' }}>
                            <SimpleLineIcons name="trash" size={20} color="grey" />
                            <Text normalText marginL-5 style={{ color: Colors.red10, fontWeight: '600' }}>{I18n.t('category.remove')}</Text>
                          </View>
                        </TouchableOpacity>

                        <View
                          style={{
                            borderLeftWidth: 0.5,
                            borderLeftColor: 'grey',
                          }}
                        />

                        <TouchableOpacity style={styles.removebutton}
                          onPress={
                            () => { Add(rowData) }
                          }>
                          <View row>
                            {RenderFav(rowData)}
                            <Text normalText marginL-10 style={{ fontWeight: '600' }}>{I18n.t('category.fav')}</Text>
                          </View>
                        </TouchableOpacity>

                      </View>
                    </View>

                  </TouchableOpacity>

                </Card>
              )
            }}>
          </FlatList>
        </View>
      )
    }
  }

  // render bottom button  based on cartitemslength
  const RenderBottom = () => {
    if (cartitems.length == 0) {
      return (
        <View></View>
      )
    }
    else {
      return (
        <View style={[styles.bottom, { height: (cartitems.length > 0 ? 100 : 0) }]}>
          <View flex-1 row center marginB-0 style={{ height: 50 }}>
            <View center style={{ width: '50%' }}>
              <Text text100BO heading black style={{ fontWeight: '600' }}>{I18n.t('category.incgst')}</Text>
            </View>
            <View center style={{ width: '50%' }}>
              <Text text100BO orange10 heading style={{ fontWeight: '600' }}>Rs. {CheckTotal()}</Text>
            </View>
          </View>
          <TouchableOpacity bg-orange10 style={styles.checkout}
            onPress={() => GotoCheckout()}>
            <Text text100B2 heading color-white>{I18n.t('cart.checkout')}</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  //check loading
  if (loading == true) {
    Getitems()
    return (
      <View></View>
    )
  }
  else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View flex-1 bg-white>
          <SimpleHeader componentId={componentId} title="Cart" enableback={enableback}></SimpleHeader>
          {RenderContent()}
          {RenderBottom()}
          {RenderLoading()}
          <Renderindicator overlay={overlay}></Renderindicator>
        </View>
      </SafeAreaView>
    );
  }

}
// configuare home page navigation Bar
cart.options = {
  topBar: {
    visible: false,
    title: { component: { name: 'navHeader' } },
  }
}
export default cart

