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
import axios from 'axios';
interface types {
    element: string[]
}
export const compareProapi = async (e: types) => {
    try {
        const { data: response } = await axios.get('https://appapinew.poorvikamobile.com/app/index.php?route=feed/rest_api/compare&ids=' + e) //use data destructuring to get data from the promise object
        return response
    }
    catch (error) {
        console.log(error);
    }
}
