import React from 'react';
import { formatDateBweet } from '../../utils/date';
import './style.scss';


class Bweet extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { user, text, timestamp, onLikeClick } = this.props;
        return (
            <div className='container'>
                <div className='user-container'>
                    <img src={user.picture} width='70' height='70' />

                    <div className='name-container'>
                        <div className='name'>
                            {`${user.firstName} ${user.lastName}`}
                        </div>

                        <div className='handle'>
                            {`(@${user.handle})`}
                        </div>
                    </div>
                </div>
            
                <div className='text'>
                    {text}
                </div>

                <div className='timestamp'>
                    { formatDateBweet(timestamp) }
                </div>

                <input id='toggle-heart' type='checkbox' onClick={onLikeClick}/>
                <label for='toggle-heart'>❤</label>
            </div>
        )
    }
}

export default Bweet;