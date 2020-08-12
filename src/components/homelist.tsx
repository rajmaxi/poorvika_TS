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
import { FlatList, TouchableOpacity } from "react-native";
import React from 'react';
import { Colors, Text, View, } from 'react-native-ui-lib';
import FastImage from 'react-native-fast-image'
import styles from '../../src/screens/home/styles'
import { navigatetoscreen } from 'navigation/navigatetoscreen'
// Flatlist, receive componetId & data as props.
export default function homelist(props: { componentId: string, data: homelisttype }) {

  // Navigate to productinfo screen with passProps & options
  const gotoProduct = (rowData: { product_id: string }) => {
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
      id: JSON.parse(rowData.product_id)
    }
    navigatetoscreen('productinfo', props.componentId, options, passProps)
  }

  // Flatlist item rendering function, Received item & index as props
  const renderItem = ({ item, index }) => {
    if (index > 3) {
      return (
        <View></View>
      )
    }
    return (
      <TouchableOpacity bg-white style={{ marginBottom: 1 }} activeOpacity={0.8}
        onPress={
          () => {
            gotoProduct(item)
          }
        }>
        <View bg-white style={styles.rowhead}>
          <View center bg-white padding-5 style={{ height: '70%' }}>

            <FastImage
              style={styles.image}
              source={{
                uri: item.thumb,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View style={{ height: '30%' }} center bg-white>
            <Text center marginB-5 marginT-0 numberOfLines={2}>{item.name}</Text>
            <Text center marginB-10 orange10 heading>{item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <FlatList
      style={{ backgroundColor: Colors.lightgrey, marginTop: 2 }}
      numColumns={2}
      data={props.data}
      scrollEnabled={false}
      keyExtractor={(item: homelisttype, index: number) => '' + index}
      renderItem={renderItem}
      keyExtractor={(item: homelisttype, index: number) => '' + index}
    />
  )
}