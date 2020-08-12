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
type cartItemRowProps = {
    id: number,
    url: string,
    by: string,
    price: number,
    name: string,
    quantity:string
}

interface CheckoutProps {
    componentId: string,
    cartitems: cartItemRowProps
}

interface UserAddress {
    address_id: number
    firstname: string
    lastname: string
    company: string
    address_1: string
    address_2: string
    postcode: string
    city: string
    zone_id: string
    mobilenumber: string
    zone: string
    zone_code: string
    country_id: string
    country: string
    iso_code_2: string
    iso_code_3: string
    address_format: string
}

type CheckoutType = NavigationComponent < CheckoutProps >
