import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const ErrorPage = () => {
    return (
        <div>
            <h3>Error Page</h3>
            <Spinner animation="border" />
            <p>Please install metamask and connect to our website in order to use our puppies attack service.</p>
        </div>
    )
}

export default ErrorPage;