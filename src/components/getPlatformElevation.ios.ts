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
import {View, Text, Image, TouchableOpacity} from 'react-native';
// Not used
const getPlatformElevation = elevation => {
    if (elevation === 0) {
        return {shadowColor: 'transparent', zIndex: 0};
    }

    return {
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: elevation / 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        // we need to have zIndex on iOS, otherwise the shadow is under components that
        // are rendered later
        zIndex: 1
    };
};

export default getPlatformElevation;
