import React from 'react';
import BweetList from './bweetList';

class Homepage extends React.Component {
    render() {
        return (
            <BweetList bweets={this.props.bweets} onBweetDelete={this.props.onBweetDelete} />
        )
    }
}

export default Homepage;
