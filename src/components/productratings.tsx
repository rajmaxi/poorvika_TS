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
import React from 'react';
import { Colors, Card, Text, View, } from 'react-native-ui-lib';
import styles from '../screens/productinfo/styles'

import I18n from 'locale/i18n';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ProgressBar } from 'react-native-paper';

// Custom component for show rating card
// Receive componentId, rating, reviewcount , one, two, three, four, five as Props

export default function productratings(props: { componentId: string, one, two, three, four, five, rating: number, reviewcount: number }) {
 // console.log('Ratings...' + props.one + ' ' + props.four)
  return (
    <Card>
      <View row flex-2 style={{ height: 170 }}>
        <View flex-1 center bg-white>
          <View flex-1 center bg-white>
            <View>
              <Text text100BO normalText style={{ color: Colors.green10, fontSize: 30, fontWeight: '600' }}> {props.rating} ★ </Text>
            </View>

            <Text text100BO marginT-5 normalText style={{ color: Colors.grey10, fontSize: 18 }}>{I18n.t('productdetails.ratedby')}</Text>
            <Text text100BO marginT-5 normalText style={{ color: Colors.grey10, fontSize: 18 }}> {props.reviewcount} People </Text>
          </View>

        </View>
        <View flex-1 center bg-white>
          <View style={styles.ratingitem}>
            <Text marginR-5>5</Text>
            <Icon name="star" marginR-5 size={15} color={'black'} onPress={() => { }} />
            <ProgressBar accessibilityStates={true} progress={props.five / 10} style={styles.ProgressBar} color={(props.five == 0 ? Colors.grey10 : Colors.green10)} />
            <Text marginL-5 style={{ width: 50 }}>{props.five}</Text>
          </View>

          <View style={styles.ratingitem}>
            <Text marginR-5>4</Text>
            <Icon name="star" marginR-5 size={15} color={'black'} onPress={() => { }} />
            <ProgressBar accessibilityStates={true} progress={props.four / 10} style={styles.ProgressBar} color={(props.four == 0 ? Colors.grey10 : Colors.green10)} />
            <Text marginL-5 style={{ width: 50 }}>{props.four}</Text>
          </View>

          <View style={styles.ratingitem}>
            <Text marginR-5>3</Text>
            <Icon name="star" marginR-5 size={15} color={'black'} onPress={() => { }} />
            <ProgressBar accessibilityStates={true} progress={props.three / 10} style={styles.ProgressBar} color={Colors.grey10} />
            <Text marginL-5 style={{ width: 50 }}>{props.three}</Text>
          </View>

          <View style={styles.ratingitem}>
            <Text marginR-5>2</Text>
            <Icon name="star" marginR-5 size={15} color={'black'} onPress={() => { }} />
            <ProgressBar accessibilityStates={true} progress={props.two / 10} style={styles.ProgressBar} color={Colors.grey10} />
            <Text marginL-5 style={{ width: 50 }}>{props.two}</Text>
          </View>

          <View style={styles.ratingitem}>
            <Text marginR-5>1</Text>
            <Icon name="star" marginR-5 size={15} color={'black'} onPress={() => { }} />
            <ProgressBar accessibilityStates={true} progress={props.one / 10} style={styles.ProgressBar} color={Colors.red10} />
            <Text marginL-5 style={{ width: 50 }}>{props.one}</Text>
          </View>
        </View>

      </View>
    </Card>
  )
}