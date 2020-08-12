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
import { FlatList, ActivityIndicator, TouchableOpacity, } from "react-native";
import React from 'react';
import { Colors, Card, Text, View } from 'react-native-ui-lib';
import styles from 'src/screens/productinfo/styles'
import { navigatetoscreen } from 'navigation/navigatetoscreen'
import I18n from 'locale/i18n';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Key feature component & received componentId, keypoints, attribute as Props.
export default function keyspec(props:
  {
    componentId: string,
    keypoints: Array<string>,
    attribute: Array<{ name: string, attribute: Array<{ attribute_id: string, name: string, text: string }> }>
  }) {
  // Check keypoints array length , if length ==0, will show Activity indicator
  if (props.keypoints.length == 0) {
    return (
      <View style={{ height: 200 }} center>
        <ActivityIndicator size='small' />
      </View>
    )
  }
  return (
    <Card
      borderRadius={1}
      containerStyle={styles.keyspeccontainer}

      enableShadow={true} >

      <Text text100BO normalText marginL-5 marginT-10 style={{ color: Colors.grey10, fontWeight: '600' }}>{I18n.t('productdetails.keyfeatures')}</Text>

      <FlatList
        style={styles.keylist}
        data={props.keypoints}
        horizontal={false}
        renderItem={({ item: rowData, index }) => {
          return (
            <View row marginB-5 marginR-10>
              {/* <Text style={{color: Colors.green10, }}>✓</Text> */}
              <Ionicons name="md-checkmark" size={17} style={{ color: Colors.green10, alignSelf: 'flex-start' }} />
              <Text normalText style={{ color: Colors.grey10, marginLeft: 5 }}> {rowData} </Text>
            </View>
          )
        }
        }></FlatList>

      <TouchableOpacity onPress={() => {
        const options = {
          topBar: {
            visible: false, animate: true,
            title: {
              text: 'productspec' // Set the TopBar title of the new Screen
            },
          },
          bottomTabs: { visible: false, drawBehind: true, animate: true },
        }

        const passProps = {
          passProps: {
            value: props.attribute,
          }
        }
        navigatetoscreen('productspec', props.componentId, options, passProps);
      }}>
        <View row marginR-20 marginB-20 marginT-20 style={{ alignSelf: 'flex-end' }}>
          <Text text100BO normalText marginR-5 style={{ color: Colors.orange10, alignSelf: 'flex-end', fontWeight: '600' }}>{I18n.t('productdetails.viewmore')}</Text>
          <Icon name="chevron-right" size={17} style={{ color: Colors.orange10, alignSelf: 'flex-end' }} />
        </View>
      </TouchableOpacity>

    </Card>
  )
}