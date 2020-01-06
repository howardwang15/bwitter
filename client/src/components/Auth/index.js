import React from 'react';
import Register from './register';
import Login from './login';

class Auth extends React.Component {
    render() {
        const { login, onCreateClick, onLoginClick, onSigninClick, onSignupClick, onInputChange } = this.props;
        return (
            login ? 
                <Login
                    onLoginClick={onSigninClick}
                    onSignupClick={onSignupClick}
                    onInputChange={onInputChange}
                    />
            :
                <Register
                    onCreateClick={onCreateClick}
                    onLoginClick={onLoginClick}
                    onInputChange={onInputChange}
                    />
        )
    }
}

export default Auth;