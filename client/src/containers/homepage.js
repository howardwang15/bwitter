import React from 'react';
import { connect } from 'react-redux';
import HomepageComponent from '../components/Homepage';
import { API_URL, ALL_BWEETS_ROUTE } from '../config';
import { incrementLikeCount, decrementLikeCount, setBweets } from '../actions/bweets';

class HomePage extends React.Component {
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
            <HomepageComponent
                onBweetLikeClick={this.updateLikeCount}
                bweets={this.props.bweets.bweets}
                onNewBweet={() => console.log("clicked")}
                />
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
