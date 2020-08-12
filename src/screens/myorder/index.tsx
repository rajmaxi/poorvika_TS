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
import React, { useState, useEffect } from "react"
import { Text, View, TouchableOpacity, Card, Image } from "react-native-ui-lib"
import { SafeAreaView, Alert, ActivityIndicator } from "react-native"
import ConnectionStatusBar from "../../components/connectionstatusbar"
import { ScrollView } from "react-native-gesture-handler"
import { styles } from "./styles"
import { getOrders } from "./service"
import Placeholder from "components/placeholder"
import { Navigation } from "react-native-navigation"
import _ from 'lodash';
import SimpleHeader from 'components/simpleheader'

const MyOrder: MyOrderType = (myorderprops): JSX.Element => {
    const [componentId, setComponentId] = useState(myorderprops.componentId)
    const [orderList, setOrderList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        Navigation.mergeOptions(componentId, {
            topBar: {
                title: {
                    text: 'My Order',
                },
                hideOnScroll: false, drawBehind: false, animate: true,
            },
        });
    }, [])

    /* This function is used to navigate one screen to another screen by name */
    const gotoScreen = (ScreenName: string) => {
        Navigation.push(componentId, {
            component: {
                name: ScreenName,
                //passProps: ScreenName == 'Payments' ? { totalPrice: totalPrice } : {},
                options: { // Optional options object to configure the screen
                    topBar: {
                        visible: true,
                        title: {
                            text: ScreenName // Set the TopBar title of the screen
                        }
                    },
                    bottomTabs: { visible: false, drawBehind: true, animate: true },
                }
            }
        })
    }

    const navigateTo = (name: string) => {
        gotoScreen(name);
    }

    /* This function is used to get address data from api  */
    const getMyOrderContent = async () => {
        if (orderList.length > 1) {
            setIsLoading(false)
            return
        }
        const orderResponse = await getOrders()
        console.log('Order Response: '+orderResponse.data)
        const isSuccess = orderResponse.success
        const error = orderResponse.error
        const errorMsg = error[0]
        if (isSuccess == 0) {
            Alert.alert(errorMsg)
        } else {
            const addressList1 = orderResponse.data
            for (let index = 0; index < addressList1.length; index++) {
                const element = addressList1[index]
                orderList.push(element)
            }
            setIsLoading(false)
        }
    }

    /* design bottom cart details */
    const renderCartDetail = () => {
        return (
            <View>
                {_.map(orderList, (order: MyOrder, index: number) => {
                    return (
                        <Card paddingT-5 paddingB-5 marginV-5 borderRadius-30 onPress={() => { }}>
                            <View marginL-20 centerV paddingV-10>
                                {renderCartDesign(order)}
                            </View>
                        </Card>
                    )
                })}
            </View>
        )
    }

    /* design  bottom cart design row details */
    const renderCartDesign = (order: MyOrder) => {
        return (
            <View marginB-0 marginL-5 marginR-5 marginT-5>
                <TouchableOpacity activeOpacity={0.8} onPress={
                    () => {
                        // gotoScreen(rowData)
                    }
                }>
                    <View row flex-1>
                        <View style={styles.imagerow}>
                            <Image
                                source={order.product_info[0].image == 'null' ? { uri: require('../../images/default.png') } :
                                    order.product_info[0].image}
                                resizeMode={"contain"}
                                style={{
                                    width: '100%',
                                    height: undefined,
                                    aspectRatio: 1
                                }}
                                onError={() => { console.log('Error-> Image failed') }}
                            />
                        </View>

                        <View style={styles.datarow}>
                            <Text normalText style={{ fontSize: 18 }} grey numberOfLines={2} ellipsizeMode='tail'
                                marginB-5 marginT-15>{order.product_info[0].name} </Text>
                            {/* <Text marginB-5 grey20 heading>{order.date_added} </Text> */}
                            {/* <Text marginB-5 orange10 heading>Rs. {order.total} </Text> */}
                            <Text marginB-5 orange10 heading>{order.status} </Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }

    /* design placeholder */
    const showplaceholder = () => {
        getMyOrderContent()
        return (
            <View row style={{ backgroundColor: 'white', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size='small' />
            </View>
        )
    }

    /*design myorder page content */
    const showContent = () => {
        return (
            <SafeAreaView style={styles.safearea}>
                <View marginR-10 marginL-10 flex>
                <SimpleHeader enableback={true} componentId={componentId} title=''></SimpleHeader>
                    <ConnectionStatusBar />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View flex marginB-5>
                            {renderCartDetail()}
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    return (
        isLoading ?
            showplaceholder()
            :
            showContent()
    )
}

// const options = {

// }
// const passProps = {
// }

// MyOrder.options = {options}

export default MyOrder
