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
import React, { useState, useEffect } from 'react';
import Placeholder from 'components/placeholder'
import I18n from 'locale/i18n';
import Images from 'constants/images';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView, AsyncStorage,
  Alert, FlatList, Dimensions,
  StatusBar, TouchableOpacity, Shape,
} from 'react-native';
import _ from 'lodash';
import styles from './styles'
import { useDispatch, useSelector } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import { Colors, Typography, Spacings, Button, Modal, Card, Image, Carousel, Text, View, LoaderScreen } from 'react-native-ui-lib';
import ConnectionStatusBar from 'components/connectionstatusbar'
import { gethomedata, getbrands, gettoken, forceupdateapi } from '../home/service'
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MultipleCarousel from 'react-native-anchor-carousel';
import { navigatetoscreen } from 'navigation/navigatetoscreen'
import Homelist from "components/homelist";
import { Navigation } from "react-native-navigation";
import RazorpayCheckout from 'react-native-razorpay'
import { url } from 'inspector';
const Home: HomeComponentType = (HomeComponentProps) => {
  /*Define State, Function, use Redux*/

  const [componentId, setComponentId] = useState(HomeComponentProps.componentId);
  const [getloading, setLoading] = useState(false)
  const [homeresponse, setHomeRespone] = useState<homedata>({
    banners: [],
    feature_block: { values: [] }
  })
  const [Coming_soon, setComing_soon] = useState([])
  const [Coming_soon1, setComing_soon1] = useState([])
  const [Coming_soon2, setComing_soon2] = useState([])
  const cartarray = useSelector((state: cartItemState) => state.cartstate.cartItem)
  const favarray = useSelector((state: favItemState) => state.favouritestate.favItem)
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const [showbrand, setBrand] = useState<Array<{ image: string, category_id: string }>>([]);
  //const [homebanner, setHomeBanners]= useState<Array<{image: string, id: number, name:string,banner_image_id: string}>>([])
  const AddToCart = (item: cartItemState) => {
    dispatch({
      type: 'addtocart', item:
      {
        "id": item.id, "price": item.price, "name": item.name,
        "url": item.url, "by": item.by, "quantity": item.quantity
      }
    })
  }
  const AddToFav = (item: favItemState) => {
    dispatch({
      type: 'add', item:
      {
        "id": item.id, "price": item.price, "name": item.name, "url": item.url, "by": item.by,
      }
    });
  }

  const ResetLogin = async (data: { name: string, status: boolean }) => {
    await dispatch({
      type: 'login',
      username: data.name,
      status: data.status
    })
  }

  const Reset = async () => {
    const loginstatus = await AsyncStorage.getItem('login')
    //Alert.alert( 'login status '+loginstatus)
    if (loginstatus != null) {
      ResetLogin(JSON.parse(loginstatus))
    }
    else {
      console.log('login is null')
    }
  }

  /* Restore cart items from async storage */
  const ResetCartItems = async () => {
    // setTimeout(async ()=>
    // {

    //   const loginstatus= await AsyncStorage.getItem('login')
    //   console.log( 'login status '+JSON.parse(loginstatus).status)
    //   setLogin(JSON.parse(loginstatus).status)
    //   if(loginstatus!=null)
    //   {
    //     await ResetLogin(JSON.parse(loginstatus))
    //   }
    //   else{
    //     console.log('login is null')
    //   }
    // })
    if (cartarray != null && cartarray.length == 0) {
      const cartitems = await AsyncStorage.getItem('cartitems')
      const cartitem = JSON.parse(cartitems);
      console.log('Cart Items ' + cartitem.length)
      cartitem.forEach((json: cartItemState) => {
        console.log('ID ' + json.id)
        AddToCart(json);
      });
    }
    console.log('login Status ' + login)
    if (favarray != null && favarray.length == 0
      // && login==true
    ) {

      const favitems = await AsyncStorage.getItem('favitems')
      const favitem = JSON.parse(favitems);
      console.log('fav length ' + favitem.length)
      //dispatch({type: 'restore', items: favitem
      console.log('Fav Items ' + JSON.stringify(favitems))
      favitem.forEach(json => {
        console.log('ID ' + json.id)
        AddToFav(json)

      })

    }
  }
  Navigation.mergeOptions(componentId, {
    bottomTab: {
      badge: ''
    },
  });
  I18n.locale = 'en'
  useEffect(() => {
    GetContent()
    Reset()
  }, []);

  /* Render more button */
  const RenderMore = (key: string, data: any, title: any) => {
    return (

      <Card
        row // control the children flow direction
        borderRadius={0}
        height={40}
        containerStyle={styles.more__heading}
        testID={title}
        onPress={() => {
          const options = {
            topBar: {
              visible: false, height: 0,
              title: {
                text: title,
              },
            },
            layout: {
              orientation: ["portrait"],
            },
            bottomTabs: { visible: false, drawBehind: true, animate: true },

          }
          const passProps = {
            data: data,
            title: title,
          }
          navigatetoscreen(I18n.t('screenname.moreproducts'), componentId, options, passProps)

        }}
        enableShadow={true}>
        <Text style={{ textAlign: 'left' }} text70 marginR-7 dark10 heading>{I18n.t('home.' + key)}</Text>
        <Icon name="angle-right" size={25} style={{ color: Colors.dark30 }} />
      </Card>

    )
  }

  /* Render title button */
  const RenderTitle = (key: string) => {
    return (
      <View style={styles.title}>
        <Text style={styles.heading}>{I18n.t('home.' + key)}</Text>
      </View>
    )
  }
  /* Render banner image */
  const RenderBanner = (item: { image: string; id: number; name: string; banner_image_id: string; }) => {
    try {
      return (
        <TouchableOpacity bg-white onPress={() => {
          //Alert.alert('Banner ID '+item.id)
          GotoCategory(item.id, 'TOP MODELS')
        }}>
          <View style={styles.carousel__images__main}>
            <Image
              style={styles.carousel__images}
              source={{ uri: item.image }}
            ></Image>
          </View>
        </TouchableOpacity>
      )
    }
    catch (err) {
      return (
        <View></View>
      )
    }
  }


  /* get token & home content from api*/
  const GetContent = async () => {
    const responseText: homedata = await gethomedata();
    console.log('yeryer', responseText);
    setHomeRespone(responseText)
    setLoading(true)
    // const homebanners = responseText.banners[4].values
    setComing_soon(responseText.banners[4].values);
    setComing_soon1(responseText.banners[1].values);
    setComing_soon2(responseText.banners[0].values);
    const brandresponse: brandtype = await getbrands();
    const brandvalues = brandresponse.brands;
    const brandarray = [];
    brandvalues.forEach(item => {
      const x: { image: string, category_id: string } = { image: item.image, category_id: item.category_id };
      brandarray.push(x)
    });
    setBrand(brandarray)
    // console.log("Trending Gadget..."+homeresponse.feature_block[0].values)

  }
  // Render bottom carosul
  const RenderBottomCarosel = () => {
    return (
      <View marginT-10 marginB-10  >
        <MultipleCarousel
          style={{ marginLeft: 5, marginRight: 5 }}
          data={showbrand}
          renderItem={(item, index) => {
            //console.log('#### '+JSON.stringify(item.item.image));
            return (

              <Card bg-white marginB-10 onPress={
                () => { GotoCategory(item.item.category_id, 'TOP MODELS') }
              }>
                {/* <Image
                  style={styles.topmodel}
                  resizeMode='contain'
                  source={{ uri: item.item.image }}
                /> */}
              </Card>

            )
          }}
          itemWidth={0.5 * Math.round(Dimensions.get('window').width)}
          inActiveOpacity={0.5}
          containerWidth={Math.round(Dimensions.get('window').width) - 10}
          separatorWidth={0}
        />
      </View>
    )
  }

  // Render placeholder
  const ShowPlaceHolder = () => {
    return (
      <Placeholder></Placeholder>
    )
  }

  const ShowHomeContent = () => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View flex-1 bg-white >
          <ConnectionStatusBar></ConnectionStatusBar>
          <ScrollView testID="homescroll" style={{ flex: 1 }}>
            {RenderHome()}
          </ScrollView>
        </View>
        <View>

        </View>
      </SafeAreaView>
    )
  }

  // Navigate to category page with id
  const GotoCategory = (categoryid: number, title: string) => {
    const options = {
      topBar: {
        visible: false, height: 0,
        title: {
          text: title,
        },
      },
      bottomTabs: { visible: false, drawBehind: true, animate: true },
      layout: {
        orientation: ["portrait"],
      }
    }
    const passProps = {
      id: categoryid,
      title: title
    }
    navigatetoscreen(I18n.t('screenname.mobile'), componentId, options, passProps);

  }

  // Navigate to Deals page

  const _gotoDeals = () => {

    Navigation.push(componentId, {
      component: {
        id: 'dealsid',
        name: 'deals',
        options: {
          bottomTabs: {
            visible: false,
            drawBehind: true
          },
          topBar: {
            visible: false
          }
        }
      }
    });

  }

  //Redirect to productInfoPage
  const _productInfo = (item: any) => {
    const options = {
      topBar: {
        visible: false, height: 0,
      },
      bottomTabs: { visible: false, drawBehind: true, animate: true },
      layout: {
        orientation: ["portrait"],
      },
    }
    const passProps = {
      id: item.id,
    }
    navigatetoscreen(I18n.t('screenname.productinfo'), componentId, options, passProps)
  }

  // Homepage design layout
  const RenderHome = () => {
    return (
      <View style={styles.body}>

        <View>
          <Carousel containerStyle={{ height: 300 }}
            counterTextStyle={{ color: Colors.white }} pagingEnabled={true}
            // pageControlPosition={'under'}
            showCounter={true} animated={true}
            initialPage={0} loop allowAccessibleLayout autoplay={true}>
            {_.map(homeresponse.banners[0].values, (item: any, index: number) => {
              return (
                <TouchableOpacity key={index} style={{ flex: 1 }} padding-10
                  onPress={() => _productInfo(item)}>
                  <Image
                    style={StyleSheet.absoluteFillObject}
                    resizeMode='stretch'
                    source={{ uri: item.image }}
                  />
                </TouchableOpacity>
              );
            })}
          </Carousel>
        </View>

        <View>
          <Card containerStyle={styles.category__main} enableShadow={true}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity testID='mobile_category' onPress={() => {
                GotoCategory(153, 'Mobile')
              }}>
                <Image style={styles.categoryimage} resizeMode='contain' source={Images.mobile}></Image>

              </TouchableOpacity>
              <View center>
                <Text marginT-5>{I18n.t('home.mobile')}</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => {
                GotoCategory(359, 'Watch')
              }}>
                <Image style={styles.categoryimage} source={Images.gadget}></Image>
              </TouchableOpacity>
              <View center>
                <Text marginT-5>Watch</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => {
                GotoCategory(342, 'Audio')
              }}>
                <Image style={styles.categoryimage} source={Images.audio}></Image>
              </TouchableOpacity>
              <View center>
                <Text marginT-5>Audio</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => {
                GotoCategory(169, 'Tablets')
              }}>
                <Image style={styles.categoryimage} source={Images.tablests}></Image>
              </TouchableOpacity>
              <View center>
                <Text marginT-5>{I18n.t('home.tablets')}</Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => {
                GotoCategory(475, 'TV')
              }}>

                <Image style={styles.categoryimage} source={Images.tv}></Image>
              </TouchableOpacity>
              <View center>
                <Text marginT-5>{I18n.t('home.tv')}</Text>
              </View>
            </View>
          </Card>
        </View>


        <TouchableOpacity onPress={_gotoDeals}>
          <View style={styles.carousel__images__main} >
            <Text style={styles.heading}>Deals of The Day</Text>
            <Image style={styles.carousel__images} source={Images.special}></Image>
          </View>
        </TouchableOpacity>
        <View style={styles.carousel__images__main} >
          <Text style={styles.heading}>New Launches</Text>
          {
            (Coming_soon.length != 0) ? (
              <>
                <View>
                  <View style={{ width: '100%' }} marginL-7>
                    {/* <Image style={{ width: '100%', height: 200 }} source={{ uri: coming_soon[3].image }} /> */}
                    <Carousel borderRadius-50 containerStyle={{ height: 200, backgroundColor: 'white' }}
                      counterTextStyle={{ color: 'white' }} pagingEnabled={true} pageControlPosition={'over'}
                      initialPage={0} loop allowAccessibleLayout autoplay={true}>
                      {_.map(Coming_soon, (image: any, index: number) => {
                        return (
                          <View key={index} flex padding-10 bottom>
                            <Image
                              style={[StyleSheet.absoluteFillObject, styles.carousel__images]}
                              source={{ uri: image.image }}
                            />
                          </View>
                        );
                      })}
                    </Carousel>
                  </View>
                </View>
              </>) : null
          }
        </View>
        <TouchableOpacity>
          <View style={[styles.carousel__images__main, { marginTop: 50, marginBottom: 25 }]}>
            <Image style={styles.carousel__images} source={Images.nocostemi}></Image>
          </View>
        </TouchableOpacity>
        <View style={styles.carousel__images__main} >
          <Text style={styles.heading}>Discover</Text>
          {
            (Coming_soon2.length != 0) ? (
              <>
                <View>
                  <View style={{ width: '100%' }} margin-7>
                    {/* <Image style={{ width: '100%', height: 200 }} source={{ uri: coming_soon[3].image }} /> */}
                    <Carousel borderRadius-50 containerStyle={{ height: 200, backgroundColor: 'white' }}
                      counterTextStyle={{ color: 'white' }} pagingEnabled={true} pageControlPosition={'over'}
                      initialPage={0} loop allowAccessibleLayout autoplay={true}>
                      {_.map(Coming_soon2, (image: any, index: number) => {
                        return (
                          <View key={index} flex padding-10 bottom>
                            <Image
                              style={[StyleSheet.absoluteFillObject, styles.carousel__images]}
                              source={{ uri: image.image }}
                            />
                          </View>
                        );
                      })}
                    </Carousel>
                  </View>
                </View>
              </>) : null
          }
        </View>
        <TouchableOpacity>
          <View style={[styles.carousel__images__strip]}>
            <Image style={styles.carousel__images_banner} source={Images.newarrivals}></Image>
          </View>
        </TouchableOpacity>
        <View style={styles.carousel__images__main} >
          <Text style={styles.heading}>Star Products</Text>
          {
            (Coming_soon1.length != 0) ? (
              <>
                <View>
                  <View style={{ width: '100%' }} margin-7>
                    {/* <Image style={{ width: '100%', height: 200 }} source={{ uri: coming_soon[3].image }} /> */}
                    <Carousel borderRadius-50 containerStyle={{ height: 200, backgroundColor: 'white' }}
                      counterTextStyle={{ color: 'white' }} pagingEnabled={true} pageControlPosition={'over'}
                      initialPage={0} loop allowAccessibleLayout autoplay={true}>
                      {_.map(Coming_soon1, (image: any, index: number) => {
                        return (
                          <View key={index} flex padding-10 bottom>
                            <Image
                              style={[StyleSheet.absoluteFillObject, styles.carousel__images]}
                              source={{ uri: image.image }}
                            />
                          </View>
                        );
                      })}
                    </Carousel>
                  </View>
                </View>
              </>) : null
          }
        </View>
        {/* {RenderBanner(homeresponse.banners[4].values[0])} */}
        {/* {RenderTitle('emergingmodels')}
        <Homelist data={homeresponse.feature_block[0].values} componentId={componentId} />
        {RenderMore('more', homeresponse.feature_block[0].values, I18n.t('home.emergingmodels'))}
        {RenderTitle('latestlaunches')}
        <Homelist data={homeresponse.feature_block[1].values} componentId={componentId} />
        {RenderMore('more', homeresponse.feature_block[1].values, I18n.t('home.latestlaunches'))}
        {RenderBanner(homeresponse.banners[4].values[1])}
        {RenderBanner(homeresponse.banners[4].values[2])}
        {RenderTitle('homeentertainment')}
        <Homelist data={homeresponse.feature_block[2].values} componentId={componentId} />
        {RenderMore('more', homeresponse.feature_block[2].values, I18n.t('home.homeentertainment'))}
        {RenderBanner(homeresponse.banners[4].values[3])}
        {RenderTitle('fitband')}
        <Homelist data={homeresponse.feature_block[3].values} componentId={componentId} />
        {RenderMore('more', homeresponse.feature_block[3].values, I18n.t('home.fitband'))}

        {RenderTitle('trendinggadget')}
        <Homelist data={homeresponse.feature_block[5].values} componentId={componentId} />
        {RenderMore('more', homeresponse.feature_block[5].values, I18n.t('home.trendinggadget'))}
        {RenderTitle('shopbybrand')} */}
        <View>
          {RenderBottomCarosel()}
        </View>
      </View>
    )
  }

  // show placeholder until get home data
  return (
    getloading == false ?
      <View></View>
      :
      ShowHomeContent()
  )

};

// configuare home page navigation Bar
Home.options = {
  topBar: {
    visible: false,
    title: { component: { name: 'navHeader' } },
  }
}

export default Home;