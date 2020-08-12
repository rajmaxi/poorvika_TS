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
    safearea: {
        flex: 1,
        backgroundColor: COLOR.WHITE
    },
    container: {
        flex: 1,
        backgroundColor: COLOR.LIGHT_GRAY
    },

    tabcontainer: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: COLOR.GRAY
    },
    tabviewSelected: {
        width: '50%',
        height: 50,
        flexDirection: 'column',
        borderBottomColor: COLOR.THEME,
        borderBottomWidth: 3
    },
    tabview: {
        width: '50%',
        height: 50,
        flexDirection: 'column'
    },
    tabText: {
        color: COLOR.WHITE,
        // fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15
    },
    scrollContainer: {
        backgroundColor: COLOR.LIGHT_GRAY,
        marginLeft: 10,
        marginRight: 10
    },
    scrollContainer1: {
        backgroundColor: COLOR.WHITE
    },
    labletext: {
        color: COLOR.GRAY,
        // fontSize: 12,
        // fontWeight: '200',
        marginTop: 15
    },
    valuetext: {
        color: COLOR.BLACK,
        marginBottom: 15
    },
    changepasswordtext: {
        color: COLOR.BLACK,
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 15
    },
    chevron: {
        color: COLOR.GRAY,
        position: 'absolute',
        right: 15
    },
    addresstext: {
        color: COLOR.BLACK,
        // fontSize: 14,
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 15
    },
    addressdetailtextname: {
        color: COLOR.BLACK,
        fontWeight: 'bold'
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
    addressdetailtext: {
        color: COLOR.BLACK,
        // fontSize: 16,
        fontWeight: '200'
    },
    addressdetailitemcontainer: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        borderWidth: 10,
        borderColor: COLOR.LIGHT_GRAY,
        justifyContent: 'space-between'
    },
    itemcontainer: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: COLOR.DARK_GRAY
    },
    icontext: {
        color: COLOR.GRAY,
        fontSize: 12,
        fontWeight: '200'
    },
    editcontainer: {
        height: 50,
        backgroundColor: COLOR.THEME
    },
    editicontext: {
        color: COLOR.WHITE,
        fontSize: 16,
        fontWeight: 'bold'
    },
    forminput: {
        width: '90%',
        height: 50
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
})
