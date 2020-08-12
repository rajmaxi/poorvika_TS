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
import React, { useState, useEffect, createRef } from "react"
import {
    SafeAreaView,
    ScrollView,
    View,
    Alert,
    ActivityIndicator
} from "react-native"
import { Icon, Input, Text } from "react-native-elements";
import { Button, Assets, Picker, TouchableOpacity } from 'react-native-ui-lib'
import COLOR from "utils/Color"
import { Navigation } from "react-native-navigation"
import Connectionstatusbar from 'components/connectionstatusbar'
import { styles } from "./styles"
import I18n from 'locale/i18n'
import { updateAddress, getCountry, getState, addAddress } from "./service";
import _ from 'lodash'
import SimpleHeader from 'components/simpleheader'

/* define password show hide icon */
Assets.loadAssetsGroup('icons.poorvika', {
    dropdown: require('../../../src/images/icons/icon-drop.png'),
});

const Address: addresstype = (addressprops): JSX.Element => {

    const maxNameLength = 3
    const alphabet = /^[A-Za-z]+$/

    const [addressId, setAddressId] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [city, setCity] = useState("")
    const [pincode, setPincode] = useState("")
    const [zone, setZone] = useState("")
    const [country, setCountry] = useState("")
    const [countryId, setCountryId] = useState("")
    const [zoneId, setZoneId] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [listCountry, setListCountry] = useState<Country[]>([])
    const [listState, setListState] = useState<Zone[]>([])

    const [isFirstNameErr, setFirstNameErr] = useState(false)
    const [isLastNameErr, setLastNameErr] = useState(false)
    const [isAddress1Err, setAddress1Err] = useState(false)
    const [isAddress2Err, setAddress2Err] = useState(false)
    const [isCityErr, setCityErr] = useState(false)
    const [isPincodeErr, setPincodeErr] = useState(false)
    const [isCountryErr, setCountryErr] = useState(false)
    const [isZoneErr, setZoneErr] = useState(false)
    const [isPhoneNumberErr, setPhoneNumberErr] = useState(false)

    const [componentId, setcomponentId] = useState(addressprops.componentId)

    let fnameRef = createRef<Input>()
    let lnameRef = createRef<Input>()
    let phoneRef = createRef<Input>()
    let address1Ref = createRef<Input>()
    let address2Ref = createRef<Input>()
    let cityRef = createRef<Input>()
    let countryRef = createRef<Input>()
    let zoneRef = createRef<Input>()
    let pincodeRef = createRef<Input>()

    /* props data set to variable */
    useEffect(() => {
        Navigation.mergeOptions(componentId, {
            bottomTabs: { visible: false, drawBehind: true, animate: false },
        });

        if (addressprops.address) {
            setAddressId(addressprops.address.address_id)
            setName(addressprops.address.firstname)
            setLastName(addressprops.address.lastname)
            setPhonenumber(addressprops.address.mobilenumber)
            setAddress1(addressprops.address.address_1)
            setAddress2(addressprops.address.address_2)
            setCity(addressprops.address.city)
            setPincode(addressprops.address.postcode)
            setZone(addressprops.address.zone)
            setZoneId(addressprops.address.zone_id)
            setCountry(addressprops.address.country)
            setCountryId(addressprops.address.country_id)
        }
        getCountryList()
    }, [])

    /* validate an empty textfield */
    const validateFirstName = (firstName: string) => {
        if (firstName.length > 0) {
            setFirstNameErr(false)
        } else {
            setFirstNameErr(true)
        }
        setName(firstName)
    }

    /* validate an empty textfield */
    const validateLastName = (lastName: string) => {
        if (lastName.length > 0) {
            setLastNameErr(false)
        } else {
            setLastNameErr(true)
        }
        setLastName(lastName)
    }

    /* validate an empty textfield */
    const validateAddress1 = (address1: string) => {
        if (address1.length > 0) {
            setAddress1Err(false)
        } else {
            setAddress1Err(true)
        }
        setAddress1(address1)
    }

    /* validate an empty textfield */
    const validateAddress2 = (address2: string) => {
        // if (address2.length > 0) {
        //     setAddress2Err(false)
        // } else {
        //     setAddress2Err(true)
        // }
        setAddress2(address2)
    }

    /* validate an empty textfield */
    const validateCity = (city: string) => {
        if (city.length > 0) {
            setCityErr(false)
        } else {
            setCityErr(true)
        }
        setCity(city)
    }

    /* validate an empty textfield */
    const validatePinCode = (pinCode: string) => {
        if (pinCode.length > 0) {
            setPincodeErr(false)
        } else {
            setPincodeErr(true)
        }
        setPincode(pinCode)
    }

    /* validate an empty textfield */
    const validatePhoneNumber = (phoneNumber: string) => {
        if (phoneNumber.length > 0) {
            setPhoneNumberErr(false)
        } else {
            setPhoneNumberErr(true)
        }
        setPhonenumber(phoneNumber)
    }

    /* validate an empty textfield */
    const validateCountry = (country: string) => {
        if (country.length > 0) {
            setCountryErr(false)
        } else {
            setCountryErr(true)
        }
        setName(country)
    }

    /* validate an empty textfield */
    const validateZone = (zone: string) => {
        if (zone.length > 0) {
            setZoneErr(false)
        } else {
            setZoneErr(true)
        }
        setZone(zone)
    }


    /* fetch country list */
    const getCountryList = async () => {
        const countryResponse = await getCountry()
        const isSuccess = countryResponse.success
        const error = countryResponse.error;
        const errorMsg = error[0]
        if (isSuccess == 0) {
            Alert.alert(errorMsg)
        } else {
            listCountry.splice(0, listCountry.length)
            setListCountry(countryResponse.data)
        }
    }

    /* load state list from database based on user select country*/
    const getStateList = async (countryid: string) => {
        const stateResponse = await getState(countryid)
        const isSuccess = stateResponse.success
        const error = stateResponse.error;
        const errorMsg = error[0]
        if (isSuccess == 0) {
            Alert.alert(errorMsg)
        } else {
            listState.splice(0, listState.length)
            setListState(stateResponse.data.zone)
        }
    }

    /* update button clicked */
    const addEditAddress = async () => {
        if(name.length==0 || lastName.length==0 || phonenumber.length==0 || address1.length==0 || city.length==0 || pincode.length==0 || countryId.length==0 || zoneId.length ==0 )
        {
            Alert.alert(I18n.t('address.all_empty'))
        }
        else{
        try {
            var updateBody = {
                "firstname": name,
                "lastname": lastName,
                "mobilenumber": phonenumber,
                "company": "",
                "address_1": address1,
                "address_2": address2,
                "city": city,
                "postcode": pincode,
                "country_id": countryId,
                "zone_id": zoneId
            }
            setLoading(true)
            if (addressprops.address) {
                const addressResponse = await updateAddress(updateBody, addressId)
                setLoading(false)
                const isSuccess = addressResponse.success

                if (isSuccess == 1) {
                    navigateBack()
                    // Alert.alert(I18n.t('address.update_success'), "", [
                    //     { text: 'OK', onPress: () =>  navigateBack() },
                    // ],
                    //     { cancelable: false }
                    // )
                } else {
                    Alert.alert(
                        I18n.t('address.update_fail'),
                        addressResponse.error[0],
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
                const addressResponse = await addAddress(updateBody)
                setLoading(false)
                const isSuccess = addressResponse.success

                if (isSuccess == 1) {
                    navigateBack();
                    // Alert.alert(I18n.t('address.add_success'), "", [
                    //     { text: 'OK', onPress: () =>  navigateBack() },
                    // ],
                    //     { cancelable: false }
                    // )
                } else {
                    Alert.alert(
                        I18n.t('address.add_fail'),
                        addressResponse.error[0],
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel'
                            },
                        ],
                        { cancelable: false }
                    )
                }
            }
        } catch (error) {
            Alert.alert(I18n.t('address.add_fail'))
        }
    }
}

    const navigateBack = () => {
        addressprops.callback()
        Navigation.pop(componentId)
    }

    /*set state and state id based on dropdown select state */
    const onPickerStateValueChange = (item: PickerObject) => {
        setZone(item.label)
        setZoneId(item.value)
    }

    /*set country and country id based on dropdown select country */
    const onPickerCountryValueChange = (item: PickerObject) => {
        setCountry(item.label)
        setCountryId(item.value)
        setZone("")
        setZoneId("")
        getStateList(item.value)
    }

    return (
        <SafeAreaView style={styles.safearea}>
            <View testID="containerView" style={styles.bgColor}>
            <SimpleHeader enableback={true} componentId={componentId} title='Address'></SimpleHeader>
                <Connectionstatusbar />
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
                <ScrollView testID="addressscroll">
                    <View style={styles.addressform}>
                    
                        <Input testID={'firstname'}
                            leftIcon={
                                <Icon
                                    name="person"
                                    color={COLOR.GRAY}
                                    size={25}
                                    style={{ backgroundColor: 'transparent', marginHorizontal: 15 }}
                                />
                            }
                            value={name}
                            ref={fnameRef}
                            keyboardAppearance="light"
                            autoFocus={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                            returnKeyType="next"
                            testID="firstname"
                            inputStyle={styles.input}
                            inputContainerStyle={styles.forminput}
                            placeholder={I18n.t('address.name')}
                            placeholderTextColor={COLOR.GRAY}
                            onChangeText={text => validateFirstName(text)}
                            onSubmitEditing={() => lnameRef.current?.focus()}
                            errorStyle={styles.inputerror}
                            errorMessage={
                                isFirstNameErr ? I18n.t('address.empty_valid') : ''
                            } />

                        <Input testID={'lastname'}
                            leftIcon={
                                <Icon
                                    name="person"
                                    color={COLOR.GRAY}
                                    size={25}
                                    style={{ backgroundColor: 'transparent', marginHorizontal: 15 }}
                                />
                            }
                            value={lastName}
                            ref={lnameRef}
                            keyboardAppearance="light"
                            autoFocus={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                            returnKeyType="next"
                            testID="lastname"
                            inputStyle={styles.input}
                            inputContainerStyle={styles.forminput}
                            placeholder={I18n.t('address.lastname')}
                            placeholderTextColor={COLOR.GRAY}
                            onChangeText={text => validateLastName(text)}
                            onSubmitEditing={() => phoneRef.current?.focus()}
                            errorStyle={styles.inputerror}
                            errorMessage={
                                isLastNameErr ? I18n.t('address.empty_valid') : ''
                            } />

                        <Input testID={'phonenumber'}
                            leftIcon={
                                <Icon
                                    name="smartphone"
                                    color={COLOR.GRAY}
                                    size={25}
                                    style={{ backgroundColor: 'transparent', marginHorizontal: 15 }}
                                />
                            }
                            value={phonenumber}
                            ref={phoneRef}
                            maxLength={10}
                            keyboardAppearance="light"
                            autoFocus={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="number-pad"
                            returnKeyType="next"
                            testID="phonenumber"
                            inputStyle={styles.input}
                            inputContainerStyle={styles.forminput}
                            placeholder={I18n.t('address.phonenumber')}
                            placeholderTextColor={COLOR.GRAY}
                            onChangeText={text => validatePhoneNumber(text)}
                            onSubmitEditing={() => address1Ref.current?.focus()}
                            errorStyle={styles.inputerror}
                            errorMessage={
                                isPhoneNumberErr ? I18n.t('address.empty_valid') : ''
                            } />

                        <Input testID={'address1'}
                            leftIcon={
                                <Icon
                                    name="location-on"
                                    color={COLOR.GRAY}
                                    size={25}
                                    style={{ backgroundColor: 'transparent', marginHorizontal: 15 }}
                                />
                            }
                            value={address1}
                            ref={address1Ref}
                            keyboardAppearance="light"
                            autoFocus={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                            returnKeyType="next"
                            testID="address1"
                            inputStyle={styles.input}
                            inputContainerStyle={styles.forminput}
                            placeholder={I18n.t('address.address1')}
                            placeholderTextColor={COLOR.GRAY}
                            onChangeText={text => validateAddress1(text)}
                            onSubmitEditing={() => address2Ref.current?.focus()}
                            errorStyle={styles.inputerror}
                            errorMessage={
                                isAddress1Err ? I18n.t('address.empty_valid') : ''
                            } />

                        <Input
                            leftIcon={
                                <Icon
                                    name="location-on"
                                    color={COLOR.GRAY}
                                    size={25}
                                    style={{ backgroundColor: 'transparent', marginHorizontal: 15 }}
                                />
                            }
                            value={address2}
                            ref={address2Ref}
                            keyboardAppearance="light"
                            autoFocus={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                            returnKeyType="next"
                            testID="address2"
                            inputStyle={styles.input}
                            inputContainerStyle={styles.forminput}
                            placeholder={I18n.t('address.address2')}
                            placeholderTextColor={COLOR.GRAY}
                            onChangeText={text => validateAddress2(text)}
                            onSubmitEditing={() => cityRef.current?.focus()} />

                        <Input testID={'city'}
                            leftIcon={
                                <Icon
                                    name="location-city"
                                    color={COLOR.GRAY}
                                    size={25}
                                    style={{ backgroundColor: 'transparent', marginHorizontal: 15 }}
                                />
                            }
                            value={city}
                            ref={cityRef}
                            keyboardAppearance="light"
                            autoFocus={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                            returnKeyType="next"
                            testID="city"
                            inputStyle={styles.input}
                            inputContainerStyle={styles.forminput}
                            placeholder={I18n.t('address.city')}
                            placeholderTextColor={COLOR.GRAY}
                            onChangeText={text => validateCity(text)}
                            onSubmitEditing={() => countryRef.current?.focus()}
                            errorStyle={styles.inputerror}
                            errorMessage={
                                isCityErr ? I18n.t('address.empty_valid') : ''
                            } />

                        <Picker testID={'country'}
                            containerStyle={styles.pickerforminput}
                            value={country}
                            testID="country"
                            onChange={onPickerCountryValueChange}
                            showSearch
                            
                            searchPlaceholder={I18n.t('address.country')}
                            topBarProps={{ title: I18n.t('address.selectcountry') }}
                            renderPicker={() => {
                                return (
                                    <Input
                                        leftIcon={
                                            <Icon
                                                name="map"
                                                color={COLOR.GRAY}
                                                size={25}
                                                style={{ backgroundColor: 'transparent', marginHorizontal: 15 }}
                                            />
                                        }
                                        rightIcon={
                                            <TouchableOpacity  onPress={() => { }}>
                                                <Icon
                                                    name="arrow-drop-down"
                                                    color={COLOR.GRAY}
                                                    size={25}
                                                    style={{ backgroundColor: 'transparent', marginHorizontal: 15 }}
                                                />
                                            </TouchableOpacity>
                                        }
                                        editable={false}
                                        value={country}
                                        ref={countryRef}
                                        autoFocus={false}
                                        inputStyle={styles.input}
                                        inputContainerStyle={styles.forminput}
                                        placeholder={I18n.t('address.country')}
                                        placeholderTextColor={COLOR.GRAY}
                                        errorStyle={styles.inputerror}
                                        errorMessage={
                                            isCountryErr ? I18n.t('address.empty_valid') : ''
                                        } />
                                );
                            }}>
                            {listCountry.map((item, key) => (
                                <Picker.Item label={item.name} value={item.country_id} key={key} />)
                            )}
                        </Picker>

                        <Picker testID={'state'}
                            containerStyle={styles.pickerforminput}
                            value={zone}
                            onChange={onPickerStateValueChange}
                            showSearch
                            testID="state"
                            searchPlaceholder={I18n.t('address.state')}
                            rightIconSource={Assets.icons.poorvika.dropdown}
                            topBarProps={{ title: I18n.t('address.selectstate') }}
                            renderPicker={() => {
                                return (
                                    <Input
                                        leftIcon={
                                            <Icon
                                               
                                                name="navigation"
                                                color={COLOR.GRAY}
                                                size={25}
                                                style={{ backgroundColor: 'transparent', marginHorizontal: 15 }}
                                            />
                                        }
                                        rightIcon={
                                            <TouchableOpacity  onPress={() => { }}>
                                                <Icon
                                                    name="arrow-drop-down"
                                                    color={COLOR.GRAY}
                                                    size={25}
                                                    style={{ backgroundColor: 'transparent', marginHorizontal: 15 }}
                                                />
                                            </TouchableOpacity>
                                        }
                                        editable={false}
                                        value={zone}
                                        autoFocus={false}
                                        inputStyle={styles.input}
                                        inputContainerStyle={styles.forminput}
                                        placeholder={I18n.t('address.state')}
                                        placeholderTextColor={COLOR.GRAY}
                                        errorStyle={styles.inputerror}
                                        errorMessage={
                                            isZoneErr ? I18n.t('address.empty_valid') : ''
                                        } />
                                );
                            }}>
                            {listState.map((item, key) => (
                                <Picker.Item label={item.name} value={item.zone_id} key={key} />)
                            )}
                        </Picker>

                        <Input testID={'pincode'}
                            leftIcon={
                                <Icon
                                    name="gps-fixed"
                                    color={COLOR.GRAY}
                                    size={25}
                                    style={{ backgroundColor: 'transparent', marginHorizontal: 15 }}
                                />
                            }
                            value={pincode}
                            keyboardAppearance="light"
                            autoFocus={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="number-pad"
                            returnKeyType="next"
                            testID="pincode"
                            inputStyle={styles.input}
                            inputContainerStyle={styles.forminput}
                            placeholder={I18n.t('address.pincode')}
                            placeholderTextColor={COLOR.GRAY}
                            onChangeText={text => validatePinCode(text)}
                            // onSubmitEditing={() => passwordField.current?.focus()}
                            errorStyle={styles.inputerror}
                            errorMessage={
                                isPincodeErr ? I18n.t('address.empty_valid') : ''
                            } />
                    </View>
                </ScrollView>
                {/* </View> */}
                <View style={styles.addressformbutton}>
                    <Button testID="continue" label={I18n.t('address.continue')}
                        onPress={() => addEditAddress()}
                        backgroundColor={COLOR.THEME}
                        style={styles.buttonwidth}
                        testID={'continue'}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Address
