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
import { SafeAreaView, AsyncStorage, StatusBar, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Navigation } from "react-native-navigation";
import { connect } from 'react-redux'
import SideMenuItem from "components/sidemenuitem";
import { useDispatch, useSelector } from "react-redux";
import { Colors, Text, View, LoaderScreen } from 'react-native-ui-lib';
import styles from './styles'
import I18n from 'locale/i18n';
import { navigatetoscreen } from "navigation/navigatetoscreen";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { goToHome } from 'navigation/navigation'
import CustomHeader from 'components/customheader'
const more: MoreComponentType = (MoreComponentProps) => {

  const dispatch = useDispatch()
  const login = useSelector((state: any) => state.loginstate.status)



  useEffect(() => {
    //console.log('more useeffect called...',MoreComponentProps);
    I18n.locale = 'fr'
    Navigation.mergeOptions(MoreComponentProps.componentId, {
      bottomTab: {
        badge: ''
      },
    });
  }, [login]);

  const GotoScreen = (ScreenName: string) => {
    var title = ScreenName
    const options = {
      topBar: {
        visible: false, height: 0,
        title: {
          text: title,
        },
        hideOnScroll: false, drawBehind: false, animate: true,
      },
      bottomTabs: { visible: false, drawBehind: true, animate: true },
      layout: {
        orientation: ["portrait"],
      }
    }
    const passProps = {
    }
    navigatetoscreen(ScreenName, MoreComponentProps.componentId, options, passProps)
  }

  const CheckLogin = () => {
    if (login == true)
      return (<View></View>)
    else {
      return (
        <TouchableOpacity testID="login" onPress={() => { GotoScreen('Login') }}  >
          <View style={styles.rowItem}>
            <SimpleLineIcons name="login" size={20} color="grey" />
            <SideMenuItem text={I18n.t('more.login')}
              imagepath={require("EcommerceApp/src/images/imgs/ic_my_account.png")}></SideMenuItem>
          </View>
        </TouchableOpacity>
      )
    }
  }


  const MyOrders = () => {
    return (
      (login == true) ?
        <TouchableOpacity onPress={() => { GotoScreen('MyOrder') }}  >
          <View style={styles.rowItem}>
            <SimpleLineIcons name="bag" size={20} color="grey" />

            <SideMenuItem text={I18n.t('more.myorder')}></SideMenuItem>
          </View>
        </TouchableOpacity> :
        <View></View>
    )
  }


  const MyRewards = () => {
    return (
      (login == true) ?
        <TouchableOpacity onPress={() => { }}  >
          <View style={styles.rowItem}>
            <SimpleLineIcons name="rocket" size={20} color="grey" />
            <SideMenuItem text={I18n.t('more.rewards')}></SideMenuItem>
          </View>
        </TouchableOpacity> :
        <View></View>
    )
  }

  const CheckLogout = () => {
    if (login == true) {
      return (
        <TouchableOpacity onPress={() => {
          setTimeout(async () => {
            AsyncStorage.setItem('login', JSON.stringify({ status: false, name: '' }));
            dispatch({
              type: 'logout',
              status: false,

            })
          })
        }}>

          <View style={styles.rowItem}>
            <SimpleLineIcons name="logout" size={20} color="grey" />
            <SideMenuItem text={I18n.t('more.logout')}></SideMenuItem>
          </View>
        </TouchableOpacity>
      )
    }
    else {
      return (
        <View></View>
      )
    }
  }


  const MyAccount = () => {
    return (
      (login == true) ?
        <TouchableOpacity onPress={() => { GotoScreen('Account') }}>
          <View style={styles.rowItem}>
            <SimpleLineIcons name="user" size={20} color="grey" />

            <SideMenuItem text={I18n.t('more.myaccount')}
              imagepath={require("EcommerceApp/src/images/imgs/ic_my_account.png")}></SideMenuItem>
          </View>
        </TouchableOpacity> :
        <View></View>
    )
  }

  const gotoService = () => {
    Navigation.push(MoreComponentProps.componentId, {
      component: {
        id: 'serviceid',
        name: 'service',
        options: {
          bottomTabs: {
            visible: false,
            drawBehind: true
          }
        }
      }
    });
  }
  const gotoShowroom = () => {
    Navigation.push(MoreComponentProps.componentId, {
      component: {
        id: 'showroomid',
        name: 'showroom',
        options: {
          bottomTabs: {
            visible: false,
            drawBehind: true
          }
        }
      }
    });
  }

  // const gotoprivilege = () => {
  //   Navigation.push(MoreComponentProps.componentId, {
  //     component: {
  //       id: 'privilegeid',
  //       name: 'privilege',
  //       options: {
  //         bottomTabs: {
  //           visible: false,
  //           drawBehind: true
  //         }
  //       }
  //     }
  //   });
  // }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex-1 bg-white>

        <View style={styles.bottomtext}>
          <Text style={{ color: Colors.lightgrey, fontSize: 10 }}>Version1.0</Text>
        </View>
        <ScrollView style={{ marginTop: 10 }}>

          {CheckLogin()}
          {MyAccount()}
          {MyOrders()}
          {MyRewards()}
          <TouchableOpacity onPress={() => { GotoScreen('searchcategory') }}  >
            <View style={styles.rowItem}>
              <SimpleLineIcons name="grid" size={20} color="grey" />
              <SideMenuItem text={I18n.t('more.shop')}></SideMenuItem>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={gotoprivilege}>
            <View style={styles.rowItem}>
              <SimpleLineIcons name="badge" size={20} color="grey" />
              <SideMenuItem text={I18n.t('more.privilege')}></SideMenuItem>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={gotoService}  >
            <View style={styles.rowItem}>
              <SimpleLineIcons name="earphones-alt" size={20} color="grey" />
              <SideMenuItem text='Service Center'></SideMenuItem>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}  >
            <View style={styles.rowItem}>
              <SimpleLineIcons name="speech" size={20} color="grey" />
              <SideMenuItem text={I18n.t('more.feedback')}></SideMenuItem>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={gotoShowroom}  >
            <View style={styles.rowItem}>
              <SimpleLineIcons name="speech" size={20} color="grey" />
              <Text>Showroom</Text>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={gotoShowroom}  >
            <View style={styles.rowItem}>
              <Entypo name="shop" size={20} color="grey" />
              <SideMenuItem text='Showroom Locator'></SideMenuItem>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { GotoScreen('privilege') }}  >
            <View style={styles.rowItem}>
            <SimpleLineIcons name="badge" size={20} color="grey" />
              <SideMenuItem text={I18n.t('more.privilege')}></SideMenuItem>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress = {}  >
                      <View style={styles.rowItem}>
                      <SimpleLineIcons name="speech" size={20} color="grey" />
                          <Text>Service</Text>
                         
                        </View>
                </TouchableOpacity> */}

          {CheckLogout()}

        </ScrollView>


      </View>
    </SafeAreaView>
  );
}
more.options = {
  topBar: {
    visible: false, height: 0,
    title: { component: { name: 'navHeader' } },
  }
}

/*Use Redux connect*/
export default more;

