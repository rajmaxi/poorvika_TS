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
import { SafeAreaView, StatusBar, ScrollView, AsyncStorage, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Colors, Typography, Spacings, Toast, Swipeable, Button, Modal, TextField, Card, Image, Carousel, Text, View, LoaderScreen, ScrollBar } from 'react-native-ui-lib';
import styles from './styles'
import I18n from 'locale/i18n';
import ConnectionStatusBar from 'components/connectionstatusbar'

import { addreview } from './service'
import SimpleHeader from 'components/simpleheader'

import StarRating from 'react-native-star-rating';
import {
  StyleSheet,
} from 'react-native';
import _ from 'lodash';
import { Navigation } from 'react-native-navigation';

const writereview: writereviewtype = (writereviewprops): JSX.Element => {
  const [name, onChangeText] = React.useState<string>('');
  const [review, changereview] = React.useState<string>('');
  const [showtoast, setShowToast] = useState<boolean>(false)
  const [error, setError] = useState<string>('');
  const [starCount, setRating] = useState<number>(0)

  useEffect(() => {
    I18n.locale = 'fr'
  }, []);

  // Custom function for review item
  const ReviewNow = async () => {
    var reviewrespone = '';
    try {
      const value = await AsyncStorage.getItem('token');
      (value !== null) ?
        {} : {}
      var body = {
        "name": name,
        "text": review,
        "rating": starCount
      }
      reviewrespone = await addreview(writereviewprops.id, value, body)
      const error = reviewrespone.error;
     // console.log('Respone ' + JSON.stringify(reviewrespone))
      if (reviewrespone.success == 0) {
        setError(reviewrespone.error[0])
        setShowToast(true)
      }
      else
        Navigation.pop(writereviewprops.componentId)
      //Alert.alert('Info','Succesfully posted the review...')
    }
    catch (err) {
      //Alert.alert('Response: '+reviewrespone.error)
    }
  }

  // render wirtereview design  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View bg-white >

        <View>
          <ConnectionStatusBar></ConnectionStatusBar>
          <SimpleHeader componentId={writereviewprops.componentId} title={'Write Review'} enableback={true}></SimpleHeader>
          <Toast
            visible={showtoast}
            backgroundColor={'red'}
            allowDismiss={true}
            autoDismiss={1500}
            onDismiss={() => {
              setShowToast(false)
            }}
            position={'top'}>
            <TouchableOpacity style={styles.toast} onPress={() => setShowToast(false)} >
              <Text white text70>
                {error}
              </Text>
            </TouchableOpacity>
          </Toast>
          <View>
            <View center marginT-20>
              <Text normalText style={{textAlign:"center"}}>{writereviewprops.name}</Text>
              <View style={styles.starrating}>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={starCount}
                  fullStarColor={Colors.orange10}
                  emptyStar={'star-o'}
                  fullStar={'star'}
                  halfStar={'star-half-o'}
                  iconSet={'FontAwesome'}
                  starSize={25}
                  selectedStar={(rating) => setRating(rating)}
                />
              </View>
            </View>

            <View margin-10>
              <TextInput
                style={styles.input1}
                onChangeText={text => onChangeText(text)}
                value={name}
                paddingHorizontal={5}
                placeholder={I18n.t('name')}
              />
              <TextInput
                style={styles.input2}
                onChangeText={text => changereview(text)}
                value={review}
                textAlignVertical='top'
                placeholder={I18n.t('writereview')}
                paddingHorizontal={5}
                numberOfLines={10}
                multiline={true}
              />

              <Button
                marginT-10 height-40 bg-orange10 enableShadow
                labelStyle={styles.buttonlabel}
                onPress={() => ReviewNow()}
                label={I18n.t('submit')}>

              </Button>
            </View>
          </View>
        </View>
      </View>


    </SafeAreaView>
  );
}

writereview.options = {
  topBar: {
    visible: false, height: 0,
  }
}
/*Use Redux connect*/
export default writereview;

