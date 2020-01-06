import React from 'react';
import { connect } from 'react-redux';
import HomepageComponent from '../components/Homepage';
import ActionBar from '../components/ActionBar';
import Modal from '../components/Modal';
import { getAllBweets, addNewBweet } from '../utils/fetcher';
import { incrementLikeCount, decrementLikeCount, setBweets } from '../actions/bweets';
import { openModal, closeModal } from '../actions/modal';
import { logout } from '../actions/user';


class HomePage extends React.Component {
    async componentDidMount() {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            return;
        }
        const user = JSON.parse(storedUser);
        const bweets = await getAllBweets(user);
        if (bweets.error) {
            localStorage.removeItem('user');
            return;
        }
        this.props.setBweets(bweets.data);
    }

    updateLikeCount(e, liked, id) {
        if (liked) {
            this.props.decrementLikes(id);
        } else {
            this.props.incrementLikes(id);
        }
    }

    onNewBweet = async bweet => {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = await addNewBweet(bweet, user);
        this.props.closeModal();
        const bweets = await getAllBweets();
        this.props.setBweets(bweets);
    }

    render() {
        return (
            <div>
                <ActionBar
                    onComposeClick={this.props.openModal}
                    onLogoutClick={this.props.logout}
                    />
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
        closeModal: () => dispatch(closeModal()),
        logout: () => dispatch(logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
