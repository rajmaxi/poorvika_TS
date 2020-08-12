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
import {StyleSheet} from "react-native"
import COLOR from "../../utils/Color"

export const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        backgroundColor: COLOR.LIGHT_GRAY
    },
    toolbar: {
        backgroundColor: COLOR.WHITE,
        paddingTop: 5
    },
    addressdetailtext: {
        color: COLOR.BLACK,
        fontWeight: '200'
    },
    addressdetailtextname: {
        color: COLOR.BLACK,
        fontWeight: 'bold'
    },
    icontext: {
        color: COLOR.BLACK
    },
    shadow: {
        shadowColor: 'rgba(0,0,0, .3)', // IOS
        shadowOffset: {
            height: 1,
            width: 1
        }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, // IOS
        backgroundColor: '#fff',
        elevation: 2, // Android
        height: 50,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    imagerow: {
        alignItems: 'center',
        width: '40%',
        height: '100%',
        justifyContent: 'center'
    },
    datarow: {
        width: '60%',
        padding: 10
    }
});
