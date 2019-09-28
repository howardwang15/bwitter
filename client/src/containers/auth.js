import React from 'react';
import AuthComponent from '../components/Auth';

class Auth extends React.Component {

    constructor() {
        super();
        this.state = {
            register: false
        };
    }

    onLoginClick = () => {
        this.setState(prevState => ({
            register: false
        }));
    }

    onCreateClick = () => {
        console.log('Creating user!');
    }


    onSignupClick = () => {
        this.setState(prevState => ({
            register: true
        }));
    }

    onSigninClick = () => {
        console.log('Signing in user!');
    }

    render() {
        return (
            <AuthComponent
                onLoginClick={this.onLoginClick}
                onCreateClick={this.onCreateClick}
                onSigninClick={this.onSigninClick}
                onSignupClick={this.onSignupClick}
                register={this.state.register}
                />
        )
    }
}

export default Auth;