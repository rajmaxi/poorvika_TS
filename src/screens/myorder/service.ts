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
import {myorders_url} from "constants/api";
import config from "shared/ServiceConfig";

const axios = require('axios').default;

export const getOrders = async () => {
    const header = await config.authHeader()
    try {
        let response = await axios.get(myorders_url, {
            params: {},
            headers: header
        })
        return response.data
    } catch (err) {
        console.error(err)
    }
}
