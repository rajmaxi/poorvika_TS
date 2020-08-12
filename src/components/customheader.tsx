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
import { Badge, withBadge, Icon } from 'react-native-elements'
import styles from 'screens/productinfo/styles'
import { useDispatch, useSelector } from "react-redux";
import { navigatetoscreen } from 'navigation/navigatetoscreen'

// Defined custom coponents for Header with custom design
// Custom components & receive Props componentId, title, 
export default function customheader(props: any) {
    const cartarray = useSelector((state: any) => state.cartstate.cartItem)
    const favarray = useSelector((state: any) => state.favouritestate.favItem)

    const CartIcon = withBadge(cartarray.length)(Icon);
    const FavIcon = withBadge(favarray.length)(Icon);
    const _cartView = async () => {
        Navigation.push(props.componentId, {
            component: {
                id: 'cartID',
                name: 'cart',
                passProps: {
                    showbar: true,
                    enableback: true,
                }, options: {
                    topBar: {
                        visible: false,
                        hideOnScroll: false, drawBehind: false, animate: true,
                    },
                    bottomTabs: { visible: false, drawBehind: true, animate: true },
                    layout: {
                        orientation: ["portrait"],
                    }
                }
            }
        });
    }

    return (
        <View paddingB-10 bg-white>
            <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View flex row paddingL-20 style={{ justifyContent: 'flex-start' }}>
                    <TouchableWithoutFeedback testID='gobackfromheader' onPress={() => {
                        Navigation.pop(props.componentId)
                    }}>
                        <View flex row style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Icon type='font-awesome' name="angle-left" size={30} color={Colors.orange10} />
                            <Text text60 orange10 marginL-5></Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <Text text60 numberOfLines={1} green10 marginL-20>
                </Text>
                <View flex row marginR-10 marginR-20 style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                    <View center marginT-2>
                        <TouchableWithoutFeedback testID='cartview' onPress={_cartView}>
                            {
                                (cartarray.length > 0) ?
                                    <CartIcon type="feather" name="shopping-cart" size={25} color='#9B9B9B' /> :
                                    <Icon
                                        name="shopping-cart"
                                        type='feather'
                                        size={25}
                                        color='#9B9B9B'
                                    />

                            }

                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
            <View>
                {
                    (props.title == '' ? <View ></View> : <Text numberOfLines={2} style={{ paddingLeft: 20, fontSize: 35, }} grey10 marginL-5 marginB-5>{props.title}</Text>)
                }
            </View>

        </View>
    )
}

