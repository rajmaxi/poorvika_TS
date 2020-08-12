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
import React, { useState } from "react";
import {
    ScrollView,
    SafeAreaView,
} from "react-native";
import { Text, View, TouchableOpacity, } from 'react-native-ui-lib';
import OTPInputView from 'react-native-otp-input';
import ConnectionStatusBar from 'components/connectionstatusbar'
import COLOR from "utils/Color";
import { styles } from "./styles";
import I18n from 'locale/i18n';
import AppLogo from 'components/applogo'
import { Navigation } from "react-native-navigation"

const Otp: LoginComponentType = (props): JSX.Element => {
    const [connected, setConnected] = useState(true)
    const [tempconnected, setConnectedtemp] = useState(true)
    const [otp, setOtp] = useState("")
    const [isDisbaled, setDisabled] = useState(true)
    const [componentId, setcomponentId] = useState(props.componentId)

    const validateOTP = (code: any) => {
        // Alert.alert(`Code is ${code}, you are good to go!`)
        // goToHome()
        // goToLogin();
    }

    /* Navigate to next screen*/
    const gotoScreen = (ScreenName: string) => {
        Navigation.push(componentId, {
            component: {
                name: ScreenName,
                options: { // Optional options object to configure the screen'azzzzzdsxzxzdsza
                    topBar: {
                        title: {
                            text: ScreenName // Set the TopBar title of the new Screen
                        }
                    }
                }
            }
        })
    }

    return (
        <SafeAreaView style={styles.safearea}>
            <View style={styles.bgColor}>
                <ConnectionStatusBar />
                {/* <View style={styles.otpview}> */}
                <ScrollView>
                    <AppLogo />
                    <View style={styles.headview}>
                        <Text text70 style={styles.headfont}>{I18n.t('otp.verifyotp')}</Text>
                        <Text text70 style={styles.phonenumber}>{props.phonenumber}</Text>
                    </View>
                    <View style={styles.otpform}>
                        <OTPInputView
                            style={styles.otpinput}
                            pinCount={4}
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeChanged={(code: any) => { setOtp(code) }}
                            onCodeFilled={((code: any) => validateOTP(code))}
                            placeholderCharacter={'*'}
                            selectionColor={COLOR.THEME}
                        />
                    </View>
                    {/* <View style={styles.resendcontainer}>
                            <Text>
                                {I18n.t('otp.didnotgetotp')}
                            </Text>
                            <Text style={styles.resendotp}>
                                {I18n.t('otp.resendotp')}
                            </Text>
                        </View> */}
                    <View style={styles.resendcontainer}>
                        <TouchableOpacity>
                            <Text style={styles.resendotp}>
                                {I18n.t('otp.resendotp')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            {/* </View> */}
        </SafeAreaView>
    );
};

export default Otp;

