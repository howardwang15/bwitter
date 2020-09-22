import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class Button extends React.Component {
    render() {
        const {
            text,
            onClick,
            color,
            hidden,
        } = this.props;

        const hide = hidden ? 'hidden' : '';
        return (
            <button className={`button-${color} ${hide}`} onClick={onClick}>{text}</button>
        );
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    hidden: PropTypes.bool.isRequired,
};

export default Button;
