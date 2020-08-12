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
// import { mobilecategory, gadzetscategory, commoncategory, tvcategory, tabletcategory } from 'constants/api';
// import { Alert } from 'react-native';
import settoken from "shared/settoken";
// const axios = require('axios').default;

// export const getmobilecategory = async (categoryid: number, page:number, sorvalue:string, token: string) =>
// { 

//   try {
//     let response = await axios.get(commoncategory+categoryid+sorvalue+'&page='+page)
//     return response.data;
//   } catch(err) 
//   {
// if (err.response.data.error[0] == 'The access token provided has expired' ||
//   err.response.data.error[0] == 'The access token provided is invalid') {
//   const newToken = await settoken();
//   return await getmobilecategory(categoryid, page, sorvalue, newToken)
// }
//   }
// }
import axios from 'axios';


export const categoryMain = async (categoryid: number, page: number, sorvalue: string) => {
  // const params = e;

  // console.log(sort, 'element params', params);
  try {
    const { data: response } = await axios.get('https://appapinew.poorvikamobile.com/app/index.php?route=feed/rest_api/productsaruna&category=' + categoryid + sorvalue + '&page=' + page) //use data 
    console.log('categoryAPISuccess', response);
    return response
  }
  catch (error) {
    console.log('categoryAPIError', error);
    if (error.response.data.error[0] == 'The access token provided has expired' ||
      error.response.data.error[0] == 'The access token provided is invalid') {
      const newToken = await settoken();
      return await categoryMain(categoryid, page, sorvalue)
    }
  }
}


