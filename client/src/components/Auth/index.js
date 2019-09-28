import React from 'react';
import Register from './register';
import Login from './login';

class Auth extends React.Component {
    render() {
        const { onCreateClick, onLoginClick, onSigninClick, onSignupClick } = this.props;
        return (
            // <Register onCreateClick={onCreateClick} onLoginClick={onLoginClick} />
            <Login onLoginClick={onSigninClick} onSignupClick={onSignupClick} />
        )
    }
}

export default Auth;