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
interface addressprops {
    componentId: string
    callback: {()}
    address: AddressType
    country: Country
    countryId: string
    zoneId: string
}

interface PickerObject {
    label: string,
    value: string
}

type AddressType = {
    address_id: string,
    firstname: string,
    lastname: string,
    address_1: string,
    address_2: string,
    city: string,
    postcode: string,
    zone: string,
    mobilenumber: string,
    country: string,
    zone_id: string,
    country_id: string
}

type Country = {
    country_id: string,
    name: string,
    iso_code_2: string,
    iso_code_3: string,
    address_format: string,
    postcode_required: string,
    status: string,
}

type Zone = {
    zone_id: string,
    country_id: string,
    name: string,
    code: string,
    status: string
}

type addresstype = NavigationComponent<addressprops>;