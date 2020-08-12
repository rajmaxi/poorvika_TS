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
import I18n from 'locale/i18n';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


// Custom component with compare, filter & grid button 
// Receive componentId,showtoast,compare,setFilter,filter,setoverlay,changeView,loadGridOrList as Props
export default function productinfotopview(props: {
  componentId: string, showtoast: boolean, compare: boolean,
  setFilter: Function, filter: boolean, setoverlay: Function, changeView: Function, loadGridOrList: Function
}) {

  // if showtoast is true, show empty view
  if (props.showtoast == true) {
    return (
      <View></View>
    )
  }
  return (
    <View row style={styles.comp}>
      <Card
        row // control the children flow direction
        borderRadius={1}
        height={50}
        containerStyle={styles.comparecontainer}
        onPress={() => {
          {
            props.setoverlay()
          }

        }}>
        <MaterialCommunityIcons name="compare" color={'gray'} size={20} onPress={() => { }} />
        <Text text100BO normalText marginL-5 style={{ color: (props.compare == true ? Colors.orange10 : Colors.black), fontWeight: '600' }}>{I18n.t('category.compare')}</Text>

      </Card>

      <Card
        row // control the children flow direction
        borderRadius={1}
        height={50}
        containerStyle={styles.filtercontainer}
        onPress={() => {
          props.setFilter(true)
        }}
      >
        <MaterialCommunityIcons name="filter-variant" color={'gray'} size={20} onPress={() => { }} />
        <Text text100BO normalText marginL-10 style={{ color: (props.filter == true ? Colors.orange10 : Colors.black), fontWeight: '600' }}>{I18n.t('category.sort')}</Text>
      </Card>
      <Card
        row // control the children flow direction
        borderRadius={1}
        height={50}
        containerStyle={styles.listcontainer}
        onPress={() => {
          props.changeView()
        }}>
        {props.loadGridOrList()}
      </Card>

    </View>
  )
}