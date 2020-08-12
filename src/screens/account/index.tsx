
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
import { Text, View, TouchableOpacity, TextField, Card } from 'react-native-ui-lib'
import ConnectionStatusbar from "components/connectionstatusbar"
import { SafeAreaView, Alert, ActivityIndicator } from "react-native"
import { styles } from './style'
import { ScrollView, FlatList } from "react-native-gesture-handler"
import COLOR from "utils/Color"
import I18n from 'locale/i18n'
import { Navigation } from "react-native-navigation"
import Icon from 'react-native-vector-icons/MaterialIcons'
import Placeholder from "components/placeholder"
import { updateAccount, deleteAddress, getAccountAddress, getAddress } from "./service"
import _ from 'lodash'
import SimpleHeader from 'components/simpleheader'


const Account: accounttype = (accountprops): JSX.Element => {

    const [isEditMode, setEditMode] = useState(false)
    const [isProfile, setIsProfile] = useState(true)
    const [placeholder, setPlaceholder] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [customerId, setCustomerId] = useState('')
    const [profileFields, setProfileFields] = useState<string[]>([])
    const [listProfile, setListProfile] = useState<UserAccount[]>([])
    const [listAddress, setListAddress] = useState<UserAddress[]>([])
    const [isNameErr, setNameErr] = useState(false)
    const [isEmailErr, setEmailErr] = useState(false)
    const [isMobileNumberErr, setMobileNumberErr] = useState(false)
    const [componentId, setComponentId] = useState(accountprops.componentId)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("")

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

    useEffect(() => {

    }, [])

    /* This function is used to navigate one screen to another screen by name */
    const gotoScreen = (ScreenName: string) => {
        Navigation.push(componentId, {
            component: {
                name: ScreenName,
                options: { // Optional options object to configure the screen'azzzzzdsxzxzdsza
                    topBar: {
                        visible: false,
                        title: {
                            text: ScreenName // Set the TopBar title of the new Screen
                        }
                    },
                    bottomTabs: { visible: false, drawBehind: true, animate: false },
                }
            }
        })
    }

    /* Navigate to Address Page with edit mode row data */
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
                    },
                }
            }
        })
    }

    const navigateTo = (name: string) => {
        gotoScreen(name)
    }

    const backToAccount = () => {
        setPlaceholder(true)
        getUpdatedAddressContent()
    }

    /* This function is used to navigate which tab data displayed*/
    const dataSourceProfile = () => {
        if (isEditMode) {
            var items = listProfile.slice(0, 3)
            items.forEach(element => {
                profileFields.push(element.data)
            })
            return (
                items
            )
        } else {
            return (
                listProfile
            )
        }
    }

    /* This function is used to get account data from api  */
    const getAccountContent = async () => {
        const accountAddressResponse = await getAccountAddress()
        const accountResponse = accountAddressResponse[0]
        getAddressContent(accountAddressResponse[1]) //passing address response for address content

        //const accountResponse = await getAccount()
        const isSuccess = accountResponse.success
        const error = accountResponse.error
        const errorMsg = error[0]
        if (isSuccess == 0) {
            Alert.alert(errorMsg)
        } else {
            setPlaceholder(false)
            const profileList: UserAccount[] = []
            setCustomerId(accountResponse.data.customer_id)
            profileList.push({ key: 'account_name', data: accountResponse.data.firstname + ' ' + accountResponse.data.lastname })
            profileList.push({ key: 'account_email', data: accountResponse.data.email })
            profileList.push({ key: 'account_mobileno', data: accountResponse.data.telephone })
            profileList.push({ key: 'account_balance', data: accountResponse.data.user_balance })
            profileList.push({ key: 'changepassword', data: '' })
            setListProfile(profileList)
        }
    }

    /* Update Account details, passing value to service class */
    const updateAccountContent = async () => {
        var accountBody = {
            "firstname": profileFields[0],
            "email": profileFields[1],
            "telephone": profileFields[2]
        }
        const accountResponse = await updateAccount(accountBody, customerId)
        const isSuccess = accountResponse.success
        const error = accountResponse.error
        const errorMsg = error[0]
        if (isSuccess == 0) {
            Alert.alert(errorMsg)
        } else {
            for (let index = 0; index < profileFields.length; index++) {
                listProfile[index].data = profileFields[index]
            }
            setIsLoading(false)
            Alert.alert('Update Success')
        }
    }

    /* This function is used to get address data from api  */
    const getAddressContent = (addressResponse: any) => {
        listAddress.splice(0, listAddress.length)
        //const addressResponse = await getAddress()
        const isSuccess = addressResponse.success
        const error = addressResponse.error
        const errorMsg = error[0]
        if (isSuccess == 0) {
            Alert.alert(errorMsg)
        } else {
            setListAddress(addressResponse.data.addresses)
            setPlaceholder(false)
        }
    }

    const getUpdatedAddressContent = async () => {
        listAddress.splice(0, listAddress.length)
        const addressResponse = await getAddress()
        const isSuccess = addressResponse.success
        const error = addressResponse.error
        const errorMsg = error[0]
        if (isSuccess == 0) {
            Alert.alert(errorMsg)
        } else {
            setListAddress(addressResponse.data.addresses)
            setPlaceholder(false)
        }
    }

    /* This function is used to switch the tab content by user input  */
    const segmentSwitch = () => {
        if (isProfile == true) {
            setIsProfile(false)
        } else {
            setIsProfile(true)
        }
    }

    /** Update & Edit mode click action */
    const editUpdateClick = () => {
        setEditMode(!isEditMode)
        if (isEditMode == true) {
            setIsLoading(true)
            updateAccountContent()
        } else {
            setProfileFields([])
        }
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

    /* This function is used to delete address detail from database */
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

    /* Design Add new address row  */
    const renderAddNewAddress = () => {
        return (
            <Card bg-white marginT-10 marginB-5>
                <TouchableOpacity testID="addnewaddress" centerV row onPress={() => { navigateToAddress(-1) }}>
                    <Icon name="add" size={25} color={'black'} style={{ margin: 15 }} />
                    <Text marginR15 color-black text70>{I18n.t('checkout.addnewaddress')}</Text>
                </TouchableOpacity>
            </Card>
        )
    }

    /* design  address detail row in the list*/
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

    /* This function is used to render address data  */
    const renderAddress = () => {
        return (
            <View>
                {_.map(listAddress, (item: UserAddress, index: number) => {
                    return (
                        <Card paddingT-15 paddingB-15 marginV-5 borderRadius-30 row>
                            <View flex>
                                {renderAddressDetail(item)}
                                <View centerH row marginV-10 style={{ justifyContent: 'space-between' }}>
                                    <TouchableOpacity testID={item.firstname} row marginH-10 style={styles.shadow} onPress={() => { navigateToAddress(index) }}>
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
                        </Card>
                    )
                })}
            </View>
        )
    }

    /* This function is used to render segment tab bar  */
    const renderSegmentBar = () => {
        return (
            <View center style={styles.tabcontainer}>
                <TouchableOpacity testID="profile" style={isProfile ? styles.tabviewSelected : styles.tabview}
                    onPress={() => segmentSwitch()}>
                    <Text normalText center style={styles.tabText}> {I18n.t('account.profile')} </Text>
                </TouchableOpacity>
                <TouchableOpacity testID="address" style={isProfile ? styles.tabview : styles.tabviewSelected}
                    onPress={() => segmentSwitch()}>
                    <Text normalText center style={styles.tabText}> {I18n.t('account.address')} </Text>
                </TouchableOpacity>
            </View>
        )
    }

    /* This function is used to display profile data  */
    const renderProfile = (profileInfo: string, index: number) => {
        if (!isEditMode) {
            return (
                <Text normalText text70BO style={styles.valuetext}>
                    {profileInfo}
                </Text>
            )
        } else {
            return (
                <TextField
                    containerStyle={styles.forminput}
                    validateOnChange
                    value={profileFields[index]}
                    onChangeText={text => {
                        profileFields[index] = text
                    }}
                    multiline={false}
                    underlineColor={{ focus: COLOR.THEME, error: COLOR.RED }}
                    expandable={false}
                    validate="required"
                    errorMessage="This is a mandatory field" />
            )
        }
    }


    /* This function is used to perform edit button on address data  */
    const renderEdit = () => {
        if (isEditMode) {
            return (
                <View center
                    style={[styles.editcontainer]}>
                    <TouchableOpacity row onPress={() => { editUpdateClick() }}>
                        <Icon name="update" size={25} style={{ color: COLOR.WHITE }} />
                        <Text normalText style={styles.editicontext}>{I18n.t('account.update')}</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View center
                    style={[styles.editcontainer]}>
                    <TouchableOpacity row onPress={() => { editUpdateClick() }}>
                        <Icon name="edit" size={25} style={{ color: COLOR.WHITE }} />
                        <Text normalText style={styles.editicontext}>{I18n.t('account.edit')}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    /* This function is used to navigate changepassword  */
    const renderChangePassword = () => {
        return (
            <View paddingL-30
                style={[styles.itemcontainer]}>
                <TouchableOpacity testID="passwordchange" row centerV onPress={() => {
                    navigateTo('ChangePassword')
                }}>
                    <Text normalText style={styles.changepasswordtext}>{I18n.t('account.changepassword')}</Text>
                    <Icon name="chevron-right" size={25} style={styles.chevron} />
                </TouchableOpacity>
            </View>
        )
    }

    /* decide to design changepassword row or account detail */
    const ListProfileItem = ({ item, index }) => {
        if (item.key == 'changepassword') {
            return (
                renderChangePassword()
            )
        } else {
            return (
                <TouchableOpacity onPress={() => { }}>
                    <View
                        paddingL-30
                        style={[styles.itemcontainer]}>

                        <Text normalText text80BO style={styles.labletext}>
                            {I18n.t('account.' + item.key)}
                        </Text>
                        {renderProfile(item.data, index)}
                    </View>
                </TouchableOpacity>
            )
        }
    }

    /* design account tab */
    const showProfile = () => {
        return (
            <ScrollView style={styles.scrollContainer1} showsVerticalScrollIndicator={false}>
                <FlatList
                    data={dataSourceProfile()}
                    extraData={[isEditMode, isProfile, placeholder]}
                    renderItem={({ item, index }) => (<ListProfileItem item={item} index={index} />)} />
            </ScrollView>
        )
    }

    /* design to address tab */
    const showAddress = () => {
        return (
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {renderAddNewAddress()}
                {renderAddress()}
            </ScrollView>
        )
    }

    /* show loading placeholder */
    const showPlaceholder = () => {
        getAccountContent()
        return (
            <View row style={{ backgroundColor: 'white', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size='small' />
            </View>
        )
    }

    /* design account page UI*/
    const showAccount = () => {
        return (
            <SafeAreaView style={styles.safearea}>
                <SimpleHeader enableback={true} componentId={componentId} title=''></SimpleHeader>

                <View testID="containerView" style={styles.container}>
                    <ConnectionStatusbar />
                    {isLoading &&
                        <View style={styles.loaderView}>
                            <ActivityIndicator animating={isLoading} size="large" color={COLOR.THEME} />
                        </View>
                    }
                    {renderSegmentBar()}
                    {isProfile ? showProfile() : showAddress()}
                    {isProfile ? renderEdit() : <Text />}
                </View>
            </SafeAreaView>
        )
    }

    return (
        placeholder ? showPlaceholder() : showAccount()
    )
}

export default Account

