import React from 'react';
import Bweet from '../Bweet';
import './styles.scss';

class BweetList extends React.Component {
    render() {
        const { bweets, onBweetLikeClick, onBweetDelete } = this.props;
        return (
            <div className="bweetlist-container">
                {
                    bweets.map(bweet => 
                    <Bweet 
                        user={bweet.user} 
                        text={bweet.text} 
                        timestamp={bweet.timestamp} 
                        liked={bweet.liked} 
                        likes={bweet.likes}
                        onLikeClick={(e) => onBweetLikeClick(e, bweet.liked, bweet.id)}
                        onDeleteClick={() => onBweetDelete(bweet.id)}
                        key={bweet.id}
                        />)
                    }
            </div>
        );
    }
}

export default BweetList;
