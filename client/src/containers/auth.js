import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthComponent from '../components/Auth';
import Errorbar from '../components/Errorbar';
import { setUserAction } from '../actions/user';
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
            photo: '',
            error: '',
        };
    }

    validateSignup = (register) => {
        for (const key of Object.keys(register)) {
            if (register[key] === '') {
                return {
                    valid: false,
                    error: 'Fields can\'t be empty',
                };
            }
        }

        if (register.password !== register.passwordReenter) {
            return {
                valid: false,
                error: 'Passwords don\'t match',
            };
        }

        return {
            valid: true,
            error: null,
        };
    }

    validateLogin = (login) => {
        for (const key of Object.keys(login)) {
            if (login[key] === '') {
                return {
                    valid: false,
                    error: 'Fields can\'t be empty',
                };
            }
        }
        return {
            valid: true,
            error: null,
        };
    }

    /**
     * Auth inputs updates
     */
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    /**
     * Switch to login click
     */
    onLoginClick = () => {
        this.setState(() => ({
            login: true,
            error: '',
        }));
    }

    /**
     * Register click
     */
    onCreateClick = async () => {
        const {
            email,
            password,
            passwordReenter,
            firstName,
            lastName,
            handle,
            photo,
        } = this.state;

        const { login } = this.props;

        const signup = {
            email,
            password,
            passwordReenter,
            firstName,
            lastName,
            handle,
            photo,
        };

        const validation = this.validateSignup(signup);
        if (!validation.valid) {
            this.setState(() => ({
                error: validation.error,
            }));
            return;
        }

        delete signup.passwordReenter;
        const res = await registerUser(signup);
        if (res.error) {
            this.setState(() => ({
                error: res.error,
            }));
            return;
        }
        login(res.user);
    }

    /**
     * Switch to signup button click
     */
    onSignupClick = () => {
        this.setState(() => ({
            login: false,
            error: '',
        }));
    }

    /**
     * Login click
     */
    onSigninClick = async () => {
        const { email, password } = this.state;
        const { login } = this.props;

        const loginObj = {
            email,
            password,
        };

        const validation = this.validateLogin(loginObj);
        if (!validation.valid) {
            this.setState(() => ({
                error: validation.error,
            }));
            return;
        }

        const res = await signInUser(loginObj);
        if (res.error) {
            this.setState(() => ({
                error: res.error,
            }));
            return;
        }

        login(res.user);
    }

    render() {
        const { error, login } = this.state;
        return (
            <div>
                <AuthComponent
                    onLoginClick={this.onLoginClick}
                    onCreateClick={this.onCreateClick}
                    onSigninClick={this.onSigninClick}
                    onSignupClick={this.onSignupClick}
                    login={login}
                    onInputChange={this.onInputChange}
                />
                { error ? <Errorbar message={error} /> : null }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
    login: (user) => dispatch(setUserAction(user)),
});

Auth.propTypes = {
    login: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
