import React from 'react';
import AuthComponent from '../components/Auth';

class Auth extends React.Component {

    constructor() {
        super();
        this.state = {
            register: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            handle: ''
        };
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
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
        console.log(this.state.email);
        console.log(this.state.password);
    }

    render() {
        return (
            <AuthComponent
                onLoginClick={this.onLoginClick}
                onCreateClick={this.onCreateClick}
                onSigninClick={this.onSigninClick}
                onSignupClick={this.onSignupClick}
                register={this.state.register}
                onInputChange={this.onInputChange}
                />
        )
    }
}

export default Auth;