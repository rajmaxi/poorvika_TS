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

class ServiceConfig {
    authHeader = async () => {
        const value = await AsyncStorage.getItem('token');
        let headers = {
            'Authorization': `Bearer ${value}`,
            'Content-Type': 'application/json'
        }
        return headers
    }

    setUserLogged = (isLogged : boolean) => {
        AsyncStorage.setItem('loggedin', JSON.stringify(isLogged))
    }
}

const config = new ServiceConfig()
export default config
