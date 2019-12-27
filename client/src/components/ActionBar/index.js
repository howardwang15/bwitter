import React from 'react';
import Button from '../Button';
import './styles.scss';

class ActionBar extends React.Component {
    render() {
        const { onButtonClick } = this.props;
        return (
            <div className='actionbar-container'>
                <Button
                    text="Compose new Bweet"
                    color="gray"
                    onClick={onButtonClick}
                    />
            </div>
        )
    }
}

export default ActionBar;
