import React from 'react';
import ReactDOM from 'react-dom';
import BweetList from './containers/bweetList';
import { Provider } from 'react-redux';
import { createStore } from 'redux';



const root = (
    <BweetList />
);

ReactDOM.render(root, document.getElementById('root'));
