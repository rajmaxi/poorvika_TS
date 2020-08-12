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
import{ StyleSheet } from 'react-native';
import COLOR from 'utils/Color';

export const styles = StyleSheet.create({
    bgColor: {
        backgroundColor: COLOR.WHITE,
    },
    safearea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    otpview: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center', // Used to set Text Component Vertically Center
        alignItems: 'center',
    },
    headview: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    headfont: {
        
        color: COLOR.GRAY
    },
    phonenumber: {
       
        fontWeight: 'bold',
        color: COLOR.DARK_GRAY
    },
    otpform: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    otpinput: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 100,
    },
    resendcontainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    resendotp: {
        color: COLOR.THEME,
        fontWeight: '600'
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: COLOR.DARK_GRAY
    },
    underlineStyleHighLighted: {
        borderColor: COLOR.THEME,
    },
});