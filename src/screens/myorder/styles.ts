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
