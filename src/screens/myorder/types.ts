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
interface myorderprops {
    componentId: string,
    myorder: MyOrder
}

type MyOrder = {
    order_id:       string;
    name:           string;
    status:         string;
    product_info:   ProductInfo[];
    date_added:     string;
    products:       number;
    total:          string;
    currency_code:  string;
    currency_value: string;
}

type ProductInfo = {
    product_id: string;
    image:      string;
    name:       string;
    model:      string;
    option:     any[];
    quantity:   string;
}

type MyOrderType = NavigationComponent < myorderprops >
