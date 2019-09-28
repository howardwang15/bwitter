import React from 'react';
import './styles.scss';

class Input extends React.Component {
    render() {
        const { label, placeholder, onChange } = this.props;
        return (
            <div className='input-container'>
                <span>{label}</span>
                <input type='text' placeholder={placeholder} onChange={onChange} />
            </div>
        )
    }
}

export default Input;