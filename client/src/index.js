import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import BweetList from './containers/bweetList';
import rootReducer from './reducers';



const root = (
    <Provider store={createStore(rootReducer)}>
        <BweetList />
    </Provider>
);

ReactDOM.render(root, document.getElementById('root'));
