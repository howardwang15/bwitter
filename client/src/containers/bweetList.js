import React from 'react';
import { connect } from 'react-redux';
import Bweet from '../components/Bweet';
import { incrementLikeCount, decrementLikeCount, fetchBweets } from '../actions/bweets';

class BweetList extends React.Component {

    constructor() {
        super();
        this.updateLikeCount = this.updateLikeCount.bind(this);
    }

    componentDidMount() {
        this.props.getBweetsByUser('10');
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
            this.props.bweets.bweets.map(bweet => <Bweet user={bweet.user} text={bweet.text} timestamp={bweet.timestamp} liked={bweet.liked} onLikeClick={(e) => this.updateLikeCount(e, bweet.liked, bweet.id)} key={bweet.id} />)
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
        getBweetsByUser: userID => dispatch(fetchBweets(userID))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(BweetList);
