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
import {
    home_api,
    home_brand,
    get_token,
    get_token_api,
    forceupdate
} from 'constants/api';
const axios = require('axios').default;
import settoken from "shared/settoken";
import { Alert } from 'react-native';

// Get Homepage data
export const gethomedata = async () => {
    try {
        let response = await axios.get(home_api)
        // console.log('home response.......'+response.data)
        return response.data
    } catch (err) {
        console.error(err)
    }
}
// Get Homepage  Brands data
export const getbrands = async () => {
    try {
        let response = await axios.get(home_brand)
        return response.data
    } catch (err) {
        console.error(err)
    }
}

// Force Api
export const forceupdateapi = async (token : string) => {

    try {
        let response = await axios.get(forceupdate)
        return response.data;
    } catch (err) { // console.error(err)
        const newToken = await settoken();
        // console.log('NEW TOKEN IS' +newToken)
        return await forceupdateapi(newToken)
    }
}

// Token Api
export const gettoken = async () => {
    const response = await fetch(get_token_api, {
        method: 'POST',
        headers: new Headers(
            {'Authorization': 'Basic c2hvcHBpbmdfb2F1dGhfY2xpZW50OnNob3BwaW5nX29hdXRoX3NlY3JldA==', 'Content-Type': 'application/json'}
        )
    });
    const json = await response.text();
   // console.log(json);
    return json;
}


export const getcartdetails = async () => {
    
    try {
        let response = await axios.get('https://appapinew.poorvikamobile.com/app/index.php?route=rest/cart/cart')
        //console.log('Token is Valid....No problem....')
        return response.data
    } catch (err) {
        console.log( 'Response: '+JSON.stringify(err.response.data))
        return err.response.data
        // if (err.response.data.error[0] == 'The access token provided has expired' || err.response.data.error[0] == 'The access token provided is invalid') {
        //     const newToken = await settoken();
        //     return await getinfo(productid, newToken)
        // } else 
        //     return err.code;
        

    }
}
