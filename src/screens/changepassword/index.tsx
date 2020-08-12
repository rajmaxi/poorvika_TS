
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
import React, { useState, useRef, useEffect, createRef } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Alert
} from "react-native";
import { Icon, Input } from "react-native-elements";
import { Button, Text, TextField, Assets, TouchableOpacity } from 'react-native-ui-lib';
import COLOR from "utils/Color";
import { Navigation } from "react-native-navigation";
import ConnectionStatusBar from 'components/connectionstatusbar'
import NetInfo from "@react-native-community/netinfo";
import { styles } from "./styles";
import { changePassword } from "./service";
import I18n from 'locale/i18n';
import AppLogo from 'components/applogo';
import { goToHome } from 'navigation/navigation'
import SimpleHeader from 'components/simpleheader'

/* define password show hide icon */
Assets.loadAssetsGroup('icons.poorvika', {
    show: require('../../../src/images/icons/icon-show.png'),
    hide: require('../../../src/images/icons/icon-hide.png'),
});

const ChangePassword: changepasswordtype = (changepasswordprops): JSX.Element => {

    const [newpassword, setNewpassword] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')
    const [passwordvisible, setPasswordvisible] = useState(true)
    const [conpasswordvisible, setConpasswordvisible] = useState(true)
    const [isConfirmPasswordErr, setConfirmPasswordErr] = useState(false)
    const [isNewPasswordErr, setNewpasswordErr] = useState(false)
    const [componentId, setcomponentId] = useState(changepasswordprops.componentId)
    const [isLoading, setLoading] = useState(false)
    let confirmRef = createRef<Input>()
    useEffect(() => {
        Navigation.mergeOptions(componentId, {
            bottomTabs: { visible: false, drawBehind: true, animate: false },
        });
    }, [])

    /* show the user entered text in Password field */
    const showPassword = () => {
        if (passwordvisible) {
            setPasswordvisible(false)
        } else {
            setPasswordvisible(true)
        }
    }

    /* show the user entered text in Confirm Password field */
    const showConPassword = () => {
        if (conpasswordvisible) {
            setConpasswordvisible(false)
        } else {
            setConpasswordvisible(true)
        }
    }

    /* validate in Password field */
    function validateField() {
        if (newpassword == confirmpassword) {
            return true
        }
        return false
    }

    /* validate an empty textfield */
    const validateNewPassword = (password: string) => {
        if (password.length > 0) {
            setNewpasswordErr(false)
        } else {
            setNewpasswordErr(true)
        }
        setNewpassword(password)
    }
    /* validate an empty textfield */
    const validateConfirmPassword = (password: string) => {
        if (password.length > 0) {
            setConfirmPasswordErr(false)
        } else {
            setConfirmPasswordErr(true)
        }
        setConfirmpassword(password)
    }


    /* change the password on database */
    const changePasswordClicked = async () => {
        if (validateField()) {
            var changePasswordBody = {
                "password": newpassword,
                "confirm": confirmpassword
            }
            setLoading(true)
            const changePasswordResponse = await changePassword(changePasswordBody)
            setLoading(false)
            const isSuccess = changePasswordResponse.success
            if (isSuccess == 1) {
                Alert.alert(I18n.t('changePassword.changePassword_success'))
                goToHome()
            } else {
                Alert.alert(I18n.t('changePassword.changePassword_fail'))
            }
        } else {
            Alert.alert(I18n.t('changePassword.password_not_match'))
        }
    }

    // Change Bottom Tab color when selecting
    Navigation.events().registerBottomTabSelectedListener(() => {
        Navigation.mergeOptions(componentId, {
            bottomTab: {
                selectedTextColor: 'rgb(103,57,255)',
                selectedIconColor: 'rgb(103,57,255)',
            },
        });
    });

    return (
        <SafeAreaView style={styles.safearea}>
            <View>
            <SimpleHeader enableback={true} componentId={componentId} title=''></SimpleHeader>
                <ConnectionStatusBar />
                {/* <View style={[styles.container]}> */}
                <ScrollView testID="passscroll">
                    <AppLogo />
                    <View style={styles.headview}>
                        <Text text70 style={styles.headfont}>{I18n.t('changePassword.changepasswordhead')}</Text>
                    </View>

                    <View style={styles.changeform}>

                        <Input testID={'newPassword'}
                            leftIcon={
                                <Icon
                                    name="lock-outline"
                                    color={COLOR.GRAY}
                                    size={25}
                                    style={{ backgroundColor: 'transparent', marginHorizontal: 15 }}
                                />
                            }
                            rightIcon={
                                <TouchableOpacity onPress={() => showPassword()}>
                                    <Icon
                                        name={passwordvisible ? "visibility" : "visibility-off"}
                                        color={COLOR.GRAY}
                                        size={25}
                                        style={{ backgroundColor: 'transparent', marginHorizontal: 15 }}
                                    />
                                </TouchableOpacity>
                            }
                            value={newpassword}
                            secureTextEntry={passwordvisible}
                            keyboardAppearance="light"
                            autoFocus={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                            returnKeyType="next"
                            testID = "newPassword"
                            inputStyle={styles.input}
                            inputContainerStyle={styles.forminput}
                            placeholder={I18n.t('forgotPassword.newpassword')}
                            placeholderTextColor={COLOR.GRAY}
                            onChangeText={text => validateNewPassword(text)}
                            onSubmitEditing={() => confirmRef.current.focus()}
                            errorStyle={styles.inputerror}
                            errorMessage={
                                isNewPasswordErr ? I18n.t('forgotPassword.empty_valid') : ''
                            } />
                        <Input testID={'reenterPassword'}
                            leftIcon={
                                <Icon
                                    name="lock-outline"
                                    color={COLOR.GRAY}
                                    size={25}
                                    style={{ backgroundColor: 'transparent', marginHorizontal: 15 }}
                                />
                            }
                            rightIcon={
                                <TouchableOpacity onPress={() => showConPassword()}>
                                    <Icon
                                        name={conpasswordvisible ? "visibility" : "visibility-off"}
                                        color={COLOR.GRAY}
                                        size={25}
                                        style={{ backgroundColor: 'transparent', marginHorizontal: 15 }}
                                    />
                                </TouchableOpacity>
                            }
                            value={confirmpassword}
                            secureTextEntry={conpasswordvisible}
                            ref={confirmRef}
                            keyboardAppearance="light"
                            autoFocus={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                            returnKeyType="next"
                            testID="reenterPassword"
                            inputStyle={styles.input}
                            inputContainerStyle={styles.forminput}
                            placeholder={I18n.t('changePassword.reenterpassword')}
                            placeholderTextColor={COLOR.GRAY}
                            onChangeText={text => validateConfirmPassword(text)}
                            errorStyle={styles.inputerror}
                            errorMessage={
                                isConfirmPasswordErr ? I18n.t('changePassword.empty_valid') : ''
                            } />

                    </View>
                    <View style={styles.changebuttoncontainer}>
                        <Button label={I18n.t('changePassword.change')}
                            onPress={() => changePasswordClicked()}
                            style={styles.changebutton}
                            testID="change"
                            backgroundColor={COLOR.THEME}
                            testID={'change'}
                        />
                    </View>
                </ScrollView>
                {/* </View> */}
            </View>
        </SafeAreaView>
    );
};

export default ChangePassword;

