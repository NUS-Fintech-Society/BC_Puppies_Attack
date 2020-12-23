import React from "react";
import Alert from 'react-bootstrap/Alert';

import './AlertMessage.css'

const SuccessAlert = props => {
    return (
        // Require a show props where true means it will show
        <Alert 
            className="alertMessage" 
            variant={props.type} 
            show={props.show} 
            onClose={() => props.onClose()}
            style= {props.style} 
            dismissible>
            {props.children}
        </Alert>
    );
}

export default SuccessAlert;