import React from 'react';
import { connect } from 'react-redux';
import Bweet from '../components/Bweet';
import { incrementLikeCount, decrementLikeCount, setBweets } from '../actions/bweets';
import { API_URL, ALL_BWEETS_ROUTE } from '../config';

class BweetList extends React.Component {

    constructor() {
        super();
        this.updateLikeCount = this.updateLikeCount.bind(this);
    }

    async componentDidMount() {
        const url = `${API_URL}${ALL_BWEETS_ROUTE}`;
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const bweets = await res.json();
        this.props.setBweets(bweets.data);
    }

    updateLikeCount(e, liked, id) {
        if (liked) {
            this.props.decrementLikes(id);
        } else {
            this.props.incrementLikes(id);
        }
    }

    render() {
        return (
            this.props.bweets.bweets.map(bweet => 
                    <Bweet 
                        user={bweet.user} 
                        text={bweet.text} 
                        timestamp={bweet.timestamp} 
                        liked={bweet.liked} 
                        likes={bweet.likes}
                        onLikeClick={(e) => this.updateLikeCount(e, bweet.liked, bweet.id)} 
                        key={bweet.id}
                        />)
        );
    }
}

const mapStateToProps = state => {
    return { bweets: state.bweets };
};

const mapDispatchToProps = dispatch => {
    return {
        incrementLikes: likes => dispatch(incrementLikeCount(likes)),
        decrementLikes: likes => dispatch(decrementLikeCount(likes)),
        setBweets: bweets => dispatch(setBweets(bweets))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(BweetList);
