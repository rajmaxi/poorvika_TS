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

//import React, {Component} from 'react';
import React, { useState, useEffect } from 'react';
import I18n from 'locale/i18n';
import {
  SafeAreaView,
  ScrollView, FlatList, Dimensions,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import styles from './styles'
import { Colors, Text, View } from 'react-native-ui-lib';
import ConnectionStatusBar from 'components/connectionstatusbar'
import FastImage from 'react-native-fast-image'
import { navigatetoscreen } from 'navigation/navigatetoscreen'
import CustomHeader from 'components/customheader'
const moreproducts: moreproducttype = (moreproductprops) => {
  /*Define State, Function, use Redux*/

  const [componentId, setcomponentId] = useState(moreproductprops.componentId);
  I18n.locale = 'fr'
  //console.log('TITLE: '+moreproductprops.title)

  // Custom navigate function
  // Props: rowData
  const GotoScreen = (rowData: { name: string, price: string, product_id: string, thumb: string }) => {
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
      id: JSON.parse(rowData.product_id),
    }
    navigatetoscreen(I18n.t('screenname.productinfo'), componentId, options, passProps);
  }
  // render list
  // Props: data
  const RenderList = (data: Array<{ name: string, price: string, product_id: string, thumb: string }>) => {
    return (
      <FlatList
        style={{ backgroundColor: '#f0f0f5', marginTop: 2 }}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item: rowData, index: number }) => {
          //console.log('Row Data: '+rowData);

          return (
            <TouchableOpacity testID={rowData.product_id} style={{ marginBottom: 1 }} activeOpacity={.8}
              onPress={
                () => {
                  GotoScreen(rowData);
                }
              }>
              <View flex-1 bg-white style={{
                height: 250, width: Dimensions.get('window').width / 2,
                borderRadius: 2, marginLeft: 0, marginRight: 1,
              }}>
                <View center bg-white style={{ padding: 5, height: '70%' }}>

                  <FastImage
                    style={{ flex: 1, width: undefined, height: '100%', aspectRatio: 1 }}
                    source={{
                      uri: rowData.thumb,
                    }}

                    resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View center bg-white style={{ height: '30%' }}>
                  <Text textAlign center marginB-5 marginT-0 numberOfLines={2}>{rowData.name}</Text>
                  <Text textAlign center marginB-10 orange10 heading>{rowData.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => '' + index}
      />
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ConnectionStatusBar ></ConnectionStatusBar>
        <CustomHeader componentId={moreproductprops.componentId} title={moreproductprops.title}></CustomHeader>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
          onMomentumScrollBegin={() => { }}>
          <View style={styles.body}>

            <View>
              {RenderList(moreproductprops.data)}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );

};

export default moreproducts;