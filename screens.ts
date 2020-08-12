import {Navigation} from "react-native-navigation";

import Home from 'screens/home'
import navHeader from 'components/navheader'
import search from 'components/search'
import navTitle from 'components/navtitle'

import more from 'screens/more'
import cart from 'screens/cart'
import favourite from 'screens/favourite'
import deals from 'screens/deals'

import Login from 'screens/login'
import moreproducts from 'screens/moreproducts'
import productinfo from 'screens/productinfo'
import description from 'screens/productinfo/description'
import preview from 'screens/productinfo/preview'
import review from 'screens/reviews/'
import writereview from 'screens/reviews/writereview'
import mobile from 'screens/home/mobile'
import overlay from 'screens/overlay'
import searchcategory from 'screens/searchcategory'
import Payments from 'screens/payments'
import MyOrder from 'screens/myorder'
import Register from 'screens/register'
import Otp from 'screens/otp'
import ForgotPassword from 'screens/forgotpassword'
import ChangePassword from 'screens/changepassword'
import Address from "screens/address"
import Account from "screens/account"
import service from "../src/screens/searchservice"
import showroom from "../src/screens/searchShowroom"
import Checkout from "screens/checkout"
import initialize from 'EcommerceApp/src/initialize'
import privilege from './src/screens/privilege'

import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {withReduxProvider} from './store/withReduxProvider'

console.disableYellowBox = true;
/*Register Screens using wix*/
export function registerScreens() {

    Navigation.registerComponent('navHeader', () => gestureHandlerRootHOC(withReduxProvider(navHeader)), () => navHeader);
    Navigation.registerComponent('navTitle', () => gestureHandlerRootHOC(withReduxProvider(navTitle)), () => navTitle);
    Navigation.registerComponent('Home', () => gestureHandlerRootHOC(withReduxProvider(Home)), () => Home);
    Navigation.registerComponent('more', () => gestureHandlerRootHOC(withReduxProvider(more)), () => more);
    Navigation.registerComponent('productinfo', () => gestureHandlerRootHOC(withReduxProvider(productinfo)), () => productinfo);
    Navigation.registerComponent('description', () => gestureHandlerRootHOC(withReduxProvider(description)), () => description);
    Navigation.registerComponent('cart', () => gestureHandlerRootHOC(withReduxProvider(cart)), () => cart);
    Navigation.registerComponent('favourite', () => gestureHandlerRootHOC(withReduxProvider(favourite)), () => favourite);
    Navigation.registerComponent('deals', () => gestureHandlerRootHOC(withReduxProvider(deals)), () => more);
    Navigation.registerComponent('moreproducts', () => gestureHandlerRootHOC(withReduxProvider(moreproducts)), () => moreproducts);
    Navigation.registerComponent('Login', () => gestureHandlerRootHOC(withReduxProvider(Login)), () => Login);
    Navigation.registerComponent('preview', () => gestureHandlerRootHOC(withReduxProvider(preview)), () => preview);
    Navigation.registerComponent('review', () => gestureHandlerRootHOC(withReduxProvider(review)), () => review);
    Navigation.registerComponent('writereview', () => gestureHandlerRootHOC(withReduxProvider(writereview)), () => writereview);
    Navigation.registerComponent('mobile', () => gestureHandlerRootHOC(withReduxProvider(mobile)), () => mobile);
    Navigation.registerComponent('overlay', () => gestureHandlerRootHOC(withReduxProvider(overlay)), () => overlay);
    Navigation.registerComponent('search', () => gestureHandlerRootHOC(withReduxProvider(search)), () => search);
    Navigation.registerComponent('searchcategory', () => gestureHandlerRootHOC(withReduxProvider(searchcategory)), () => searchcategory);
    Navigation.registerComponent('Account', () => gestureHandlerRootHOC(withReduxProvider(Account)), () => Account);
    Navigation.registerComponent('Address', () => gestureHandlerRootHOC(withReduxProvider(Address)), () => Address);
    Navigation.registerComponent('Login', () => gestureHandlerRootHOC(withReduxProvider(Login)), () => Login);
    Navigation.registerComponent('Register', () => gestureHandlerRootHOC(withReduxProvider(Register)), () => Register);
    Navigation.registerComponent('Otp', () => gestureHandlerRootHOC(withReduxProvider(Otp)), () => Otp);
    Navigation.registerComponent('ForgotPassword', () => gestureHandlerRootHOC(withReduxProvider(ForgotPassword)), () => ForgotPassword);
    Navigation.registerComponent('ChangePassword', () => gestureHandlerRootHOC(withReduxProvider(ChangePassword)), () => ChangePassword);
    Navigation.registerComponent('Checkout', () => gestureHandlerRootHOC(withReduxProvider(Checkout)), () => Checkout);
    Navigation.registerComponent('Payments', () => gestureHandlerRootHOC(withReduxProvider(Payments)), () => Payments);
    Navigation.registerComponent('MyOrder', () => gestureHandlerRootHOC(withReduxProvider(MyOrder)), () => MyOrder);
    Navigation.registerComponent('initialize', () => gestureHandlerRootHOC(withReduxProvider(initialize)), () => initialize);
    Navigation.registerComponent('service', () => gestureHandlerRootHOC(withReduxProvider(service)), () => service);
    Navigation.registerComponent('showroom', () => gestureHandlerRootHOC(withReduxProvider(showroom)), () => showroom);  
    Navigation.registerComponent('privilege', () => gestureHandlerRootHOC(withReduxProvider(privilege)), () => privilege);  
}
