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
import React, { useState,Component, useEffect } from 'react';
import { SafeAreaView, StatusBar, AsyncStorage, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import {Colors, Typography, Spacings, Button, Modal, Card, Image, Carousel, Text, View, LoaderScreen} from 'react-native-ui-lib';
import I18n from 'locale/i18n';
import { WebView } from 'react-native-webview';
import { goToHome } from 'navigation/navigation';
import {gethomedata, getbrands, gettoken, forceupdateapi} from 'screens/home/service'
const axios = require('axios').default;
//import AsyncStorage  from "@react-native-community/async-storage";
const initialize: descriptiontype = (descriptionprops) =>
{

const [componentId, setComponentId] = useState(descriptionprops.componentId);
const cartarray = useSelector((state:cartItemState) => state.cartstate.cartItem)
const favarray = useSelector((state:favItemState) => state.favouritestate.favItem)
const login = useSelector((state:any) => state.loginstate.status)
const dispatch = useDispatch();

useEffect(() => {
  I18n.locale = 'fr'
   ResetCartItems()
},[]);

const tokenSet = async () => {
    console.log('Set token gobally')
    axios.interceptors.request.use(
        async config => {
            const token = await AsyncStorage.getItem("token")
            if (token) {
                config.headers.Authorization = "Bearer " + token
            } else {
                //console.log('config');
            }
            return config
        },
        error => {
            return Promise.reject(error)
        }
    );
}
  /* get & store token in async storage */
  const SetToken = async () =>
  { 
   // console.log('set tokem')
    const tokenresponse = await gettoken();
        await AsyncStorage.setItem(
          'token',
            JSON.parse(tokenresponse).data.access_token
        );
    tokenSet();
  }
   /* Restore cart items from async storage */
  const ResetCartItems = async () =>
  { 
    try {
      const value: any = await AsyncStorage.getItem('token');
      if(value !== null) 
            {
             // console.log('token----'+value)
              tokenSet()
            }
      else
          await SetToken() 

      const forceupdateresponse= await forceupdateapi('');
      //Alert.alert('Response '+forceupdateresponse.success)
    } catch (error) {
    } 
 }
 return(
     <View>
         {
           goToHome()  
         }
     </View>
 )
}

export default initialize;

