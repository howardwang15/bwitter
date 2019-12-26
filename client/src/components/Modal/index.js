import React from 'react';
import './styles.scss';
import Button from '../Button';

class Modal extends React.Component {
    constructor() {
        super();
        this.state = {
            characterCount: 0
        };
    }

    handleInputChange = e => {
        const count = e.target.value.length;
        this.props.onInputChange(e.target.value);
        this.setState((prev) => ({
            characterCount: count
        }));
    }

    render() {
        const { characterCount } = this.state;
        const { onSubmitClick } = this.props;
        return (
            <div className="modal-container">
                <div className="modal-wrapper">
                    <div className="modal-header">
                        Compose new Bweet
                    </div>
                    <div className="modal">
                        <div className="modal-body">
                            <textarea type="text" rows="4" maxLength="140" placeholder="What's happening?" onChange={this.handleInputChange}/>
                        </div>
                        <div className="submit">
                            <div className="count">
                                {characterCount}/140
                            </div>
                            
                            <Button
                                text="Tweet"
                                color="blue"
                                onClick={onSubmitClick}
                                />
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Modal;
