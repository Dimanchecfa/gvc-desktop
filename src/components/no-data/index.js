import React from 'react';

function NotDataBox(props) {
    const {message} = props;
    return (
        <div className='box-no-data'>
            <p className='m-0'>{message}</p>
        </div>
    );
}

export default NotDataBox;
