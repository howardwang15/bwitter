import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Main from './containers/main';
import rootReducer from './reducers';

const root = (
    <Provider store={createStore(rootReducer)}>
        <Main />
    </Provider>
);

ReactDOM.render(root, document.getElementById('root'));
