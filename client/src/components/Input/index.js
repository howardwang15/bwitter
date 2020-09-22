import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class Input extends React.Component {
    render() {
        const {
            label,
            type,
            name,
            placeholder,
            onChange,
        } = this.props;

        return (
            <div className='input-container'>
                <span>{label}</span>
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            </div>
        );
    }
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Input;
