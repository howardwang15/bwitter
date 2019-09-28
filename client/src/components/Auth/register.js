import React from 'react';
import Input from '../Input';
import Button from '../Button';
import './styles.scss';

class Register extends React.Component {
    render() {
        return (
            <div className='register-container'>
                <span className='title'>Sign Up</span>
                <Input placeholder='First Name...' label='First Name' />
                <Input placeholder='Last Name...' label='Last Name' />
                <Input placeholder='Handle...' label='Handle' />
                <Input placeholder='Email...' label='Email' />
                <Input placeholder='Password...' label='Password' />
                <Button text='Create!' />
                <div className='signin-text'>
                    <span>Already have an account?</span>
                    <Button text='Login' />
                </div>
            </div>
        )
    }
}

export default Register;
