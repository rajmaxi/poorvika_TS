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
import COLOR from "utils/Color";

module.exports = {
    bottomview: {
        backgroundColor: 'white',
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        borderTopWidth: 0.3,
        borderTopColor: 'grey',
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey'

    },
    list: {
        marginBottom: 50,
        marginTop: 0,
        backgroundColor: 'white'
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
    },
    removebutton: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottom: {
        position: 'absolute',
        borderTopColor: 'gray',
        borderTopWidth: 0.2,
        width: '100%',
        bottom: 0
    },
    cardContainer: {
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginVertical: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5
    },
    checkout: {
        borderTopColor: 'gray',
        height: 50,
        borderTopWidth: 0.2,
        backgroundColor: COLOR.THEME,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingcart: {
        position: "absolute",
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    wait: {
        alignItems: 'center',
        width: 120,
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
};
