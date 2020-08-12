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
import React, { useState, Component, useEffect, } from 'react';
import { useDispatch, useSelector } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import { Colors, Typography, Spacings, Button, Toast, Card, Image, Carousel, Text, View, LoaderScreen } from 'react-native-ui-lib';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView, Modal, Platform,
  Alert, FlatList, Dimensions, TextInput,
  ListView,
  StatusBar, TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Navigation } from "react-native-navigation"
import styles from './styles'
import { getsearchdata } from './service';
import _ from 'lodash';
import { navigatetoscreen } from 'navigation/navigatetoscreen'
const overlay: searchtypes = (searchprops) => {

  const [searchvalue, setSearchKey] = useState<string>('')
  const na = useSelector(state => state.comparestate.name);
  const [searchedAdresses, setSearchAddress] = useState<Array<{ produc_id: string, category_id: string }>>([])
  const [componentId, setComponentId] = useState(searchprops.componentId);

  const [address, setAddress] = useState<Array<{ produc_id: string, category_id: string }>>([])

  useEffect(() => {
    GetSearchDatas();
  }, []);

  // get autocompletesearch from api
  const GetSearchDatas = async () => {
    //console.log('before')
    const responseText: { data: Array<{ name: string, catid: string }> } = await getsearchdata();
    //console.log('Search Data '+responseText)
    var response = ''
    if (Platform.OS == 'android') {
      response = responseText.replace(/\r?\n/g, '').replace(/[\u0080-\uFFFF]/g, '');
      const temp = JSON.parse(response).data;
      setAddress(temp);
    }
    else {
      const temp = responseText.data;
      setAddress(temp);
    }
  }

  // search string 
  const Search = (searchString: string) => {
    console.log('Searching...' + searchString)

    if (searchString == '') {
      setSearchAddress([]);
    }
    else {
      var temp = [];

      address.forEach((item: { name: string }) => {
        if (item.name.includes(searchString))
          temp.push(item)
      });
      setSearchAddress(temp)
    }
  };

  // navigate to category & product screen
  const GoScreen = (id: string, catid: string, title: string) => {
    if (id == null || id == '') {
      // Navigate to category page with id
      Promise.all([
        Icon.getImageSource('search', 25),
        AntDesign.getImageSource('shoppingcart', 25),
      ]).then(([src, src1]) => {
        const options = {
          topBar: {
            title: {
              text: title,
            },
            rightButtons: [
              {
                id: 'search',
                icon: src,
                color: 'grey'
              },
              {
                id: 'cart',
                icon: src1,
                color: 'grey'
              },
            ],
          },
          bottomTabs: { visible: false, drawBehind: true, animate: true },
          layout: {
            orientation: ["portrait"],
          }
        }
        const passProps = {
          id: catid,
        }
        navigatetoscreen('mobile', componentId, options, passProps)
      });
    }
    else {
      const options = {
        topBar: {
          hideOnScroll: false, drawBehind: false, animate: true,
        },
        bottomTabs: { visible: false, drawBehind: true, animate: true },
        layout: {
          orientation: ["portrait"],
        },
      }
      const passProps = {
        id: id,
      }
      navigatetoscreen('productinfo', componentId, options, passProps)

    }
    //avigation.pop(searchprops.componentId)
  }
  // render back icon
  const RenderBackIcon = () => {
    if (searchvalue == '') {
      return (
        <Icon name="search" style={styles.search} size={20} onPress={() => {
        }} />
      )
    }
    else {
      return (
        <TouchableOpacity style={styles.back}
          onPress={
            () => {
              Navigation.pop(searchprops.componentId)
            }
          }>
          <Ionicons name="ios-arrow-back" style={{ marginLeft: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }} size={30} onPress={() => {
            Navigation.pop(searchprops.componentId)
          }} />
        </TouchableOpacity>
      )
    }
  }

  // render clear icon
  const RenderClearIcon = () => {
    if (searchvalue == '') {
      return (
        <View></View>
      )
    }
    else {
      return (
        <View center bg-white marginR-20>
          <MaterialCommunityIcons name="close" size={30} style={{ backgroundColor: 'white' }} onPress={() => {
            //Navigation.dismissOverlay(searchprops.componentId);
            setSearchKey('')
          }} />
        </View>
      )
    }
  }



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View row style={styles.viewstyle}>

        {RenderBackIcon()}
        <TextInput
          style={styles.textinput}
          value={searchvalue}
          onChangeText={(searchvalue) => {
            setSearchKey(searchvalue)
            Search(searchvalue)
          }}
          placeholder="Search" />
        {RenderClearIcon()}

      </View>

      <FlatList
        style={{ backgroundColor: Colors.white, marginTop: 0 }}
        //columnWrapperStyle={styles.row}
        showsHorizontalScrollIndicator={false}
        data={searchedAdresses}
        key={1}
        numColumns={1}
        renderItem={({ item: value, index: index }) => {
          //console.log('Item rendered.....')
          return (
            <TouchableOpacity activeOpacity={.8} onPress={
              () => {
                GoScreen(value.product_id, value.category_id, value.name)
              }
            }>
              <View row style={styles.row}>

                <Icon name="search" style={styles.searchicon} size={20} color={'gray'} onPress={() => {
                }}></Icon>
                <Text marginL-10 normalText>{value.name} {value.product_id}</Text>
              </View>
            </TouchableOpacity>
          )
        }
        } />
    </SafeAreaView>
  );

}
export default overlay;