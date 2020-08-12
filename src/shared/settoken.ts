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
import {AsyncStorage} from "react-native";
import {get_token_api } from 'constants/api';
const settoken = async () =>
  {
    const tokenresponse = await gettoken();
        await AsyncStorage.setItem(
          'token',
            tokenresponse
        );
   // console.log(tokenresponse)
    return tokenresponse;
  }

  const gettoken = async () =>
  {
    const response = await fetch(get_token_api, 
        {
          method: 'POST',
          headers: new Headers({
                    'Authorization': 'Basic c2hvcHBpbmdfb2F1dGhfY2xpZW50OnNob3BwaW5nX29hdXRoX3NlY3JldA==', 
                    'Content-Type': 'application/json',
            }),
        });
        const json = await response.text();
       // console.log(json)
        const jsonobj=JSON.parse(json);
       // console.log(jsonobj.data.access_token);
        return jsonobj.data.access_token;
  }
  
export default settoken;