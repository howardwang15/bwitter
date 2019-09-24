import React from 'react';
import Bweet from '../components/Bweet';

class BweetList extends React.Component {
    updateLikeCount(e) {
        console.log(e.target.checked);
    }

    render() {
        const bweets = [
            {
                user: {
                    firstName: 'Howard',
                    lastName: 'Wang',
                    handle: 'howardwang15',
                    picture: 'https://tinyurl.com/y4ea26gh'
                },
                text: 'This is my final Bweet',
                timestamp: new Date(),
                id: 'somehash'
            },
            {
                user: {
                    firstName: 'Howard',
                    lastName: 'Wang',
                    handle: 'howardwang15',
                    picture: 'https://tinyurl.com/y4ea26gh'
                },
                text: 'Hello Bwitter! Seems like I\'m the first one here...',
                timestamp: new Date(),
                id: 'anotherhash'
            }
        ]
        return (
            bweets.map(bweet => <Bweet user={bweet.user} text={bweet.text} timestamp={bweet.timestamp} onLikeClick={this.updateLikeCount} key={bweet.id} />)
        )
    }
}

export default BweetList;
