import React from 'react';
import './styles.scss';
import Button from '../Button';

class Modal extends React.Component {
    constructor() {
        super();
        this.state = {
            message: ""
        };
    }

    handleInputChange = e => {
        const message = e.target.value;
        this.setState((prev) => ({
            message
        }));
    }

    onSubmitBweet = () => {
        this.props.onSubmitClick(this.state.message);
    }

    render() {
        const { message } = this.state;
        const { onClose } = this.props;
        return (
            <div className="modal-container">
                <div className="modal-wrapper">
                    <div className="modal-header">
                        Compose new Bweet
                    </div>
                    <div className="close" onClick={onClose}/>
                    <div className="modal">
                        <div className="modal-body">
                            <textarea type="text" rows="4" maxLength="140" placeholder="What's happening?" onChange={this.handleInputChange}/>
                        </div>
                        <div className="submit">
                            <div className="count">
                                {message.length}/140
                            </div>
                            
                            <Button
                                text="Tweet"
                                color="blue"
                                onClick={this.onSubmitBweet}
                                />
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Modal;
