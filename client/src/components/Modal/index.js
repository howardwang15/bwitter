import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import Button from '../Button';

class Modal extends React.Component {
    constructor() {
        super();
        this.state = {
            message: '',
        };
    }

    handleInputChange = (e) => {
        const message = e.target.value;
        this.setState((_) => ({
            message,
        }));
    }

    onSubmitBweet = () => {
        const { onSubmitClick } = this.props;
        const { message } = this.state;
        onSubmitClick(message);
    }

    render() {
        const { message } = this.state;
        const { onClose } = this.props;
        return (
            <div className='modal-container'>
                <div className='modal-wrapper show-modal'>
                    <div className='modal-header'>
                        Compose new Bweet
                    </div>
                    <div className='close' onClick={onClose} role='button' tabIndex='0' />
                    <div className='modal'>
                        <div className='modal-body'>
                            <textarea type='text' rows='4' maxLength='140' placeholder="What's happening?" onChange={this.handleInputChange} />
                        </div>
                        <div className='submit'>
                            <div className='count'>
                                {message.length}
                                /140
                            </div>

                            <Button
                                text='Tweet'
                                color='blue'
                                onClick={this.onSubmitBweet}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    onSubmitClick: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modal;
