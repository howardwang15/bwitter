import React from 'react';
import Input from '../Input';
import Button from '../Button';
import './styles.scss';

class Login extends React.Component {
    render() {
        const { onLoginClick, onSignupClick } = this.props;
        return (
            <div className='login-container'>
                <span className='title'>Login</span>
                <Input placeholder='Email...' label='Email' />
                <Input placeholder='Password...' label='Password' />
                <Button text='Login!' color='blue' onClick={onLoginClick} />
                <div className='signup-text'>
                    <span>Don't have an account?</span>
                    <Button text='Sign Up' color='gray' onClick={onSignupClick} />
                </div>
            </div>
        )
    }
}

export default Login;