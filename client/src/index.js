import React from 'react';
import ReactDOM from 'react-dom';
import Bweet from './components/Bweet';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const root = (
    <div>
        <Bweet
            user={{firstName: 'Howard', lastName: 'Wang', handle: 'howardwang15'}}
            text='This is some text' 
            timestamp={new Date()}
            onClick={(e) => console.log(e.target.checked)}
            />
    </div>
);

ReactDOM.render(root, document.getElementById('root'));
