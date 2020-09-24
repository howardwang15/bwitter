import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HomepageComponent from '../components/Homepage';
import ActionBar from '../components/ActionBar';
import Modal from '../components/Modal';
import { getAllBweets, addNewBweet, deleteBweet } from '../utils/fetcher';
import { incrementLikeCountAction, decrementLikeCountAction, setBweetsAction } from '../actions/bweets';
import { openModalAction, closeModalAction } from '../actions/modal';
import { logoutAction } from '../actions/user';

class HomePage extends React.Component {
    async componentDidMount() {
        const { logout, setBweets } = this.props;
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            logout();
            return;
        }
        const user = JSON.parse(storedUser);
        const bweets = await getAllBweets(user);
        if (bweets.error) {
            localStorage.removeItem('user');
            return;
        }
        setBweets(bweets.data);
    }

    onDeleteBweet = async (id) => {
        const { setBweets } = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        await deleteBweet(id, user);
        const bweets = await getAllBweets(user);
        setBweets(bweets.data);
    }

    onNewBweet = async (bweet) => {
        const { closeModal, setBweets } = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        await addNewBweet(bweet, user);
        closeModal();
        const bweets = await getAllBweets(user);
        setBweets(bweets.data);
    }

    updateLikeCount(_, liked, id) {
        const { decrementLikes, incrementLikes } = this.props;
        if (liked) {
            decrementLikes(id);
        } else {
            incrementLikes(id);
        }
    }

    render() {
        const {
            openModal,
            closeModal,
            logout,
            bweets,
            modalOpened,
        } = this.props;

        return (
            <div>
                <ActionBar
                    onComposeClick={openModal}
                    onLogoutClick={logout}
                />
                <HomepageComponent
                    onBweetLikeClick={this.updateLikeCount}
                    bweets={bweets.bweets}
                    onBweetDelete={this.onDeleteBweet}
                />
                { modalOpened
                    ? <Modal onSubmitClick={this.onNewBweet} onClose={closeModal} />
                    : null }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ bweets: state.bweets, ...state.modal });

const mapDispatchToProps = (dispatch) => ({
    incrementLikes: (likes) => dispatch(incrementLikeCountAction(likes)),
    decrementLikes: (likes) => dispatch(decrementLikeCountAction(likes)),
    setBweets: (bweets) => dispatch(setBweetsAction(bweets)),
    openModal: () => dispatch(openModalAction()),
    closeModal: () => dispatch(closeModalAction()),
    logout: () => dispatch(logoutAction()),
});

HomePage.propTypes = {
    user: PropTypes.shape({ name: PropTypes.string.isRequired }),
    logout: PropTypes.func.isRequired,
    setBweets: PropTypes.func.isRequired,
    decrementLikes: PropTypes.func.isRequired,
    incrementLikes: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    bweets: PropTypes.shape({ bweets: PropTypes.string.isRequired }),
    modalOpened: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
