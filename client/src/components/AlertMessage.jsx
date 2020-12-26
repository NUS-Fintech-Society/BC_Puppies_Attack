import React, { useEffect } from "react";
import Alert from 'react-bootstrap/Alert';

import './AlertMessage.css'

const SuccessAlert = props => {

    useEffect(() => {
        window.setTimeout(() => {
            props.onClose()
        }, 2000)
    }, [props]); 

    return (
        // Require a show props where true means it will show
        <div id="alertBox">
            <Alert 
                className="alertMessage" 
                variant={props.type} 
                show={props.show} 
                onClose={() => props.onClose()}
                style= {props.style} 
                dismissible>
                {props.children}
            </Alert>
        </div>
    );
}

export default SuccessAlert;