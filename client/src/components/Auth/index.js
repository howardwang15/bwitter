import React from 'react';
import PropTypes from 'prop-types';
import Register from './register';
import Login from './login';

class Auth extends React.Component {
    render() {
        const {
            login,
            onCreateClick,
            onLoginClick,
            onSigninClick,
            onSignupClick,
            onInputChange,
        } = this.props;

        return (
            login
                ? (
                    <Login
                        onLoginClick={onSigninClick}
                        onSignupClick={onSignupClick}
                        onInputChange={onInputChange}
                    />
                )
                : (
                    <Register
                        onCreateClick={onCreateClick}
                        onLoginClick={onLoginClick}
                        onInputChange={onInputChange}
                    />
                )
        );
    }
}

Auth.propTypes = {
    login: PropTypes.bool.isRequired,
    onCreateClick: PropTypes.func.isRequired,
    onLoginClick: PropTypes.func.isRequired,
    onSigninClick: PropTypes.func.isRequired,
    onSignupClick: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
};

export default Auth;
