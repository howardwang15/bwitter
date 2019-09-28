import React from 'react';
import Register from './register';
import Login from './login';

class Auth extends React.Component {
    render() {
        const { onCreateClick, onLoginClick, onSigninClick, onSignupClick, register } = this.props;
        return (
            this.props.register ? 
                <Register onCreateClick={onCreateClick} onLoginClick={onLoginClick} />
            :
                <Login onLoginClick={onSigninClick} onSignupClick={onSignupClick} />
        )
    }
}

export default Auth;