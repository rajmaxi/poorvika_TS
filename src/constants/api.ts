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
export const basepath= 'https://appapinew.poorvikamobile.com'
export const apppath= 'app'
export const home_api = 'https://www.poorvikamobile.com/output/homepage.json'

export const home_brand = basepath+'/'+apppath+'/index.php?route=feed/rest_api/brandsapi'
export const get_token_api = basepath+'/'+apppath+'/index.php?route=feed/rest_api/gettoken&grant_type=client_credentials'
export const mobilecategory = basepath+'/'+apppath+'/index.php?route=feed/rest_api/productsaruna&category=153'
export const gadzetscategory = basepath+'/'+apppath+'/index.php?route=feed/rest_api/productsaruna&category=475'
export const tvcategory =   basepath+'/'+apppath+'/index.php?route=feed/rest_api/productsaruna&category=178'
export const tabletcategory = basepath+'/'+apppath+'/index.php?route=feed/rest_api/productsaruna&category=169'
export const commoncategory = basepath+'/'+apppath+'/index.php?route=feed/rest_api/productsaruna&category='

export const get_token = basepath+"/"+apppath+'/index.php?route=feed/rest_api/gettoken&grant_type=client_credentials'
export const register_user_url = basepath+"/"+apppath+'/index.php?route=feed/rest_api/RegisterForm'
export const login_user_url = basepath+"/"+apppath+'/index.php?route=rest/login/login'
export const forgot_password_url = basepath+"/"+apppath+'/index.php?route=rest/forgotten/forgotten'
export const search = basepath+"/"+apppath+'/output/autocompletesearch.json'
export const account_url = basepath+'/'+apppath+'/index.php?route=rest/account/account'
export const updateAccount_url = basepath+'/'+apppath+'/index.php?route=rest/account/account&id='
export const productdetails= basepath+'/'+apppath+'/index.php?route=feed/rest_api/productdata&id='
export const searchcategory = basepath+'/'+apppath+"/index.php?route=feed/rest_api/categories&level=2"
export const forceupdate = basepath+'/'+apppath+"/index.php?route=feed/rest_api/appversion"
export const addreviewapi = basepath+'/'+apppath+"/index.php?route=feed/rest_api/reviews&id="
export const myorders_url = basepath+'/'+apppath+'/index.php?route=rest/order/orders'
export const address_url = basepath+'/'+apppath+'/index.php?route=rest/shipping_address/shippingaddress'
export const addAddress_url = basepath+'/'+apppath+'/index.php?route=rest/account/address'
export const updateAddress_url = basepath+'/'+apppath+'/index.php?route=rest/account/address&id='
export const deleteAddress_url= basepath+'/'+apppath+'/index.php?route=rest/account/address&id='
export const allcoutries_url = basepath+'/'+apppath+'/index.php?route=feed/rest_api/countries'
export const state_url = basepath+'/'+apppath+'/index.php?route=feed/rest_api/countries&id='
export const changePassword_url= basepath+'/'+apppath+'/index.php?route=rest/account/password'
export const logout_url=basepath+'/'+apppath+'/index.php?route=rest/logout/logout'
export const productSpec=basepath+'/'+apppath+'/index.php?route=feed/rest_api/productdata&id='