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
import {addreviewapi} from 'constants/api'
import {settoken} from '../../../shared/settoken'
import { Alert } from 'react-native';
const axios = require('axios').default;

export const addreview = async (id: string, token: string,  body : { name: string, text:number, ratingvalue:any }) =>
{ 
    //Alert.alert('Respone::'+addreviewapi+id);
    //console.log( 'Token is'+token)
  try {
    
    return axios.post(addreviewapi+id, body, {
        params: {name: body.name, // This is the body part
            text: body.text,
            rating: body.ratingvalue},
        headers:  {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token, 
        },
    }).then(async (response : any) => {
        return await response.data
    }).catch(async (error : any) => {
        return await error.response.data
    })
    
  } catch(err) 
  {
     //Alert.alert(err)
    // const newToken = await settoken();
    // return await addreview(id, name,text, newToken)
  }
}