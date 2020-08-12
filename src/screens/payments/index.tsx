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
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Card, Image, RadioButton } from "react-native-ui-lib"
import { SafeAreaView, Alert } from "react-native"
import ConnectionStatusBar from "../../components/connectionstatusbar"
import { ScrollView } from 'react-native-gesture-handler'
import I18n from 'locale/i18n'
import { styles } from './styles';
import _ from 'lodash';
import COLOR from 'utils/Color';
import RazorpayCheckout from 'react-native-razorpay'

const Payment: PaymentType = (paymentsprops): JSX.Element => {
    const [componentId, setComponentId] = useState(paymentsprops.componentId)
    const [paymentType, setPaymentType] = useState(['Razor Pay', 'Net Banking', 'Cash on Delivery'])
    const [selectedIndex, setSelectedIndex] = useState(0)

    /* design payment deail row design */
    const renderPaymentType = () => {
        return (
            <View>
                {_.map(paymentType, (payment: string, index: number) => {
                    return (
                        <Card bg-white height={50} centerV marginT-10 marginB-5>
                            <TouchableOpacity marginL-10 row onPress={() => { setSelectedIndex(index) }}>
                                <RadioButton
                                    size={18}
                                    color={COLOR.THEME}
                                    selected={selectedIndex == index ? true : false}
                                    onPress={() => { setSelectedIndex(index) }}
                                />
                                <Text marginL-10 grey text70>{payment}</Text>
                            </TouchableOpacity>
                        </Card>
                    )
                })}
            </View>
        )
    }

    const navigateToPayment = () => {

        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_1DP5mmOlF5G5ag',
            amount: '5000',
            external: {
                wallets: ['paytm']
            },
            name: 'foo',
            prefill: {
                email: 'akshay@razorpay.com',
                contact: '8955806560',
                name: 'Akshay Bhalotia'
            },
            theme: { color: '#F37254' }
        }
        try {
            //RazorpayCheckout.myname(5)
            RazorpayCheckout.open(options).then((data: any) => {
                // handle success
                //Alert.alert(`Success: ${data.razorpay_payment_id}`);
            }).catch((error) => {
                // handle failure

            });
        }
        catch (error) {
            Alert.alert('' + error)
        }

    }


    /* design bottom cart details */
    const renderPrice = () => {
        return (
            <View bg-white style={{ borderWidth: 0.3, borderColor: 'grey' }}>
                <View marginV-10 marginH-20 row>
                    <View flex left >
                        <Text text70 style={{ color: COLOR.BLACK, fontWeight: 'bold' }}>{I18n.t('payments.subtotal')}</Text>
                    </View>
                    <View flex right>
                        <Text text70 style={{ color: COLOR.BLACK, fontWeight: 'bold' }}>Rs. {paymentsprops.totalPrice}</Text>
                    </View>
                </View>
                <View marginV-10 marginH-20 row>
                    <View flex left>
                        <Text text70 style={{ color: COLOR.BLACK, fontWeight: 'bold' }}>{I18n.t('payments.costofshipping')}</Text>
                    </View>
                    <View flex right>
                        <Text text70 style={{ color: COLOR.BLACK, fontWeight: 'bold' }}>Rs. 0</Text>
                    </View>
                </View>
                <View marginV-10 marginH-20 row>
                    <View flex left>
                        <Text text70 style={{ color: COLOR.BLACK, fontWeight: 'bold' }}>{I18n.t('payments.total')}</Text>
                    </View>
                    <View flex right>
                        <Text text70 style={{ color: COLOR.BLACK, fontWeight: 'bold' }}>Rs. {paymentsprops.totalPrice}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ backgroundColor: COLOR.THEME, height: 50 }} marginH-10 marginV-10 center onPress={() => { navigateToPayment() }}>
                    <Text text70 white>
                        {I18n.t('payments.continue')}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.safearea}>
            <View flex>
                <View marginR-10 marginL-10 flex>
                    <ConnectionStatusBar />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View flex marginB-5>
                            {renderPaymentType()}
                        </View>
                    </ScrollView>
                    {renderPrice()}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Payment