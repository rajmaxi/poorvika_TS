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
import {StyleSheet} from 'react-native';
import COLOR from 'utils/Color';

export const styles = StyleSheet.create({
    bgColor: {
        flex: 1,
        backgroundColor: COLOR.WHITE
    },
    safearea: {
        flex: 1

    },
    headview: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    headfont: {
        fontSize: 20,
        fontWeight: '600',
        color: COLOR.GRAY
    },
    addressform: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    pickerforminput: {
        width: '90%',
        height: 50,
        marginBottom: 30,
        borderColor: COLOR.THEME,
        borderWidth: 1,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingBottom: 0
    },
    addressformbutton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30
    },
    buttonwidth: {
        width: '60%'
    },
    input: {
        fontSize: 15
    },
    forminput: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: COLOR.THEME,
        marginHorizontal: 10
    },
    inputerror: {
        color: 'red',
        marginHorizontal: 30,
        fontSize: 15,
        marginBottom: 15
    }
});
