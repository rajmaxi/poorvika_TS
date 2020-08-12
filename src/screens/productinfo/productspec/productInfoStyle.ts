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
import {StyleSheet, Platform} from 'react-native';
const productSpecstylesheet = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        margin: 10,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
    FlatListItemStyle: {
        letterSpacing: 1,
        marginBottom: 7,
        marginTop: 5,
        fontSize: 16,
        // fontFamily: 'AntDesign'
    },
    sepcData: {
        fontSize: 13,
        letterSpacing: .7,
        marginBottom: 10
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    listTab: {
        flexDirection: 'row',
        marginBottom: 20
    },
    btnTab: {
        width: '50%',
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#EBEBEB',
        padding: 10,
        justifyContent: 'center'
    },
    txtTab: {
        fontSize: 16
    },
    btnActive: {
        backgroundColor: '#E6838D'
    },
    textTabActive: {
        color: '#fff'
    }
})
export default productSpecstylesheet
