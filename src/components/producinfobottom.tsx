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
import React from 'react';
import { Colors, Card, Text, View } from 'react-native-ui-lib';
import styles from '../screens/home/mobile/styles'
import { navigatetoscreen } from 'navigation/navigatetoscreen'
import I18n from 'locale/i18n';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Custom component for create Compare Now button on bottom of the view
// Receive componentId,componentId as Props.
export default function productinfobottom(props: { componentId: string, comitems: Array<{ id: string, price: string }> }) {
  // check compare item length , if length is less than 2, show empty view
  if (props.comitems.length < 2) {
    return (
      <View></View>
    )
  }
  return (
    <View row style={styles.bottombutton}>
      <Card
        center
        flex-1
        row // control the children flow direction
        borderRadius={1}
        height={50}
        containerStyle={{
          marginRight: 0, backgroundColor: Colors.orange10
        }}
        onPress={() => {
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
          }
          navigatetoscreen('comparepage', props.componentId, options, passProps);

        }}>
        <MaterialCommunityIcons name="compare" color={'white'} size={20} onPress={() => { }} />
        <Text text100BO normalText marginL-0 marginR-0 style={{ fontWeight: '600', color: 'white' }}>{I18n.t('category.comparenow')}</Text>

      </Card>
    </View>
  )
}