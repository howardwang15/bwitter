import React from 'react';
import ActionBar from '../ActionBar';
import BweetList from './bweetList';
import Modal from '../Modal';

class Homepage extends React.Component {
    render() {
        const { onNewBweet } = this.props;
        return (
            <div>
                <ActionBar />
                <BweetList bweets={this.props.bweets} />
                <Modal onSubmitClick={onNewBweet} />
            </div>
        )
    }
}

export default Homepage;
