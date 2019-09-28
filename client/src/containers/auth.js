import React from 'react';
import AuthComponent from '../components/Auth';
import Errorbar from '../components/Errorbar';

class Auth extends React.Component {

    constructor() {
        super();
        this.state = {
            register: true,
            email: '',
            password: '',
            passwordReenter: '',
            firstName: '',
            lastName: '',
            handle: '',
            error: ''
        };
    }


    validateSignup = register => {
        for (let key of Object.keys(register)) {
            if (register[key] === '') {
                return {
                    valid: false,
                    error: 'Fields can\'t be empty'
                };
            }
        }

        if (register.password !== register.passwordReenter) {
            return {
                valid: false,
                error: 'Passwords don\'t match'
            };
        }

        return {
            valid: true,
            error: null
        };
    }

    validateLogin = login => {
        for (let key of Object.keys(login)) {
            if (login[key] === '') {
                return {
                    valid: false,
                    error: 'Fields can\'t be empty'
                };
            }
        }
        return {
            valid: true,
            error: null
        };
    }


    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onLoginClick = () => {
        this.setState(prevState => ({
            register: false,
            error: ''
        }));
    }


    onCreateClick = () => {
        let signup = {
            email: this.state.email,
            password: this.state.password,
            passwordReenter: this.state.passwordReenter,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            handle: this.state.handle
        };
        const validation = this.validateSignup(signup);
        if (!validation.valid) {
            this.setState(prevState => ({
                error: validation.error
            }));
            return;
        }

        const { passwordReenter, ...register } = signup;
    }


    onSignupClick = () => {
        this.setState(prevState => ({
            register: true,
            error: ''
        }));
    }

    onSigninClick = () => {
        const login = {
            email: this.state.email,
            password: this.state.password
        };

        const validation = this.validateLogin(login);
        if (!validation.valid) {
            this.setState(prevState => ({
                error: validation.error
            }));
            return;
        }
    }

    render() {
        return (
            <div>
                <AuthComponent
                    onLoginClick={this.onLoginClick}
                    onCreateClick={this.onCreateClick}
                    onSigninClick={this.onSigninClick}
                    onSignupClick={this.onSignupClick}
                    register={this.state.register}
                    onInputChange={this.onInputChange}
                    />
                { this.state.error ? <Errorbar message={this.state.error}/> : null }
            </div>
        )
    }
}

export default Auth;