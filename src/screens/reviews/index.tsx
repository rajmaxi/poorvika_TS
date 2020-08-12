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
import React, { useState, Component, useEffect } from 'react';
import { SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Colors, Typography, Spacings, Swipeable, Button, Modal, Card, Image, Carousel, Text, View, LoaderScreen, ScrollBar } from 'react-native-ui-lib';
import styles from './styles'
import I18n from 'locale/i18n';
import ConnectionStatusBar from 'components/connectionstatusbar'
import SimpleHeader from 'components/simpleheader'
import _ from 'lodash';
const review: reviewtype = (reviewprops): JSX.Element => {
  const [componentId, setComponentId] = useState(reviewprops.componentId);
  const [reviewdata, setReviewData] = useState<Array<{ rating: string, date_added: string, text: string, author: string }>>(reviewprops.data);

  useEffect(() => {
    I18n.locale = 'fr'
  });


  //  listview seperator
  const RenderSeparator = () => {
    return (
      <View marginB-10 marginT-10
        style={
          styles.seperator
        }
      />
    )
  }

  // render review list with
  // review data is Flatlist Array
  const RenderFlatList = () => {
    return (
      <FlatList
        style={styles.list}
        data={reviewdata}

        renderItem={({ item: rowData, index }) => {
          return (
            <View marginB-10 marginT-10 maringR-5>
              <View row marginL-10 marginR-10 flex-1 style={{ justifyContent: 'space-between' }}>
                <View row center>
                  <View row center marginL-5 width-70 height-25 style={{ borderRadius: 5, backgroundColor: Colors.green10, }}>
                    <Text text100BO normalText style={{ color: Colors.white, fontWeight: '600' }}> {rowData.rating} ★</Text>
                  </View>
                  <Text normalText marginL-10>{rowData.author}</Text>
                </View>
                <Text marginL-10 ormalText style={{ alignSelf: 'flex-end' }}>{rowData.date_added}</Text>
              </View>
              <Text normalText marginL-10 marginT-10>{rowData.text}</Text>
              {/* {renderSeparator()}  */}
              {RenderSeparator()}
            </View>
          );
        }
        }>
      </FlatList>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: 'white' }}>
        <ConnectionStatusBar></ConnectionStatusBar>
        <SimpleHeader componentId={componentId} title="Read Review" enableback={true}></SimpleHeader>
        <ScrollView style={{ marginBottom: 50 }}>
          <View>
            <ConnectionStatusBar></ConnectionStatusBar>
            {RenderFlatList()}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
/*Use Redux connect*/
export default review;

