import React from 'react';
import { connect } from 'react-redux';
import AuthComponent from '../components/Auth';
import Errorbar from '../components/Errorbar';
import { setUser } from '../actions/user';
import { registerUser, signInUser } from '../utils/fetcher';

class Auth extends React.Component {
    constructor() {
        super();
        this.state = {
            login: true,
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


    /**
     * Auth inputs updates
     */
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    /**
     * Switch to login click
     */
    onLoginClick = () => {
        this.setState(prevState => ({
            login: true,
            error: ''
        }));
    }

    /**
     * Register click
     */
    onCreateClick = async () => {
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
        
        const res = await registerUser(register);
        if (res.error) {
            this.setState(prevState => ({
                error: res.error
            }));
            return;
        }
        this.props.login(res.user);
    }

    /**
     * Switch to signup button click
     */
    onSignupClick = () => {
        this.setState(prevState => ({
            login: false,
            error: ''
        }));
    }

    /**
     * Login click
     */
    onSigninClick = async () => {
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

        const res = await signInUser(login);
        if (res.error) {
            this.setState(prevState => ({
                error: res.error
            }));
            return;
        }

        this.props.login(res.user);
    }

    render() {
        return (
            <div>
                <AuthComponent
                    onLoginClick={this.onLoginClick}
                    onCreateClick={this.onCreateClick}
                    onSigninClick={this.onSigninClick}
                    onSignupClick={this.onSignupClick}
                    login={this.state.login}
                    onInputChange={this.onInputChange}
                    />
                { this.state.error ? <Errorbar message={this.state.error}/> : null }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    };
}

const mapDispatchToProps = dispatch => {
    return {
        login: user => dispatch(setUser(user))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
