import React from 'react';
import { connect } from 'react-redux';
import Auth from './auth';
import Homepage from './homepage';


class MainComponent extends React.Component {
    render() {
        const loggedIn = localStorage.getItem('user') || this.props.user;
        return (
            loggedIn ? <Homepage /> : <Auth />
        )
    }
}

const mapStateToProps = state => {
    return state.auth;
}

export default connect(mapStateToProps)(MainComponent);
