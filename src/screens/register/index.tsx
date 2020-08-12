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
import React, { useState, Component, useRef, createRef } from "react";
import {
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    Alert
} from "react-native";
import { Input } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, Button, } from 'react-native-ui-lib';
import COLOR from "utils/Color";
import { Navigation } from "react-native-navigation";
import ConnectionStatusBar from 'components/connectionstatusbar'
import { styles } from "./styles";
import I18n from 'locale/i18n';
import AppLogo from 'components/applogo';
import { registerNewUser } from "./service";
import SimpleHeader from 'components/simpleheader'

// class Register extends React.Component<Props, State> {
const Register: registertype = (registerprops): JSX.Element => {

    const maxNameLength = 3
    const alphabet = /^[A-Za-z]+$/
    const mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("");

    const [isLoading, setLoading] = useState(false)
    const [componentId, setcomponentId] = useState(registerprops.componentId)
    const [isNameErr, setNameErr] = useState(false)
    const [isEmailErr, setEmailErr] = useState(false)
    const [isMobileNumberErr, setMobileNumberErr] = useState(false)

    const emailField = createRef<Input>()
    const phoneField = createRef<Input>()

    /* empty Name textfield validation */
    const emptyValidateName = (name: string) => {
        if (name.length > 0) {
            setNameErr(false)
        } else {
            setNameErr(true)
        }
        setName(name)
    }

    /* empty Email textfield validation */
    const emptyValidateEmail = (email: string) => {
        if (email.length > 0) {
            setEmailErr(false)
        } else {
            setEmailErr(true)
        }
        setEmail(email)
    }

    /* empty Mobile Number textfield validation */
    const emptyValidateMobileNumber = (mobile: string) => {
        if (mobile.length > 0) {
            setMobileNumberErr(false)
        } else {
            setMobileNumberErr(true)
        }
        setPhonenumber(mobile)
    }

    /* Navigate to next screen*/
    const gotoScreen = (ScreenName: string) => {
        Navigation.push(componentId, {
            component: {
                name: ScreenName,
                options: { // Optional options object to configure the screen
                    topBar: {
                        title: {
                            text: ScreenName // Set the TopBar title of the new Screen
                        }
                    }
                },
                passProps: {
                    phonenumber: phonenumber
                }
            }
        })
    }

    /* signup button clicked */
    const signUpClicked = async () => {
        if (validateName() && validateMail() && validatePhone()) {
            var registerBody = {
                "firstname": name,
                "email": email,
                "mobilenumber": phonenumber,
                "agree": "1"
            }
            setLoading(true)
            const registerrResponse = await registerNewUser(registerBody)
            setLoading(false)
            const isSuccess = registerrResponse.success.success
            if (isSuccess == true) {
                gotoScreen('Otp')
            } else {
                Alert.alert(I18n.t('register.register_fail'))
            }
        } else {
            Alert.alert(I18n.t('register.valid_input'))
        }
    }

    /* validate name field */
    const validateName = () => {
        if (alphabet.test(name) && name.length >= maxNameLength) {
            return true
        }
        return false
    }

    /* validate email field */
    const validateMail = () => {
        if (mail.test(email)) {
            return true
        }
        return false
    }

    /* validate phone number field */
    const validatePhone = () => {
        const phone = /^[0-9]+$/
        if (phone.test(phonenumber) && phonenumber.length == 10) {
            return true
        }
        return false
    }

    return (
        <SafeAreaView style={styles.safearea}>
            <View style={styles.bgColor}>
            <SimpleHeader enableback={true} componentId={componentId} title=''></SimpleHeader>
                <ConnectionStatusBar />
                {isLoading &&
                    <View style={{
                        position: 'absolute',
                        zIndex: 1,
                        backgroundColor: COLOR.OP_BLACK,
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <ActivityIndicator animating={isLoading} size="large" color={COLOR.THEME} />
                    </View>
                }
                <ScrollView>
                    <AppLogo />
                    <View style={styles.headview}>
                        <Text text70 style={styles.headfont}>{I18n.t('register.createaccount')}</Text>
                    </View>
                    <View style={styles.registerform}>
                        <Input testID={'name'}
                            leftIcon={
                                <Icon
                                    name="person"
                                    color={COLOR.GRAY}
                                    size={25}
                                    style={{ backgroundColor: 'transparent', marginHorizontal: 15 }}
                                />
                            }
                            value={name}
                            keyboardAppearance="light"
                            autoFocus={false}
                            testID= "name"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                            returnKeyType="next"
                            inputStyle={styles.input}
                            inputContainerStyle={styles.forminput}
                            placeholder={I18n.t('register.name')}
                            placeholderTextColor={COLOR.GRAY}
                            onChangeText={text => emptyValidateName(text)}
                            onSubmitEditing={() => emailField.current?.focus()}
                            errorStyle={styles.inputerror}
                            errorMessage={
                                isNameErr ? I18n.t('register.empty_valid') : ''
                            } />
                        <Input testID={'email'}
                            leftIcon={
                                <Icon
                                    name="email"
                                    color={COLOR.GRAY}
                                    size={25}
                                    style={{ backgroundColor: 'transparent', marginHorizontal: 15 }}
                                />
                            }
                            value={email}
                            ref={emailField}
                            keyboardAppearance="light"
                            autoFocus={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            testID= "email"
                            keyboardType="email-address"
                            returnKeyType="next"
                            inputStyle={styles.input}
                            inputContainerStyle={styles.forminput}
                            placeholder={I18n.t('register.email')}
                            placeholderTextColor={COLOR.GRAY}
                            onChangeText={text => emptyValidateEmail(text)}
                            onSubmitEditing={() => phoneField.current?.focus()}
                            errorStyle={styles.inputerror}
                            errorMessage={
                                isEmailErr ? I18n.t('register.empty_valid') : ''
                            } />
                        <Input testID={'mobileno'}
                            leftIcon={
                                <Icon
                                    name="smartphone"
                                    color={COLOR.GRAY}
                                    size={25}
                                    style={{ backgroundColor: 'transparent', marginHorizontal: 15 }}
                                />
                            }
                            value={phonenumber}
                            ref={phoneField}
                            keyboardAppearance="light"
                            autoFocus={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="number-pad"
                            returnKeyType="next"
                            testID="mobileno"
                            inputStyle={styles.input}
                            inputContainerStyle={styles.forminput}
                            placeholder={I18n.t('register.phonenumber')}
                            placeholderTextColor={COLOR.GRAY}
                            onChangeText={text => emptyValidateMobileNumber(text)}
                            errorStyle={styles.inputerror}
                            errorMessage={
                                isMobileNumberErr ? I18n.t('register.empty_valid') : ''
                            } />

                    </View>
                    <View style={styles.registerformbutton}>
                        <Button testID={'register'}
                            label={I18n.t('register.register')}
                            onPress={() => signUpClicked()}
                            
                            backgroundColor={COLOR.THEME}
                            style={styles.registerbuttonstyle}
                        />
                    </View>
                </ScrollView>
                {/* </View> */}
            </View>
        </SafeAreaView>
    );
};

export default Register;
