import React from 'react';
import { connect } from 'react-redux';
import Auth from './auth';
import BweetList from './bweetList';


class MainComponent extends React.Component {
    render() {
        const user = localStorage.getItem('user');
        return (
            user ? <BweetList /> : <Auth />
        )
    }
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps)(MainComponent);
