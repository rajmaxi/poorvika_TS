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
    allcoutries_url,
    state_url,
    updateAddress_url,
    addAddress_url,
    deleteAddress_url
} from "constants/api";
import config from "shared/ServiceConfig";
import {updateAccount_url} from "src";

const axios = require('axios').default;

export const addAddress = async (body : {}) => {
    const header = await config.authHeader()
    try {
        let response = await axios.post(addAddress_url, body, {
            params: {},
            headers: header
        })
        return response.data
    } catch (err) {
        console.error(err)
    }
}

export const updateAddress = async (body : {}, addressId : string) => {
    const header = await config.authHeader()
    try {
        let response = await axios.put(updateAddress_url + addressId, body, {
            params: {},
            headers: header
        })
        return response.data
    } catch (err) {
        console.error(err)
    }
}

export const getCountry = async () => {
    const header = await config.authHeader()
    try {
        let response = await axios.get(allcoutries_url, {
            params: {},
            headers: header
        })
        return response.data
    } catch (err) {
        console.error(err)
    }
}

export const getState = async (countryid : string) => {
    const header = await config.authHeader()
    try {
        let response = await axios.get(state_url + countryid, {
            params: {},
            headers: header
        })
        return response.data
    } catch (err) {
        console.error(err)
    }
}
