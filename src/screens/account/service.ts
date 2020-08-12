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
import {account_url, address_url, updateAccount_url, deleteAddress_url} from "constants/api";
import config from "shared/ServiceConfig";

const axios = require('axios').default;

export const getAccountAddress = async () => {
    const header = await config.authHeader()
    const accountRequest = axios.get(account_url, {
        params: {},
        headers: header
    })
    const addressRequest = axios.get(address_url, {
        params: {},
        headers: header
    })
    return axios.all([accountRequest, addressRequest]).then(axios.spread(async (...responses : any[]) => {
        return [
            responses[0].data,
            responses[1].data
        ]
    })).catch((errors : string) => {
        //console.error(errors)
    });
}

// export const getAccount = async () => {
//     const header = await config.authHeader()
//     return axios.get(account_url, {
//         params: {},
//         headers: header
//     }).then(async (response : any) => {
//         return await response.data
//     }).catch((error : string) => {
//         console.log('error ' + error);
//     })
// }

export const getAddress = async () => {
    const header = await config.authHeader()
    try {
        let response = await axios.get(address_url, {
            params: {},
            headers: header
        })
        return response.data
    } catch (err) {
        console.error(err)
    }
}

export const updateAccount = async (body : {}, customerid : string) => {
    const header = await config.authHeader()
    try {
        let response = await axios.put(updateAccount_url + customerid, body, {
            params: {},
            headers: header
        })
        return response.data
    } catch (err) {
        console.error(err)
    }
}

export const deleteAddress = async (addressId : number) => {

    const header = await config.authHeader()
    try {
        let response = await axios.delete(deleteAddress_url + addressId, {
            params: {},
            headers: header
        })
        return response.data
    } catch (err) {
        console.error(err)
    }
}
