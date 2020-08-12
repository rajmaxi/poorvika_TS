import React, { useState, useRef, useEffect } from "react";
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
import I18n from 'locale/i18n';
import AppLogo from 'components/applogo';
import SimpleHeader from 'components/simpleheader'
/* define password show hide icon */
Assets.loadAssetsGroup('icons.poorvika', {
    show: require('../../../src/images/icons/icon-show.png'),
    hide: require('../../../src/images/icons/icon-hide.png'),
});

const ForgotPassword: forgotpasswordtype = (forgotpasswordprops): JSX.Element => {

    const [newpassword, setNewpassword] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')
     const [passwordvisible, setPasswordvisible] = useState(true)
     const [conpasswordvisible, setConpasswordvisible] = useState(true)
    const [isConfirmPasswordErr, setConfirmPasswordErr] = useState(false)
    const [isNewPasswordErr, setNewpasswordErr] = useState(false)
    const [connected, setConnected] = useState(true)
    const [tempconnected, setConnectedtemp] = useState(true)
    const [componentId, setcomponentId] = useState(forgotpasswordprops.componentId)

    const confirmField = useRef(null)

    useEffect(() => {
        Navigation.mergeOptions(componentId, {
            bottomTabs: { visible: false, drawBehind: true, animate: false },
        });
    }, [])

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
                }
            }
        })
    }

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
 

    /* validate in Password field */
    function validateField() {
        if (newpassword == confirmpassword) {
            return true
        }
        return false
    }

    const forgotPasswordClicked = async () => {
        if (validateField()) {
            var body = {
                "email": forgotpasswordprops.phonenumber
            }
        } else {
            Alert.alert(I18n.t('forgotPassword.password_not_match'))
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

    const signUpClicked = () => {
    }
    return (
        <SafeAreaView style={styles.safearea}>
            
            <View flex-1>
            <SimpleHeader enableback={true} componentId={componentId} title=''></SimpleHeader>
                <ConnectionStatusBar />
                {/* <View style={[styles.container]}> */}
                <ScrollView>
                    <AppLogo />
                    <View style={styles.headview}>
                        <Text text70 style={styles.headfont}>{I18n.t('forgotPassword.forgotpasswordhead')}</Text>
                    </View>

                    <View style={styles.forgotform}>
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
                                  name={passwordvisible? "visibility":"visibility-off"}
                                  color={COLOR.GRAY}
                                  size={25}
                                  style={{ backgroundColor: 'transparent', marginHorizontal: 15 }}
                                />
                                </TouchableOpacity>
                              }
                            value={newpassword}
                            keyboardAppearance="light"
                            autoFocus={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            testID="newPassword"
                            keyboardType="default"
                            returnKeyType="next"
                            inputStyle={styles.input}
                            inputContainerStyle={styles.forminput}
                            placeholder={I18n.t('forgotPassword.newpassword')}
                            placeholderTextColor={COLOR.GRAY}
                            onChangeText={text => validateNewPassword(text)}
                           // onSubmitEditing={() => passwordField.current.focus()}
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
                                <TouchableOpacity onPress={() => showPassword()}>
                                  <Icon
                                  name={passwordvisible? "visibility":"visibility-off"}
                                  color={COLOR.GRAY}
                                  size={25}
                                  style={{ backgroundColor: 'transparent', marginHorizontal: 15 }}
                                />
                                </TouchableOpacity>
                              }
                            value={confirmpassword}
                            keyboardAppearance="light"
                            autoFocus={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                            returnKeyType="next"
                            testID="reenterPassword"
                            inputStyle={styles.input}
                            inputContainerStyle={styles.forminput}
                            placeholder={I18n.t('forgotPassword.reenterpassword')}
                            placeholderTextColor={COLOR.GRAY}
                            onChangeText={text => validateConfirmPassword(text)}
                            errorStyle={styles.inputerror}
                            errorMessage={
                                isConfirmPasswordErr ? I18n.t('forgotPassword.empty_valid') : ''
                            } />
                    </View>
                    <View style={styles.forgotbuttoncontainer}>
                        <Button
                            style={styles.buttonwidth}
                            labelStyle={styles.buttonlabel}
                            label={I18n.t('forgotPassword.change')}
                            testID= "forgotclicked"
                            onPress={() => forgotPasswordClicked()}
                            backgroundColor={COLOR.THEME}
                            disabled={false} />
                    </View>
                </ScrollView>
                {/* </View> */}
            </View>
        </SafeAreaView>
    );
};

export default ForgotPassword;

