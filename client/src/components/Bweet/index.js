import React from 'react';
import PropTypes from 'prop-types';
import formatDateBweet from '../../utils/date';
import Button from '../Button';
import './style.scss';

class Bweet extends React.Component {
    constructor() {
        super();
        this.currentUser = JSON.parse(localStorage.getItem('user'));
    }

    render() {
        const {
            user,
            text,
            timestamp,
            onLikeClick,
            onDeleteClick,
            likes,
            liked,
        } = this.props;

        const heartClass = liked ? 'like-button liked' : 'like-button';
        const hideDeleteButton = this.currentUser.handle !== user.handle;
        return (
            <div className='container'>
                <div className='user-container'>
                    <img src={user.picture} width='70' height='70' alt='profile' />

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

                <div className='bottom'>
                    <Button
                        text='Delete'
                        color='gray'
                        hidden
                    />
                    <div className='like-button-container'>
                        <div className={heartClass} onClick={onLikeClick} role='button' tabIndex='-1' />
                        <div className='likes'>{likes}</div>
                    </div>
                    <Button
                        text='Delete'
                        color='red'
                        hidden={hideDeleteButton}
                        onClick={onDeleteClick}
                    />
                </div>
            </div>
        );
    }
}

Bweet.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        handle: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,

    }),
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    onLikeClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    likes: PropTypes.number.isRequired,
    liked: PropTypes.bool.isRequired,
};

export default Bweet;
