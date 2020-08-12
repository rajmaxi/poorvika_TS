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
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Text, View, TouchableOpacity, Card, Image, RadioButton } from "react-native-ui-lib"
import { SafeAreaView,ActivityIndicator, Alert } from "react-native"
import ConnectionStatusBar from "../../components/connectionstatusbar"
import { ScrollView } from "react-native-gesture-handler"
import { styles } from "./styles"
import { deleteAddress } from "../account/service"
import I18n from "locale/i18n"
import Icon from 'react-native-vector-icons/MaterialIcons'
import COLOR from "utils/Color"
import { getAddress } from "./service"
import Placeholder from "components/placeholder"
import { Navigation } from "react-native-navigation"
import _ from 'lodash';
import { navigatetoscreen } from "navigation/navigatetoscreen"
import SimpleHeader from 'components/simpleheader'

// var formatter = new Intl.NumberFormat('en-IN', {
//     minimumFractionDigits: 0,
//   });

const Checkout: CheckoutType = (CheckoutProps): JSX.Element => {
    const [componentId, setComponentId] = useState(CheckoutProps.componentId)
    // const [cartItems, setCartItems] = useState(CheckoutProps.cartitems)
    const cartItems = useSelector((state: cartItemState) => state.cartstate.cartItem)
    const [isLoading, setIsLoading] = useState(true)

    const [listAddress, setListAddress] = useState<UserAddress[]>([])
    const [selectedIndex, setSelectedIndex] = useState(0)
    let totalPrice = 0

    /* This function is used to navigate one screen to another screen by name */
    const gotoScreen = (ScreenName: string) => {
        Navigation.push(componentId, {
            component: {
                name: ScreenName,
                passProps: ScreenName == 'Payments' ? { totalPrice: totalPrice } : {},
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

    /* navigate to  Address page using listindex number*/
    const navigateToAddress = (index: number) => {
        Navigation.push(componentId, {
            component: {
                name: 'Address',
                passProps: {
                    address: (index >= 0) ? listAddress[index] : '',
                    callback: backToAccount
                },
                options: { // Optional options object to configure the screen
                    topBar: {
                        visible: false,
                        title: {
                            text: 'Address' // Set the TopBar title of the screen
                        }
                    }
                }
            }
        })
    }

    const backToAccount = () => {
        setIsLoading(true)
        getAddressContent()
    }

    /* This function is used to remove address data from list and api  */
    const deleteAddress1 = (id: number) => {
        Alert.alert(
            'Delete Address',
            'Are you sure want to delete this address ?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => deleteAddressDetail(id) },
            ],
            { cancelable: false }
        )

    }

    /* This function is used to remove address data from list and api   */
    const deleteAddressDetail = async (id: number) => {
        setListAddress(listAddress.filter(item => item.address_id !== id))
        const deleteAddressResponse = await deleteAddress(id)
        const isSuccess = deleteAddressResponse.success
        if (isSuccess == true) {
            console.log(I18n.t('account.delete_success'))
        } else {
            Alert.alert(I18n.t('account.delete_fail'))
        }
    }

    /* This function is used to get address data from api  */
    const getAddressContent = async () => {
        listAddress.splice(0, listAddress.length)
        const addressResponse = await getAddress()
        const isSuccess = addressResponse.success
        const error = addressResponse.error
        const errorMsg = error[0]
        if (isSuccess == 0) {
            Alert.alert(errorMsg)
        } else {
            setListAddress(addressResponse.data.addresses)
            setIsLoading(false)
        }
    }

    /* design add new address button row */
    const renderAddNewAddress = () => {
        return (
            <Card bg-white marginT-10 marginB-5>
                <TouchableOpacity centerV row onPress={() => { navigateToAddress(-1) }}>
                    <Icon name="add" size={25} color={'black'} style={{ margin: 15 }} />
                    <Text marginR15 color-black text70>{I18n.t('checkout.addnewaddress')}</Text>
                </TouchableOpacity>
            </Card>
        )
    }

    /* design address list row */
    const renderAddressDetail = (item: UserAddress) => {
        return (
            <View paddingL-20>
                <Text text70 style={styles.addressdetailtextname}>
                    {item.firstname + ' ' + item.lastname}
                </Text>
                <Text normalText style={styles.addressdetailtext}>
                    {item.address_1 + ',' + item.address_2}
                </Text>
                <Text normalText style={styles.addressdetailtext}>
                    {item.city + ',' + item.postcode}
                </Text>
                <Text normalText style={styles.addressdetailtext}>
                    {item.zone}
                </Text>
                <Text normalText style={styles.addressdetailtext}>
                    {item.mobilenumber}
                </Text>
            </View>
        )
    }

    /*design address detail using card ui */
    const renderAddress = () => {
        return (
            <View>
                {_.map(listAddress, (item: UserAddress, index: number) => {
                    return (
                        <Card paddingT-15 paddingB-15 marginV-5 borderRadius-30 row>
                            <View flex>
                                {renderAddressDetail(item)}
                                <View centerH row marginV-10 style={{ justifyContent: 'space-between' }}>
                                    <TouchableOpacity row marginH-10 style={styles.shadow} onPress={() => { navigateToAddress(index) }}>
                                        <Icon name="edit" size={25} style={{ color: COLOR.GRAY }} />
                                        <Text text70 style={styles.icontext}>
                                            {I18n.t('checkout.edit')}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity row marginH-10 style={styles.shadow} onPress={() => { deleteAddress1(item.address_id) }}>
                                        <Icon name="delete" size={25} style={{ color: COLOR.GRAY }} />
                                        <Text text70 style={styles.icontext}>
                                            {I18n.t('checkout.delete')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View flex centerV right marginB-20 marginR-20>
                                <RadioButton
                                    color={COLOR.THEME}
                                    selected={selectedIndex == index ? true : false}
                                    onPress={() => { setSelectedIndex(index) }}
                                />
                            </View>
                        </Card>
                    );
                })}
            </View>
        )
    }

    /* design cart design using card ui */
    const renderCartDetail = () => {
        return (
            <View>
                {_.map(cartItems, (cartItems: cartItemRowProps, index: number) => {
                    console.log("Checking.....>>"+cartItems.price)
                    var price=""+cartItems.price.replace("Rs.","").replace(",","");
                    totalPrice +=  price * parseInt(""+cartItems.quantity);
                    
                    return (
                        <Card paddingT-5 paddingB-5 marginV-5 borderRadius-30 onPress={() => { }}>
                            <View marginL-20 centerV paddingV-10>
                                <Text marginV-5 color-grey text70>{I18n.t('checkout.youritem')}</Text>
                                <View marginT-5 bg-black style={{ borderWidth: 0.2, borderColor: 'grey' }} />
                                {renderCartDesign(cartItems)}
                            </View>
                        </Card>
                    )
                })}
            </View>
        )
    }

    // goto product details screen
    const GotoScreen = (rowData: { id: number }) => {
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
            id: rowData.id,
        }
        navigatetoscreen(I18n.t('screenname.productinfo'), componentId, options, passProps)
    }
    /* design cart total amount details */
    const renderCartDesign = (cartItems: cartItemRowProps) => {
        return (
            <View marginB-0 marginL-5 marginR-5 marginT-5>
                <TouchableOpacity activeOpacity={0.8} onPress={
                    () => {
                        GotoScreen(cartItems)
                    }
                }>
                    <View row flex-1>
                        <View style={styles.imagerow}>
                            <Image
                                source={{ uri: cartItems.url, }}
                                resizeMode={"contain"}
                                style={{
                                    width: '100%',
                                    height: undefined,
                                    aspectRatio: 1
                                }}
                            />
                        </View>

                        <View style={styles.datarow}>
                            <Text normalText style={{ fontSize: 18 }} grey numberOfLines={2} ellipsizeMode='tail'
                                marginB-5 marginT-15>{cartItems.name}</Text>
                            <Text marginB-5 grey20 heading>{cartItems.by} </Text>
                            <Text marginB-5 orange10 heading>{cartItems.price} </Text>

                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }

    /* calculate price detail from cart */
    const renderPrice = () => {
        return (
            <View bg-white style={{ borderWidth: 0.3, borderColor: 'grey' }}>
                <View marginV-10 marginH-20 row>
                    <View flex left >
                        <Text text70 style={{ color: COLOR.BLACK, fontWeight: 'bold' }}>{I18n.t('checkout.subtotal')}</Text>
                    </View>
                    <View flex right>
                        <Text text70 style={{ color: COLOR.BLACK, fontWeight: 'bold' }}>Rs. {totalPrice}</Text>
                    </View>
                </View>
                <View marginV-10 marginH-20 row>
                    <View flex left>
                        <Text text70 style={{ color: COLOR.BLACK, fontWeight: 'bold' }}>{I18n.t('checkout.costofshipping')}</Text>
                    </View>
                    <View flex right>
                        <Text text70 style={{ color: COLOR.BLACK, fontWeight: 'bold' }}>Rs. 0</Text>
                    </View>
                </View>
                <View marginV-10 marginH-20 row>
                    <View flex left>
                        <Text text70 style={{ color: COLOR.BLACK, fontWeight: 'bold' }}>{I18n.t('checkout.total')}</Text>
                    </View>
                    <View flex right>
                        <Text text70 style={{ color: COLOR.BLACK, fontWeight: 'bold' }}>Rs. {totalPrice}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ backgroundColor: COLOR.THEME, height: 50 }} marginH-10 marginV-10 center onPress={() => { navigateTo('Payments') }}>
                    <Text text70 white>
                        {I18n.t('checkout.continue')}
                    </Text>
                </TouchableOpacity>
            </View>

        )
    }

    /* show placeholder */
    const showplaceholder = () => {
        getAddressContent()
        return (
            <View row style={{ backgroundColor: 'white', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size='small' />
            </View>
        )
    }

    /* design checkout page */
    const showContent = () => {
        return (
            <SafeAreaView style={styles.safearea}>
                <View style={styles.toolbar}>
                    <SimpleHeader enableback= {true} componentId={componentId} title='Confirm Address'></SimpleHeader>
                </View>
                <View marginR-10 marginL-10 flex>

                    <ConnectionStatusBar />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View flex marginB-5>
                            {renderAddNewAddress()}
                            {renderAddress()}
                            {renderCartDetail()}
                        </View>
                    </ScrollView>
                    {renderPrice()}
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

export default Checkout
