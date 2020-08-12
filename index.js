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
import { Navigation } from "react-native-navigation";
import {registerScreens} from './src/screens';
import { goToHome, goToLogin, initialize } from 'navigation/navigation'
import {Colors, Typography, Spacings, Button, Modal, Card, Image, Carousel, Text, View, LoaderScreen} from 'react-native-ui-lib';
Colors.loadColors({
  primaryColor: '#2364AA',
  secondaryColor: '#81C3D7',
  textColor: '##221D23',
  errorColor: '#E63B2E',
  successColor: '#ADC76F',
  warnColor: '##FF963C',
  orange10: '#FB9206',
  whitebackground: '#ffffff',
  lightgrey: '#90808080',
  black: '#000000'
  
});
Typography.loadTypographies({
  heading: {fontSize: 16, fontWeight: '600',  color: '#ffffff'},
  normalText: {fontSize: 16, fontWeight: '300'},
  subheading: {fontSize: 28, fontWeight: '500'},
  body: {fontSize: 18, fontWeight: '400'},
});

Spacings.loadSpacings({
  page: 20,
  card: 12,
  gridGutter: 16
});
/*Register all screens using wix navigation*/
registerScreens(); 
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    statusBar: {
      backgroundColor: Colors.white,
      style: 'dark',
    },
    layout: {
      orientation: ["portrait"],
  },
  });
  initialize()
})
