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
import { SafeAreaView, StatusBar, FlatList, Platform, TouchableOpacity, ScrollView, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { Navigation } from "react-native-navigation";
import SmartGallery from "react-native-smart-gallery";
import { Colors, Typography, Swipable, Spacings, Button, Modal, Card, Image, Carousel, Text, View, LoaderScreen, LogService } from 'react-native-ui-lib';
//import styles from 'EcommerceApp/src/screens/more/styles'
import I18n from 'locale/i18n';
import _ from 'lodash';
import ConnectionStatusBar from 'components/connectionstatusbar'
import NetInfo from "@react-native-community/netinfo";
import PlaceHolder from 'components/placeholder'
import Ionicons from 'react-native-vector-icons/Ionicons';

const preview: previewtype = (previewprops) => {

  const [selindex, selectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showbar, setBar] = useState(false)

  const [images, setImages] = useState([])


  useEffect(() => {
    I18n.locale = 'fr'

  });

  // Custom function for change image 
  const UpdateImage = () => {
    var temp = [];
    for (var i = 0; i < previewprops.images.length; i++) {
      temp.push({ uri: previewprops.images[i] })
    }
    setLoading(true)
    setImages(temp)
  }

  if (loading == false) {
    UpdateImage()
    return (
      <PlaceHolder></PlaceHolder>
    )
  }

  // render top right layout
  const RenderTop = () => {
    return (
      <TouchableOpacity style={{
        flex: 1,
        position: 'absolute',
        right: 10,
        top: 12,
        height: 30,
        borderRadius: 5,
        backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center'
      }}>
        <Text normalText style={{ fontSize: 18, color: Colors.white }}> {selindex + 1}/{images.length} </Text>
      </TouchableOpacity>
    )

  }

  // render top left layout
  const RenderTopLeft = () => {

    return (
      <TouchableOpacity testID='close' style={{
        flex: 1,
        position: 'absolute',
        left: 10,
        top: 5,
        borderRadius: 5,
      }} onPress={() => {
        Navigation.pop(previewprops.componentId)
      }}>
        <Ionicons name="ios-close-circle" size={40} color="gray" />
      </TouchableOpacity>
    )
  }

  // Render preview image design
  return (
    <View flex-1 bg-white style={{ marginTop: Platform.OS === 'android' ? 0 : 30 }}>

      <SmartGallery
        style={{ flex: 1, backgroundColor: Colors.white }}
        images={images}
        loadMinimal={true}
        loadMinimalSize={2}
        index={previewprops.index}
        onSingleTapConfirmed={
          (index: number) => {
            (showbar == true ? setBar(false) : setBar(true))
          }
        }
        onPageSelected={(index: number) => {
          selectedIndex(index)
          //Alert.alert(''+selindex)
        }}
        sensitiveScroll={false}
      />

      {RenderTop()}

      {RenderTopLeft()}

    </View>

  );
}

/*Use Redux connect*/
export default preview;

