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
import { SafeAreaView, StatusBar, ScrollView, TouchableWithoutFeedback, TouchableOpacity, ActivityIndicator, Alert, Platform, FlatList, AsyncStorage } from 'react-native';
import { Navigation } from "react-native-navigation";
import { useDispatch, useSelector } from "react-redux";
import { Colors, Typography, Spacings, Swipeable, Button, Modal, Card, Image, Carousel, Text, View, LoaderScreen, ColorSliderGroup } from 'react-native-ui-lib';
import styles from './styles'
import Animated from "react-native-reanimated";
import I18n from 'locale/i18n';
import Images from 'constants/images';
import { getinfo ,addtocartapi, removecartapi } from './service'
import {getcartdetails } from 'screens/home/service'
import ConnectionStatusBar from 'components/connectionstatusbar'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Badge, withBadge } from 'react-native-elements'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { navigatetoscreen } from 'navigation/navigatetoscreen'

import KeySpec from 'components/keyspec'
import ProductRatings from 'components/productratings'
import RenderIndicator from 'components/loaingoverlay'
import ReadReview from 'components/readreview'
import CustomHeader from 'components/customheader'
import PlaceHolder from 'components/placeholder'

import {
  StyleSheet,
} from 'react-native';
import _ from 'lodash';
import { basepath } from 'src';


var one = 0, two = 0, three = 0, four = 0, five = 0;
var key;
const productinfo: productinfotypes = (productinfoprops) => {
  const [dataProduct, setDataProduct] = useState<productdata>({
    name: '',
    stock_status: '',
    price_formated: '',
    price: '',
    rating: '',
    availablity: '',
    description: "",
    manufacturer: '',
    special_formatted: '',
    price_excluding_tax: 0,
    special_excluding_tax: 0,
    special_formated: '',
    additional_image_color: [],
    reviews: { review_total: 0, reviews: [] },
    attribute_groups: []
  }
  );

  // define localstate and redux state
  const [selectedimage, setSelectedImage] = useState(0);
  const [componentId, setComponentId] = useState(productinfoprops.componentId);
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [keypoints, setKeyPoints] = useState<Array<string>>([])
  const [discountpercentage, setDiscountPercentage] = useState<string>('')
  const [images, setImages] = useState<Array<string>>([])
  const [overlay, setOverlay] = useState<boolean>(false)
  const dispatch = useDispatch();
  // cart details
  const cartarray = useSelector((state: cartItemState) => state.cartstate.cartItem)
  const favarray = useSelector((state: favItemState) => state.favouritestate.favItem)
  const login = useSelector((state: any) => state.loginstate.status)
  I18n.locale = 'fr'
  useEffect(() => {
    (loading == true ? GetDetails() : {})
  }, []);

  // // store cartarray and fav array in async storage
  // const SetItems =   () => {
  //    AsyncStorage.setItem('cartitems', JSON.stringify(cartarray));
  //    AsyncStorage.setItem('favitems', JSON.stringify(favarray));
  // }
  // get details of the product using product id
  const GetDetails = async () => {
    const responseText: productdetails = await getinfo(productinfoprops.id, '');
    setDataProduct(responseText.data);
    try {
      const startarray = (responseText).data.reviews.reviews
      startarray.forEach(element => {
        //console.log('Rating... ' + element.rating)
        if (element.rating == "1")
          one++;
        else if (element.rating == "2") two++
        else if (element.rating == "3") three++
        else if (element.rating == "4") four++
        else if (element.rating == "5") five++
      });
    }
    catch (err) {
      one = 0, two = 0, three = 0, four = 0, five = 0
    }
    var caldis = parseInt((responseText).data.special) / parseInt((responseText).data.price) * 100
    //Alert.alert( ' '+caldis)
    if ((responseText).data.special == 'false')
      setDiscountPercentage('')
    else
      setDiscountPercentage('' + (100 - caldis).toFixed(2) + '% off')
    //console.log('Response'+responseText.data)
    setLoading(false)
    const addimglist = (responseText).data.additional_image_color
    var att: Array<string> = []
    addimglist.forEach(element => {
      att.push(Images.basepath + element.image)
    });
    // });( ()=>
    // {

    // })
    // for (var i = 0; i < addimglist.length; i++) {
    //   att.push(Images.basepath + addimglist[i].image)
    // }
    setImages(att)
    const attributes = (responseText).data.attribute_groups;
    att = []
    attributes.forEach((element) => {
      const attrib = element.attribute
     // console.log('Key Name: ' + element.name);
      if (element.name == 'Primary' || element.name == 'Internal' || element.name == 'Secondary' || element.name == 'Ram' || element.name == 'BATTERY' || element.name == 'Chipset'
        || element.name == 'CONNECTIVITY FEATURES' || element.name == 'GENERAL' || element.name == 'BODY'
        || element.name == 'DISPLAY' || element.name == 'CAMERA') {
        att.push(attrib[0].text)
      }
    })
    // //console.log('PRODUCT ID:'+productinfoprops.id)
    // for (var i = 0; i < attributes.length; i++) {
    //   try{
    //   const attrib = attributes[i].attribute
    //   //if(attrib[0].name == 'Primary' || attrib[0].name == 'Internal' || attrib[0].name == 'Secondary' || attrib[0].name == 'Ram' || attrib[0].name == 'BATTERY' || attrib[0].name == 'Chipset') 
    //     att.push(attrib[0].text)
    //   }
    //   catch(err){}
    // }
    setKeyPoints(att)
  }

  // goto preview screen with passprops images
  const GotoScreen = (ScreenName: string, options: any, passProps: any) => {
    navigatetoscreen(I18n.t('screenname.' + ScreenName), componentId, options, passProps)
  }

  const RenderProdcutInfo = () => {
    return (
      <Card borderRadius={1}
        containerStyle={styles.producrcard}
        enableShadow={true} >

        {/* <View><Text normalText margin-5 text10B40 style={{ fontSize: 24 }}>{name}</Text></View> */}
        <View><Text normalText marginL-5 style={{ fontSize: 16 }}>Availablity: {dataProduct.availablity}</Text></View>
        <View marginT-10 row style={{ alignItems: 'center' }}>
          <View center marginL-5 style={{ width: 70, height: 25, borderRadius: 5, backgroundColor: Colors.green10, }}>
            <Text text100BO normalText style={{ color: Colors.white, fontWeight: '600' }}> {dataProduct.rating} ★</Text>
          </View>
          <Text text100BO normalText marginL-5 style={{ color: Colors.orange10, fontWeight: '600' }}>Read all: {dataProduct.reviews.review_total} Reviews </Text>
        </View>
        <View marginT-10 marginB-5 row style={{ alignItems: 'center' }}>
          <Text text100B5 normalText marginL-5 margingT-10 style={{ fontWeight: '500', fontSize: 22 }}>Rs.{dataProduct.price_excluding_tax}</Text>
          <Text text100BO normalText marginL-5 style={{ color: Colors.grey30, textDecorationLine: 'line-through', fontWeight: '400' }}>{dataProduct.special_formated} </Text>
          <Text text100BO normalText marginL-5 style={{ color: Colors.green10, }}>{discountpercentage}</Text>
        </View>

      </Card>
    )
  }

  // render top carosel
  const RenderCarosel = () => {
    return (
      <View>
        <Carousel containerStyle={styles.carosel}
          ref={r => (carousel = r)}
          counterTextStyle={{ color: 'white' }} pagingEnabled={true}
          // pageControlPosition={'under'}

          showCounter={true} animated={true}
          initialPage={currentPage}
          onChangePage={(currentPage) => {
            setSelectedImage(currentPage);
            setCurrentPage(currentPage)
          }}
          loop allowAccessibleLayout autoplay={false}>
          {_.map(images, (image: any, index: number) => {
         //   console.log('' + image)
            return (
              <View key={index} flex-1 padding-10 center>
                <TouchableOpacity testID={image} flex-1 style={styles.caroselimage} onPress={() => {
                  const options = {
                    topBar: {
                      visible: false, animate: true,
                      title: {
                        text: 'Preview' // Set the TopBar title of the new Screen
                      },
                    },
                    bottomTabs: { visible: false, drawBehind: true, animate: true },
                  }

                  const passProps = {
                    images: images,
                    index: index
                  }
                  GotoScreen('preview', options, passProps)
                }}>
                  <Image
                    flex-1
                    style={styles.caroselimage}
                    resizeMode='contain'
                    source={{ uri: image }}
                  />

                  <View style={{ position: 'absolute', bottom: 10, right: 10 }}>
                    <TouchableWithoutFeedback onPress={() => {
                      (CheckFav() == true ? Remove() : Add())
                    }}>
                      {
                        <Icon name={(CheckFav() == true ? "heart" : "heart-o")} color={(CheckFav() == true ? Colors.orange10 : "grey")} size={20} onPress={() => { }} />
                      }

                    </TouchableWithoutFeedback>
                  </View>

                </TouchableOpacity>
              </View>
            );
          })}
        </Carousel>
      </View>
    )
  }

  // render flatlistview under carosel
  const RenderFlatList = () => {
    if (images.length == 0) {
      return (<View></View>)
    }
    return (
      <FlatList
        style={styles.flatlist}
        data={images}
        horizontal={true}
        extraData={selectedimage}
        keyExtractor={item => item.image}
        renderItem={({ item: rowData, index }) => {
          //console.log('Row Data: '+JSON.stringify(rowData));
          if (selectedimage == index) {
            return (
              <TouchableOpacity style={styles.selected} onPress={() => {
                carousel.goToPage(index, true)
                setSelectedImage(index)
              }}>
                <Image style={styles.image}
                  resizeMode='contain'
                  source={{ uri: rowData }}></Image>
              </TouchableOpacity>
            )
          }
          else {
            return (
              <TouchableOpacity onPress={() => {
                this.carousel.goToPage(index, true)
                setSelectedImage(index)
              }}>
                <Image style={styles.selectedimage}
                  resizeMode='contain'
                  source={{ uri: rowData }}></Image>
              </TouchableOpacity>
            );
          }

        }
        }>
      </FlatList>
    )
  }

  // Add Items to favourite by dispatch
  // Props: id, price, name, url, by

  const AddItemInFav = async (id: number, price: string, name: string, url: string, by: string) => {
    await dispatch({
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
  // custom function to show overlay 
  const Add = async () => {
    setOverlay(true)
    setTimeout(async () => {
      await AddItemInFav(productinfoprops.id, dataProduct.price, dataProduct.name, images[0], dataProduct.manufacturer);
    });
  }
  // remove item from favourite
  const Remove = async () => {
    //Alert.alert('Remove Item called...')
    setOverlay(true)
    setTimeout(async () => {
      await dispatch({
        type: 'remove', item:
        {
          "id": productinfoprops.id,
        }
      })
      setOverlay(false)
    });
    //setItems()
  }

  // Add Items to cart by dispatch
  // Props: id, price, name, url, by, quantity

  const AddItemsToCart = async (id: number, price: string, name: string, url: string, by: string, quantity: number) => {
    await dispatch({
      type: 'addtocart', item:
      {
        "key": id,"id": id, "price": price, "name": name, "url": url, "by": by, "quantity": quantity
      }
    });
    setOverlay(false)
  }

  // add item in cart
  const AddToCart = async () => {
    //console.log('Item add to cart function')
    setOverlay(true)
    if(login==true)
    {
        const response = await addtocartapi(productinfoprops.id,1);
        const responseText = await getcartdetails();
        const data= responseText.data.products;
        dispatch({ type: 'removeallcart'})
        data.forEach((item: any) => {
          dispatch({
            type: 'addtocart', item:
            {
              "id": item.product_id, "price": item.price, "name": item.name,
              "url": item.thumb, "by": item.model, "quantity": item.quantity, "key": item.key
            }
          })
        });
        setOverlay(false)
    }
    else
    {
      setTimeout(async () => {
        await AddItemsToCart(productinfoprops.id, dataProduct.price_formated, dataProduct.name, images[0], dataProduct.manufacturer, 1)
      })
    }
    
    
  }

  // remove items from the cart by dispatch
  const RemoveFromCart = async () => {

    if(login==true)
    {
      const response = await removecartapi(key);
    }

    setOverlay(true)
    setTimeout(async () => {
      dispatch({
        type: 'removefromcart', item:
        {
          "key": productinfoprops.id, "id": productinfoprops.id,
        }
      })
      setOverlay(false)
    });
  }

  const GoToCart  = () =>
  {
      const options = {
                      topBar: {
                        visible: false, height: 0, animate: true,
                        title: {
                          text: 'cart' // Set the TopBar title of the new Screen
                        },
                      },
                      bottomTabs: { visible: false, drawBehind: true, animate: true },
                    }
                    const passProps = {
                      enableback: true
                    }
                    
                    GotoScreen('cart', options, passProps)
  }
  // render bottom view
  const RenderBottom = () => {

    var itemexist = false
    cartarray.forEach(element => {
      if (element.id == productinfoprops.id)
        itemexist = true;
        key = element.key
    });

    return (

      <View style={styles.bottomview}>
        <View flex-1 row>
          <View style={{ flex: 1, height: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            <View>
              <TouchableOpacity testID={'addtocart'} disabled={(dataProduct.name == '' ? true : false)} onPress={
                () => {
                  // add item to the cart
                  (itemexist == false) ? AddToCart() : 
                    //RemoveFromCart()
                    GoToCart()
                }
              }>
                <Text text100BO normalText marginL-5 style={{ color: Colors.grey10, fontWeight: '600' }}>{(itemexist == true ? I18n.t('productdetails.added') : I18n.t('productdetails.addtocart'))}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1, height: 50, backgroundColor: 'orange', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity testID="buynow" disabled={(dataProduct.name == '' ? true : false)} onPress={() => {
              { (itemexist == false) ? AddToCart() : {}}
                  Navigation.push(componentId, {
                    component: {
                      name: 'Checkout',
                      passProps: {
                        cartitems: cartarray
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
            }}>
              <Text text100BO normalText marginL-10 style={{ color: Colors.white, fontWeight: '600' }}>{I18n.t('productdetails.buynow')}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  }

  // Custom function to check item is in favourite
  const CheckFav = () => {
    var itemexist = false
    favarray.forEach(element => {
      if (element.id == productinfoprops.id)
        itemexist = true
    });
    return itemexist;
  }

  // render placeholder
  const RenderPlaceHolder = () => {

    return (
      <View row style={{ backgroundColor: 'white', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='small' />
      </View>
    )
  }
  // custom render indicator
  const RenderIndicator = () => {

    if (overlay == true) {
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
  // productinfo design starting
  const ProductDetails = () => {
    return (

      <SafeAreaView style={{ flex: 1 }}>
        <View bg-white flex-1>
          <ConnectionStatusBar></ConnectionStatusBar>

          <CustomHeader componentId={productinfoprops.componentId} title={dataProduct.name} ></CustomHeader>
          <ScrollView testID="productscroll" style={{ marginBottom: (dataProduct.name == '' ? 0 : 45) }}>
            <View>
              {RenderCarosel()}
              {RenderFlatList()}
              {RenderProdcutInfo()}

              <View row flex-1>
                <Card
                  row // control the children flow direction
                  borderRadius={1}
                  height={50}
                  containerStyle={styles.sharecontainer}
                  enableShadow={true}>
                  <MaterialCommunityIcons name="share-variant" color={'gray'} size={20} onPress={() => { }} />
                  <Text text100BO normalText marginL-5 style={{ color: Colors.grey10, fontWeight: '600' }}>{I18n.t('productdetails.share')}</Text>
                </Card>
                <Card
                  row // control the children flow direction
                  borderRadius={1}
                  height={50}
                  testID="favbutton"
                  disabled={(dataProduct.name == '' ? true : false)}
                  onPress={
                    () => {
                      (CheckFav() == true ? Remove() : Add())
                    }
                  }
                  containerStyle={styles.favouritecontainer}
                  enableShadow={true} >
                  <Icon name={(CheckFav() == true ? "heart" : "heart-o")} color={(CheckFav() == true ? Colors.orange10 : "grey")} size={20} onPress={() => { }} />
                  <Text text100BO normalText marginL-10 style={{ color: Colors.grey10, fontWeight: '600' }}>{I18n.t('productdetails.favourite')}</Text>
                </Card>
              </View>
              <KeySpec keypoints={keypoints} attribute={dataProduct.attribute_groups} componentId={componentId}></KeySpec>
              <Card
                row // control the children flow direction
                borderRadius={1}
                height={50}
                disabled={(dataProduct.name == '' ? true : false)}
                onPress={() => {
                  const options = {
                    topBar: {
                      title: {
                        text: dataProduct.name // Set the TopBar title of the new Screen
                      },
                      largeTitle:
                      {
                        visible: true
                      }
                    },
                    bottomTabs: { visible: false, drawBehind: true, animate: true }
                  }
                  const passProps = {
                    htmlcontent: dataProduct.description
                  }
                  GotoScreen('description', options, passProps);
                }}
                containerStyle={styles.descriptioncontainer}>
                <Text text100BO normalText marginL-5 style={{ color: Colors.orange10, fontWeight: '600' }}>{I18n.t('productdetails.description')}</Text>
              </Card>
              <ProductRatings one={one} two={two} three={three} four={four} five={five} componentId={componentId}
                reviewcount={dataProduct.reviews.review_total} rating={dataProduct.rating}></ProductRatings>
              <Card
                row // control the children flow direction
                height={50}
                borderRadius={1}
                containerStyle={{ flex: 1, marginTop: 1, marginBottom: (dataProduct.reviews.reviews == null || dataProduct.reviews.reviews.length <= 0 ? 5 : 1), backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', }}
                onPress={() => {
                  const options = {
                    topBar: {
                      visible: false,
                      height: 0,
                      title: {
                        text: 'Add Review' // Set the TopBar title of the new Screen
                      },
                    },
                    bottomTabs: { visible: false, drawBehind: true, animate: true }
                  }
                  const passProps = {
                    id: productinfoprops.id,
                    name: dataProduct.name
                  }
                  GotoScreen('writereview', options, passProps);
                }
                }>
                <View>
                  <Text text100BO normalText marginL-5 style={{ color: Colors.orange10, fontWeight: '600' }}>{I18n.t('productdetails.writereview')}</Text>
                </View>
              </Card>
              <ReadReview reviewdata={dataProduct.reviews.reviews} componentId={componentId} />
            </View>
          </ScrollView>
          {RenderBottom()}
          <RenderIndicator></RenderIndicator>

          {/* {renderBottomview()} */}
        </View>
      </SafeAreaView>
    );
  }

  // initial checking
  if (loading == true) {
    return (
      <RenderPlaceHolder />
    );
  }
  else {
    return (
      ProductDetails()
    )
  }
}

productinfo.options = {
  topBar: {
    visible: false,
    title: { component: { name: 'navHeader' } },
  }
}

/*Use Redux connect*/
export default productinfo;
