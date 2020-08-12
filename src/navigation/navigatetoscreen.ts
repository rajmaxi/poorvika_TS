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
import { Navigation } from "react-native-navigation";
// Custom funtion to navigate from one to another screen
// Receive screen, componentId, options, passprops as Props
export const navigatetoscreen = (screen:string,componentId:string, options:any, passprops:any) =>
{
    return(
        Navigation.push(componentId, {
            component: 
            {
              name: screen,
              options: options,
              passProps: passprops
            },
          })
    )
}
