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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginview: {
        flex: 1,
        flexDirection: 'row',
        width: '100%'
    },
    passwordview: {
        flexDirection: 'row',
        backgroundColor: COLOR.THEME
    },
    headview: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:15
    },
    headfont: {
        fontSize: 18,
        fontWeight: '600',
        color: COLOR.GRAY
    },
    loginform: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal:15
    },
    input: {
        fontSize: 15,
    },
    forminput: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: COLOR.THEME,
        marginHorizontal: 10,
    },
    inputerror : { 
        color: 'red', 
        marginHorizontal: 30,
        fontSize:15,
        marginBottom:15
    },
    loginformbutton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    or: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: '600',
        color: COLOR.GRAY
    },
    buttonwidth: {
        width: '60%'
    },
    buttonlabel: {
        fontSize: 17,
        fontWeight: '600'
    },
    registerview: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    register: {
        color: COLOR.THEME,
        fontWeight: '600'
    },
    forgotpasswordview: {
        alignItems: 'flex-end',
        marginEnd: 40,
    },
    activityindicator: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    loaderView: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: COLOR.OP_BLACK,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
