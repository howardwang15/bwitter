import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Auth from './auth';
import Homepage from './homepage';

class MainComponent extends React.Component {
    render() {
        const { user } = this.props;
        const loggedIn = localStorage.getItem('user') || user;
        return (
            loggedIn ? <Homepage /> : <Auth />
        );
    }
}

const mapStateToProps = (state) => state.auth;

MainComponent.propTypes = {
    user: PropTypes.shape({ name: PropTypes.string.isRequired }),
};

export default connect(mapStateToProps)(MainComponent);
