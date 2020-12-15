import React, { useState } from 'react';
import AlertMessage from '../components/AlertMessage';

const HomePage = () => {
    
    const [show, setShow] = useState(true);

    return (
        <div>
            <h3>Landing Page</h3>
            <AlertMessage type="success" show={show} onClose={() => setShow(false)}>
                Welcome
            </AlertMessage>
        </div>
    )
}

export default HomePage;