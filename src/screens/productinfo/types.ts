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
interface productinfoprops {
    componentId: string,
    name: string,
    id: number,
 }
type productdetails=
{
    data:{
        name:string,
        stock_status: string,
        price_formated:string,
        price:string,
        special:string,
        rating:string,
        availablity:string,
        description:string,
        manufacturer:string,
        special_formatted: string,
        price_excluding_tax: number,
        special_excluding_tax: number,
        special_formated: string,
        additional_image_color: Array<{image:string, product_id:number}>
        reviews: {review_total: number, reviews: Array<{author:string, text:string, date_added:string, rating:string}>}
        attribute_groups:Array<{name:string, attribute:Array<{attribute_id:string, name:string, text: string}>}>
    } 
}

type productdata=
{   
    name:string,
    stock_status: string,
    price_formated:string,
    price:string,
    rating:string,
    availablity:string,
    description:string,
    manufacturer:string,
    special_formatted: string,
    price_excluding_tax: number,
    special_excluding_tax: number,
    special_formated: string,
    additional_image_color: Array<{image:string, product_id:number}>
    reviews: {review_total: number, reviews: Array<{author:string, text:string, date_added:string, rating:string}>}
    attribute_groups:Array<{name:string, attribute:Array<{attribute_id:string, name:string, text: string}>}>
    
}

type productinfotypes = NavigationComponent<productinfoprops>;