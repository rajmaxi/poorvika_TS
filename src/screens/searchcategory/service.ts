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
import { searchcategory } from 'constants/api';
import { Alert } from 'react-native';
import settoken from "../../shared/settoken";
const axios = require('axios').default;

export const searchcategoryapi = async (token: string) =>
{ 

  try 
  {
    let response = await axios.get(searchcategory)
    // console.log('TOKEN '+response.data)
     return response.data
  } catch(err){
    if(err.response.data.error[0]=='The access token provided has expired' || 
    err.response.data.error[0]=='The access token provided is invalid')
    {
      const newToken = await settoken();
      return await searchcategoryapi(newToken)
    }
  }
}
