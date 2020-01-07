import React from 'react';
import './styles.scss';

class Button extends React.Component {
    render() {
        const { text, onClick, color, hidden } = this.props;
        const hide = hidden ? 'hidden' : '';
        return (
            <button className={`button-${color} ${hide}`} onClick={onClick}>{text}</button>
        )
    }
}

export default Button;