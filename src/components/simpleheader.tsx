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
import { TouchableWithoutFeedback } from 'react-native'
import { Colors, View, Image } from 'react-native-ui-lib';
import { Text } from 'react-native-ui-lib'
import { Navigation } from "react-native-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Badge, withBadge, } from 'react-native-elements'
import { useDispatch, useSelector } from "react-redux";
// Custom component for Create Header instead of Top Bar
// Receive enableback, componentId,title as Props
export default function simpleheader(props: any) {
  const cartarray = useSelector((state: any) => state.cartstate.cartItem)
  const favarray = useSelector((state: any) => state.favouritestate.favItem)

  const CartIcon = withBadge(cartarray.length)(Icon);
  const FavIcon = withBadge(favarray.length)(Icon);

  return (
    <View paddingB-10 bg-white>

      {
        (props.enableback == true ?
          <View style={{ height: 50, flexDirection: 'row', alignItems: 'center' }}>
            <View flex row paddingL-20 >
              <TouchableWithoutFeedback testID='goback' onPress={() => {
                Navigation.pop(props.componentId)
              }}>
                <View flex row style={{ alignItems: 'center' }}>
                  <Icon name="angle-left" size={30} color={Colors.orange10} />
                  {/* <Text text60 orange10 marginL-5>Back</Text>
                            <Text text50 numberOfLines={1} grey10 marginL-20> {props.title}</Text> */}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          :
          <View></View>
        )
      }

      {
        (props.title == '' ? <View></View> : <Text style={{ paddingLeft: 20, fontSize: 40 }} grey10 marginL-5>{props.title}</Text>)
      }

    </View>
  )
}

