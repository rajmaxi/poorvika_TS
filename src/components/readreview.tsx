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
import styles from '../screens/productinfo/styles'
import { navigatetoscreen } from 'navigation/navigatetoscreen'
import I18n from 'locale/i18n';

// Custom component to show user reviews
// Receive componentId, reviewdata as Props

export default function readreview(props: { componentId: string, reviewdata: { rating: string, date_added: string, text: string } }) {
  if (props.reviewdata == null || props.reviewdata.length <= 0) {
    return (
      <View></View>
    )
  }
  else {
    return (
      <View style={{ backgroundColor: 'lightgray' }}>
        <View>
          <FlatList
            style={{ backgroundColor: 'white', }}
            data={props.reviewdata}
            renderItem={({ item: rowData, index }) => {
              if (index > 1) {
                return (
                  <View></View>
                )
              }
              return (
                <View marginB-10 marginT-10 maringR-5>
                  <View row marginL-10 marginR-10 flex-1 style={{ justifyContent: 'space-between' }}>
                    <View row center>
                      <View row center marginL-5 width-70 height-25 style={{ borderRadius: 5, backgroundColor: Colors.green10, }}>
                        <Text text100BO normalText style={{ color: Colors.white, fontWeight: '600' }}> {rowData.rating} ★</Text>
                      </View>
                      <Text normalText marginL-10>{rowData.author}</Text>
                    </View>
                    <Text marginL-10 ormalText style={{ alignSelf: 'flex-end' }}>{rowData.date_added}</Text>
                  </View>
                  <Text normalText marginL-10 marginT-10>{rowData.text}</Text>
                  {/* {renderSeparator()}  */}
                </View>
              );
            }
            }>
          </FlatList>
        </View>
        <View style={styles.allreviews}>
          <TouchableOpacity flex-1 bg-white style={{ flex: 1, borderColor: 'gray', justifyContent: 'center', alignItems: 'center', }}
            onPress={() => {
              const options = {
                topBar: {
                  visible: false,
                  height: 0,
                  title: {
                    text: 'All Reviews' // Set the TopBar title of the new Screen
                  },
                },
                bottomTabs: { visible: false, drawBehind: true, animate: true }
              }
              const passProps = {
                data: props.reviewdata
              }
              navigatetoscreen('review', props.componentId, options, passProps);
            }}>
            <View>
              <Text text100BO normalText marginL-5 style={{ color: Colors.orange10, fontWeight: '600' }}>{I18n.t('productdetails.readall')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}