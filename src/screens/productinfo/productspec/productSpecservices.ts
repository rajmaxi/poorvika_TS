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
import axios from 'src';
import { productSpec } from 'constants/api';

export const _getProductSepec = async (productId : number) => { // console.log('element', element);
    try {
        const {data: response} = await axios.get( productSpec+ productId) // use data destructuring to get data from the promise object
        return response
    } catch (error) {
      //  console.log(error);
    }
}
