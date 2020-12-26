import React from 'react';

const ScrollAble = (props) => {
    return(
        <div style={{overflowY: 'scroll', height: '380px'}}>
            {props.children}
        </div>
    )
    
}

export default ScrollAble;