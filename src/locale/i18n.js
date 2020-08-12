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
import I18n from 'react-native-i18n';
import en from 'EcommerceApp/src/locale/en';
import fr from 'EcommerceApp/src/locale/fr';
 
I18n.fallbacks = true;
 
I18n.translations = {
  en,
  fr
};
 
const currentLocale = I18n.currentLocale();

//console.log('standard',currentLocale.indexOf('en'));
//const isRTL = currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;
export default I18n;