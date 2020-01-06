import React from 'react';
import Button from '../Button';
import './styles.scss';

class ActionBar extends React.Component {
    render() {
        const { onComposeClick, onLogoutClick } = this.props;
        return (
            <div className='actionbar-container'>
                <Button
                    text="Logout"
                    color="gray"
                    onClick={onLogoutClick}
                    />
                <Button
                    text="Compose new Bweet"
                    color="gray"
                    onClick={onComposeClick}
                    />
            </div>
        )
    }
}

export default ActionBar;
