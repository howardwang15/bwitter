import React from 'react';
import { formatDateBweet } from '../../utils/date';
import './style.scss';


class Bweet extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { user } = this.props;
        return (
            <div className='container'>
                <div className='user-container'>
                    <img src='https://tinyurl.com/y4ea26gh' width='70' height='70' />

                    <div className='name-container'>
                        <div className='name'>
                            {`${user.firstName} ${user.lastName}`}
                        </div>

                        <div className='handle'>
                            {`(@${user.handle})`}
                        </div>
                    </div>
                </div>
            
                <div className='text'>
                    This is some text
                </div>

                <div className='timestamp'>
                    { formatDateBweet(this.props.timestamp) }
                </div>
            </div>
        )
    }
}

export default Bweet;