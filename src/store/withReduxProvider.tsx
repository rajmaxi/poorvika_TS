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
import {createStore, applyMiddleware} from 'redux'; 
import { Provider } from 'react-redux';
import React from 'react';

import createSagaMiddleware from 'redux-saga';
import rootSaga from 'saga';
import rootreducer from 'reducer/rootreducer'

const sagaMiddleware = createSagaMiddleware();
/*Define Store*/
const store = createStore(rootreducer,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga);

export const withReduxProvider = (C: React.FC) => (props: any) => (
    <Provider store={store}>
        <C {...props}/>
    </Provider>
);

