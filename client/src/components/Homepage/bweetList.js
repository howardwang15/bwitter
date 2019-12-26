import React from 'react';
import Bweet from '../Bweet';
import './styles.scss';

class BweetList extends React.Component {
    render() {
        return (
            <div className="bweetlist-container">
                {
                    this.props.bweets.map(bweet => 
                    <Bweet 
                        user={bweet.user} 
                        text={bweet.text} 
                        timestamp={bweet.timestamp} 
                        liked={bweet.liked} 
                        likes={bweet.likes}
                        onLikeClick={(e) => this.props.onBweetLikeClick(e, bweet.liked, bweet.id)} 
                        key={bweet.id}
                        />)
                    }
            </div>
        );
    }
}

export default BweetList;
