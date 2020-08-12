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
type rowtypes = {
    id: number, name: string, image: string,
    manufacturer: string, price_formated: number, rating: string
}

interface mobileprops {
    componentId: string,
    name: string,
    id: number,
    title: string
    //data: object,
}
type mobileresopnse = {
    data: Array<{ rating: string, price: string, name: string, image: string }>
}
type mobiletypes = NavigationComponent<productinfoprops>;