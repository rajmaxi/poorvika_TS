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
import { StyleSheet } from 'react-native';
const comparestylesheet = StyleSheet.create({
    addButton: {
        position: 'absolute', bottom: 0,
        width: '100%', backgroundColor: '#fff',
        height: 40
    },
    cartButton: {
        justifyContent: 'center',
        flex: 1, width: '48%',
        marginLeft: 20, marginRight: 20,
        borderRadius: 4, marginTop: 3,
        marginBottom: 3, alignItems: 'center',
        backgroundColor: '#40ba12',
    },
    proImage: {
        width: '96%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    proImagecontain: {
        width: '50%', height: 200,
    },
    contentContainer: {
        marginTop: 10, width: '96%',
        marginLeft: 'auto', marginRight: 'auto'
    },
    contentBody: {
        width: '50%', alignItems: 'center'
    },
    specName: {
        textAlign: 'center', backgroundColor: '#d6d6d6',
        color: '#424040', padding: 6, textTransform: 'uppercase',
        fontWeight: '600', fontSize: 14
    },
    firstView: { justifyContent: 'center', position: 'relative', marginTop: 15 },
    htmlView:{ width: '48%', marginBottom: 10 }
})
export default comparestylesheet 