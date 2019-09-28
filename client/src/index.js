import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import BweetList from './containers/bweetList';
import Auth from './containers/auth';
import rootReducer from './reducers';



const root = (
    <Provider store={createStore(rootReducer)}>
        <Auth />
    </Provider>
);

ReactDOM.render(root, document.getElementById('root'));
