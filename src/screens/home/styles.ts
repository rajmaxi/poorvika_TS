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
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
    Dimensions
} from 'react-native';
module.exports = {
    scrollView: {
        backgroundColor: '#fff',
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        flex: 1,
        backgroundColor: '#fff'
    },
    connection: {
        backgroundColor: '#fff',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        margin: 2,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    carouselstyle1: {
        height: 70,
    },
    category__main: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: -50,
        marginBottom: 20,
        marginHorizontal: 10,
        padding: 10
    },
    image: {
        flex: 1,
        width: undefined,
        height: '100%',
        aspectRatio: 1
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    circle: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    banner: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: Colors.white,
        margin: 10,
        height: 230,
    },
    topmodel: {
        width: '100%',
        height: 40
    },
    categoryimage: {
        width: 50,
        height: 50
    },
    title: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: '#fff',
        borderRadius: 0,
        marginTop: 20,
    },
    flatlist: {
        backgroundColor: Colors.lightgrey,
        marginTop: 2
    },
    rowhead: {
        height: 250,
        flex: 1,
        width: Dimensions.get('window').width / 2,
        backgroundColor: '#fff',
        marginLeft: 0,
        marginRight: 1
    },
    carousel__images__main: {
        margin: 10,
    },
    heading: {
        color: '#000',
        textTransform: 'uppercase',
        fontSize: 15,
        letterSpacing: 0.5,
        marginVertical: 10
    },
    carousel__images: {
        borderWidth: 1,
        borderColor: '#fff',
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    carousel__images__strip: {
        marginHorizontal: 5,
        marginVertical: 30,
    },
    carousel__images_banner: {
        height: 100,
        width: '100%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 15
    },
    more__heading: {
        color: '#000',
        textTransform: 'capitalize',
        fontSize: 15,
        letterSpacing: 0.5,
        marginVertical: 5
    }

};