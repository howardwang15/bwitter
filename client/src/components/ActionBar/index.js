import React from 'react';
import Button from '../Button';
import './styles.scss';

class ActionBar extends React.Component {
    render() {
        return (
            <div className='actionbar-container'>
                <Button
                    text="Compose new Bweet"
                    color="gray"
                    />
            </div>
        )
    }
}

export default ActionBar;
