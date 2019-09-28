import React from 'react';
import './styles.scss';

class Button extends React.Component {
    render() {
        const { text, onClick, color } = this.props;
        return (
            <button className={`button-${color}`} onClick={onClick}>{text}</button>
        )
    }
}

export default Button;