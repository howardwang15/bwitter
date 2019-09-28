import React from 'react';
import AuthComponent from '../components/Auth';

class Auth extends React.Component {

    onLoginClick = () => {
        console.log('Switching to sign in!');
    }

    onCreateClick = () => {
        console.log('Creating user!');
    }

    onSigninClick = () => {
        console.log('Signing in user!');
    }

    onSignupClick = () => {
        console.log('Switching to sign up!');
    }

    render() {
        return (
            <AuthComponent
                onLoginClick={this.onLoginClick}
                onCreateClick={this.onCreateClick}
                onSigninClick={this.onSigninClick}
                onSignupClick={this.onSignupClick}
                />
        )
    }
}

export default Auth;