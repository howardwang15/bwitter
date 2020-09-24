import React from 'react';
import PropTypes from 'prop-types';
import BweetList from './bweetList';

class Homepage extends React.Component {
    render() {
        const { bweets, onBweetDelete } = this.props;
        return (
            <BweetList bweets={bweets} onBweetDelete={onBweetDelete} />
        );
    }
}

Homepage.propTypes = {
    bweets: PropTypes.shape({ bweets: PropTypes.string }),
    onBweetDelete: PropTypes.func.isRequired,
};

export default Homepage;
