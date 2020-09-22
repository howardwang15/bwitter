import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class Errorbar extends React.Component {
    render() {
        const { message } = this.props;
        return (
            <div className='error'>
                <span className='message'>{`Error: ${message}`}</span>
            </div>
        );
    }
}

Errorbar.propTypes = {
    message: PropTypes.string.isRequired,
};

export default Errorbar;
