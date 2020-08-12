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
import React, { useState, createRef, useRef } from 'react';
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView, ActivityIndicator, ScrollView, Alert, AsyncStorage } from 'react-native';
import { Button, Text, View, TextField, TouchableOpacity, Assets } from 'react-native-ui-lib';
import { Navigation } from "react-native-navigation";
import { useSelector, useDispatch } from "react-redux";
import ConnectionStatusBar from 'components/connectionstatusbar'
import { styles } from './styles'
import COLOR from 'utils/Color'
import I18n from 'locale/i18n'
import AppLogo from 'components/applogo'
import config from "shared/ServiceConfig"
import { loginUser } from './service'
import { goToHome } from 'navigation/navigation'
import { isNull } from 'util';
import SimpleHeader from 'components/simpleheader'
import { getinfo ,addtocartapi, removecartapi } from 'screens/productinfo/service'

/* define password show hide icon */
Assets.loadAssetsGroup('icons.poorvika', {
  show: require('../../../src/images/icons/icon-show.png'),
  hide: require('../../../src/images/icons/icon-hide.png'),
});

const Login: logintype = (loginprops): JSX.Element => {

  /* Declare state and Update function, Useselector and useDispatch */
  //use registered uername & passowrd
  // const [username, setUsername] = useState("lakshmiparvathi@gmail.com")
  // const [password, setPassword] = useState("laks")

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  
  //const [username, setUsername] = useState("")
  //const [password, setPassword] = useState("")
  const [passwordvisible, setPasswordvisible] = useState(true)
  const [isLoading, setLoading] = useState(false)
  const [isUNameErr, setUNameErr] = useState(false)
  const [isPwdErr, setPwdErr] = useState(false)
  const [componentId, setcomponentId] = useState(loginprops.componentId)
  const favitems = useSelector((state: favItemState) => state.favouritestate.favItem)
  const cartitems = useSelector((state: cartItemState) => state.cartstate.cartItem)
  const passwordField = createRef<Input>()

  const dispatch = useDispatch()

  const getloading = useSelector(state => state.loginstate.isloading)

  /* validate username field  */
  const validateUsername = (uname: string) => {
    if (uname.length > 0) {
      setUNameErr(false)
    } else {
      setUNameErr(true)
    }
    setUsername(uname)
  }

  /* validate password field */
  const validatePassword = (password: string) => {
    if (password.length > 0) {
      setPwdErr(false)
    } else {
      setPwdErr(true)
    }
    setPassword(password)
  }

  /* show the user entered text in Password field */
  const showPassword = () => {
    if (passwordvisible) {
      setPasswordvisible(false)
    } else {
      setPasswordvisible(true)
    }
  }

  /* Validate field before login */
  const validateField = () => {
    if (username.length > 0 && password.length > 0) {
      return true
    }
    return false
  }

  const setLoggedIn = (isLogged: boolean) => {
    AsyncStorage.setItem(
      'loggeduser', username
    );
    config.setUserLogged(isLogged)
  }

  /* forgot password button clicked */
  const forgotPasswordClicked = () => {
    if (username.length > 0) {
      gotoScreen('ForgotPassword')
    } else {
      setUNameErr(true)
    }
  }

  /* login button clicked */
  const signInClicked = async () => {
    try {
      if (validateField()) {
        var loginBody = {
          "email": username,
          "password": password
        }
        setLoading(true)
        const loginResponse = await loginUser(loginBody)
        
        const isSuccess = loginResponse.success
        if (isSuccess == 1) {
         // console.log('success')
          setTimeout(async () => {
            dispatch({
              type: 'login',
              username: username,
              status: true,
            })
            dispatch({
              type: 'removeallcart'
            });
            await AsyncStorage.removeItem('cartitems');

            cartitems.forEach(async (element) => {
              const response = await addtocartapi(element.id,1);
            });

            await AsyncStorage.setItem('login', JSON.stringify({ status: true, name: username }));
            setLoading(false)
            goToHome()
          })
        } else {
          setLoggedIn(false)
          Alert.alert(
            I18n.t('login.login_fail'),
            loginResponse.error[0],
            [
              {
                text: 'Cancel',
                style: 'cancel'
              },
            ],
            { cancelable: false }
          );
        }
      } else {
        Alert.alert(I18n.t('login.valid_input'))
      }
    } catch (error) {
      //console.log('CATCH' + error)
    }
  }

  /* Navigate to next screen*/
  const gotoScreen = (ScreenName: string) => {
    Navigation.push(componentId, {
      component: {
        name: ScreenName,
        passProps: (ScreenName == 'ForgotPassword' || ScreenName == 'Otp') ?
          { phonenumber: username } : {},
        options: { // Optional options object to configure the screen'azzzzzdsxzxzdsza
          topBar: {
            visible: false, height: 0,
            title: {
              text: ScreenName // Set the TopBar title of the new Screen
            }
          }
        }
      }
    })
  }

  if (getloading == true) {
    return (
      <View testID={'overlayview'} style={{ flex: 1 }}>
        <ActivityIndicator
          style={styles.activityindicator}
          color='#bc2b78'
          size="large"
        />
      </View>
    )
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
        <SimpleHeader enableback={true} componentId={componentId} title=''></SimpleHeader>

          <ConnectionStatusBar />
          {/* <View style={styles.loginview}> */}
          {isLoading &&
            <View style={styles.loaderView}>
              <ActivityIndicator animating={isLoading} size="large" color={COLOR.THEME} />
            </View>
          }
          <ScrollView
            keyboardShouldPersistTaps="always">
            <AppLogo />
            <View style={styles.headview}>
              <Text style={styles.headfont}>{I18n.t('login.loginaccount')}</Text>
            </View>
            <View style={styles.loginform}>
              <Input testID={'username'}
                leftIcon={
                  <Icon
                    name="person"
                    color={COLOR.GRAY}
                    size={25}
                    style={{ backgroundColor: 'transparent', marginHorizontal: 15 }}
                  />
                }
                value={username}
                keyboardAppearance="light"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                inputStyle={styles.input}
                inputContainerStyle={styles.forminput}
                placeholder={I18n.t('login.emailmobilenumber')}
                placeholderTextColor={COLOR.GRAY}
                onChangeText={text => validateUsername(text)}
                onSubmitEditing={() => passwordField.current?.focus()}
                errorStyle={styles.inputerror}
                errorMessage={
                  isUNameErr ? I18n.t('login.empty_valid') : ''
                } />

              <Input testID={'password'}
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
                value={password}
                secureTextEntry={passwordvisible}
                ref={passwordField}
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType={"done"}
                inputStyle={styles.input}
                inputContainerStyle={styles.forminput}
                placeholder={I18n.t('login.password')}
                placeholderTextColor={COLOR.GRAY}
                onChangeText={(text: string) => validatePassword(text)}
                errorStyle={styles.inputerror}
                errorMessage={
                  isPwdErr ? I18n.t('login.empty_valid') : ''
                } />
            </View>
            <View style={styles.forgotpasswordview}>
              <TouchableOpacity testID="forgotPassword" onPress={() => forgotPasswordClicked()}>
                <Text style={styles.register}>
                  {I18n.t('login.forgotpassword')}
                </Text>
              </TouchableOpacity>
            </View>

            <View testID="loginview" style={styles.loginformbutton}>
              <Button
                style={styles.buttonwidth}
                labelStyle={styles.buttonlabel}
                label={I18n.t('login.login')}
                testID="homebutton"
                onPress={
                  () => {
                    signInClicked()
                  }
                }
                backgroundColor={COLOR.THEME}
                disabled={false}>
              </Button>
              <Text style={styles.or}>{I18n.t('login.or')}</Text>
              <Button
                style={styles.buttonwidth}
                labelStyle={styles.buttonlabel}
                label={I18n.t('login.getotp')}
                onPress={() => gotoScreen('Otp')}
                backgroundColor={COLOR.THEME}
                disabled={false}>
              </Button>
            </View>

            <View style={styles.registerview}>
              <Text>{I18n.t('login.donthaveaccount')}</Text>
              <TouchableOpacity testID="register" onPress={() => gotoScreen('Register')}>
                <Text
                  style={styles.register}
                  onPress={() => gotoScreen('Register')}>
                  {I18n.t('login.registernow')}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
};

export default Login;