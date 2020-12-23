import React, { useState } from 'react';
import AlertMessage from '../components/AlertMessage';
import AttackList from '../components/AttackList'


const HomePage = props => {
    
    const [show, setShow] = useState(true);
    return (
        <div>
            <h3>Landing Page</h3>
            <AlertMessage type="success" show={show} onClose={() => setShow(false)}>
                Welcome
            </AlertMessage>
            <AttackList web3={props.web3} contract={props.contract} accounts={props.accounts}></AttackList>
            <h3>Hi</h3>
        </div>
    )
}

export default HomePage;