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
type homelisttype =
{
    name: string
    product_id: number,
    thumb: string;
    price: string,
}
type brandtype = {
    success: number, error:  Array<string>,brands:Array<{category_id:string, name:string, image:string}>
}
type homedata= {
    
    banners: Array< {banner_id: string, values: Array<{image: string; id: number; name: string; banner_image_id: string}>}>
    feature_block: {values:Array<{thumb:string, name:string, price:string}>}
}
interface HomeComponentProps {componentId: string;}
type HomeComponentType = NavigationComponent<HomeComponentProps>;