import React from 'react';
import { connect } from 'react-redux';
import HomepageComponent from '../components/Homepage';
import ActionBar from '../components/ActionBar';
import Modal from '../components/Modal';
import { API_URL, ALL_BWEETS_ROUTE, ADD_NEW_BWEET_ROUTE } from '../config';
import { incrementLikeCount, decrementLikeCount, setBweets } from '../actions/bweets';
import { openModal, closeModal } from '../actions/modal';

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

    onNewBweet = async (bweet) => {
        const url = `${API_URL}${ADD_NEW_BWEET_ROUTE}`;
        const user = JSON.parse(localStorage.getItem('user'));
        this.props.closeModal();
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user, bweet })
        });
    }

    render() {
        return (
            <div>
                <ActionBar onButtonClick={this.props.openModal}/>
                <HomepageComponent
                    onBweetLikeClick={this.updateLikeCount}
                    bweets={this.props.bweets.bweets}
                    />
                { this.props.modalOpened ? <Modal onSubmitClick={this.onNewBweet} onClose={this.props.closeModal} /> : null }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { bweets: state.bweets, ...state.modal };
};

const mapDispatchToProps = dispatch => {
    return {
        incrementLikes: likes => dispatch(incrementLikeCount(likes)),
        decrementLikes: likes => dispatch(decrementLikeCount(likes)),
        setBweets: bweets => dispatch(setBweets(bweets)),
        openModal: () => dispatch(openModal()),
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
