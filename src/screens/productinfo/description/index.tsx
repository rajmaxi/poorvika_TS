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
import { SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { Colors, Typography, Spacings, Button, Modal, Card, Image, Carousel, Text, View, LoaderScreen } from 'react-native-ui-lib';
import I18n from 'locale/i18n';
import { WebView } from 'react-native-webview';
const description: descriptiontype = (descriptionprops) => {

  const [componentId, setComponentId] = useState(descriptionprops.componentId);

  useEffect(() => {
    I18n.locale = 'fr'
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html: '<head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>' + descriptionprops.htmlcontent }}
        automaticallyAdjustContentInsets={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        startInLoadingState={true}
        scalesPageToFit={true}
      />
    </SafeAreaView>
  );
}

export default description;

