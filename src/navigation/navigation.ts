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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';



//Define HomeStack with screen & bottom Tabs
export const goToHome = () => {
    Promise.all([
      SimpleLineIcons.getImageSource('home', 25),
      SimpleLineIcons.getImageSource('tag', 25),
      AntDesign.getImageSource('hearto', 25),
      AntDesign.getImageSource('shoppingcart', 25),
      SimpleLineIcons.getImageSource('menu', 25),
  
    ]).then(([home, tag, hearto, shoppingcart, menu]) => {
      Navigation.setRoot({
        root: {
          bottomTabs: {
            options: {
              bottomTabs: {
                  backgroundColor: 'white',
                  titleDisplayMode: 'alwaysShow',
                  animate: false,
                  
                  // currentTabIndex: 0,
              },
          },
            id: 'BOTTOM_TABS_LAYOUT',
            children: [
              {
                stack: {
                  id: 'HOME_SCREEN',
                  
                  children: [
                    {
                      component: {
                       
                        id: 'Home',
                        name: 'Home',
                        
                      }
                    }
                  ],
                  options: {
                    bottomTab: {
                      icon: home,
                      iconColor: '#9B9B9B',
                      text: 'Home',
                      textColor: '#9B9B9B',
                      testID: 'hometab',
                      // iconInsets: { top: 0, left: 0, bottom: 0, right: 0 },
                      fontSize: 12,
                      badge: '',
                      selectedIconColor: '#FB9206',
                      selectedTextColor: '#FB9206',
                      fontFamily: 'helvetica',
                      
                    }
                  }
                }
              },
              {
                stack: {
                  id: 'deals',
                  children: [
                    {
                      component: {
                        id: 'deals',
                        name: 'deals'
                      }
                    }
                  ],
                  options: {
                    bottomTab: {
                      icon: tag,
                      iconColor: '#9B9B9B',
                      text: 'Deals',
                      textColor: '#9B9B9B',
                      // iconInsets: { top: 0, left: 0, bottom: 0, right: 0 },
                      fontSize: 12,
                      badge: '',
                      selectedIconColor: '#FB9206',
                      selectedTextColor: '#FB9206',
                    }
                  }
                }
              },
  
              {
                stack: {
                  id: 'favourite',
                  children: [
                    {
                      component: {
                        id: 'favourite',
                        name: 'favourite'
                      }
                    }
                  ],
                  options: {
                    bottomTab: {
                      icon: hearto,
                      iconColor: '#9B9B9B',
                      textColor: '#9B9B9B',
                      text: 'Favourite',
                      // iconInsets: { top: 0, left: 0, bottom: 0, right: 0 },
                      fontSize: 12,
                      selectedIconColor: '#FB9206',
                      selectedTextColor: '#FB9206',
                      badge: '',
                      badgeColor: 'gray'
                    }
                  }
                }
              },
              {
                stack: {
                  id: 'cart',
                  children: [
                    {
                      component: {
                        id: 'cart',
                        name: 'cart'
                      }
                    }
                  ],
                  options: {
                    bottomTab: {
                      icon: shoppingcart,
                      iconColor: '#9B9B9B',
                      textColor: '#9B9B9B',
                      text: 'Cart',
                      // iconInsets: { top: 0, left: 0, bottom: 0, right: 0 },
                      fontSize: 12,
                      selectedIconColor: '#FB9206',
                      selectedTextColor: '#FB9206',
                      badge: '',
                      badgeColor: 'gray'
                    }
                  }
                }
              },
              {
                stack: {
                  id: 'more',
                 
                  children: [
                    {
                      component: {
                        id: 'more',
                        name: 'more'
                      }
                    }
                  ],
                  options: {
                    bottomTab: {
                      icon: menu,
                      iconColor: '#9B9B9B',
                      textColor: '#9B9B9B',
                      text: 'More',
                      testID: 'moretab',
                      // iconInsets: { top: 0, left: 0, bottom: 0, right: 0 },
                      fontSize: 12,
                      badge: '',
                      selectedIconColor: '#FB9206',
                      selectedTextColor: '#FB9206',
                    }
                  }
                }
              }
            ]
          }
        }
      });
    });
  }
  
  // Define initial Stack to load some data initially
  export const initialize = () => Navigation.setRoot({
    root:
    {
      stack: {
        children: [
          {
            component: {
              id: 'initialize',
              name: 'initialize',
              options: {
                topBar:
                {
                  drawBehind: true,
                  visible: false,
                  animate: false
                }
              }
            }
          }
        ],
        options:
        {
          topBar: {
            visible: false
          }
        }
      }
    }
  });
  
  //Define LoginStack
  export const goToLogin = () => Navigation.setRoot({
    root:
    {
      stack: {
        children: [
          {
            component: {
              id: 'overlay',
              name: 'overlay',
              options: {
                topBar:
                {
                  drawBehind: false,
                  visible: false,
                  animate: false
                }
              }
            }
          }
        ],
        options:
        {
          topBar: {
            visible: false
          }
        }
      }
    }
  });