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
interface NavigationComponentProps {
    componentId: string;
}
interface NavigationComponentOptions {
    options?: (passProps?: Record<string, any>) => object;
}

type NavigationComponent<P> =
    React.FC<P & NavigationComponentProps> & NavigationComponentOptions;

// ====================================================================
// ====================================================================


interface LoginComponentProps {phonenumber: string }
type LoginComponentType = NavigationComponent<LoginComponentProps>;

interface AccountComponentProps { componentId: string }
type AccountComponentType = NavigationComponent<AccountComponentProps>;

interface LandComponentProps { }
type LandComponentType = NavigationComponent<LandComponentProps>;

interface EmptyComponentProps { componentId: string;}
type EmptyComponentType = NavigationComponent<EmptyComponentProps>;
