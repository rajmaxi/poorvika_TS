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
import { Colors} from 'react-native/Libraries/NewAppScreen';
import { SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Alert,Platform, FlatList} from 'react-native';
module.exports = {

      scrollview: {
        marginBottom: 50 , marginTop: Platform.OS === 'android' ?  0:0
      },
      engine: {
        position: 'absolute',
        right: 0,
      },
      body: {
        flex:1,
        backgroundColor: Colors.white,
      },
      connection:{
        backgroundColor: 'red', height: 40, alignItems: 'center', justifyContent: 'center'
      },
      card:
      {
        margin: 2, backgroundColor: 'white', alignItems: 'center', justifyContent:'center'
      },
      carouselstyle1: {
        height: 70, 
      }, 
      container: {
        flex: 1,
        
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      },
      ProgressBar:
      {
        width: 90, marginRight: 5
      },
      ratingitem:
      {
         alignItems: 'center', height:25, marginBottom: 0, flexDirection: 'row', justifyContent: 'center', backgroundColor:'white'
      },
      ratebypeople:
      {
        width: 50, height: 30, backgroundColor: Colors.green10, marginLeft: 5, alignItems: 'center', justifyContent: 'center'
      },
      flatlist:
      {
        backgroundColor: 'white', marginTop:0,  marginLeft: 5
      },
      image:
      {
        width: 70, height: 70, padding:5, margin: 10,
      },
      selectedimage:
      {
        width: 70, marginBottom:5, height: 70, padding:5, margin: 10,  
      },
      keyspeccontainer:
      {
        flex:1, marginTop: 0, paddingLeft:10, backgroundColor: 'white', 
      },
      keylist:
      {
        backgroundColor: 'white', marginTop:10, marginBottom: 10, marginRight:10, paddingLeft:10,
      },
      seperator:
      {
        borderBottomColor: 'gray', marginLeft: 15,
                borderBottomWidth: 0.5,
      },
      bottomview:
      {
        backgroundColor: 'red',
        flexDirection: 'row',position: 'absolute',
        alignItems: 'center', bottom: 0, 
        justifyContent: 'center', 
        borderTopWidth :0.3,
        borderTopColor: 'grey',
        borderBottomWidth :0.5,
        borderBottomColor: 'grey',
        
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: -1},
        // shadowOpacity: 0.3,
        // shadowRadius: 1,  
        // elevation: 2,
      },
      allreviews:
      {
        marginTop: 1, height:50, backgroundColor: 'white', marginBottom: 1,
      },
      allreviewrow:
      {
        flex:1, backgroundColor: 'white', borderColor:'gray', justifyContent: 'center', alignItems:'center',
      },
      producrcard:
      {
        flex:1, paddingLeft:10, marginTop: 5,  backgroundColor: 'white',
      },
      descriptioncontainer:
      {
        flex:1, marginTop: 1, marginBottom:1, justifyContent: 'center', alignItems:'center',
      },
      favouritecontainer:
      {
        flex:1,   margin: 2, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'
      },
      sharecontainer:
      {
        flex:1, marginTop: 2, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'
      },
      carosel:
      {
        height: 500, backgroundColor: 'white'
      },
      caroselimage:
      {
        width: '100%', height: '100%'
      },
      selected:
      {
        borderWidth: 1, marginBottom:5, borderColor: 'orange'
      },
      badgeIconView:{
        position:'relative',
        padding:5,
        borderRadius:20,
      },
      badge:{
        color:'#fff',
        position:'absolute',
        zIndex:10,
        top:1,
        right:1,
        padding:1,
        borderRadius:20
      },
      loadingcart:
      {
        position: "absolute", flex:1, height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center',
      },
      wait:
      {
        alignItems: 'center', width: 120, height: 100, borderRadius:10, borderWidth: 1, borderColor: '#fff', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' 
      },
      
      animatedHeaderContainer: {
        position: 'absolute',
        top: (Platform.OS == 'ios') ? 0 : 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
      },
      headerText: {
        color: 'white',
        fontSize: 22
      },
      item: {
        //backgroundColor: '#ff9e80',
        margin: 8,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
      },
      itemText: {
        color: 'black',
        fontSize: 16
      }
      
};