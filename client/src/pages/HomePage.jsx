import React, { useState } from 'react';
import AlertMessage from '../components/AlertMessage';
import AttackList from '../components/AttackList';
import BuyPuppy from '../components/BuyPuppy';


const HomePage = props => {
    
    const [show, setShow] = useState(true);
    return (
        <div>
            <h3>Landing Page</h3>
            <AlertMessage type="success" show={show} onClose={() => setShow(false)}>
                Welcome
            </AlertMessage>
            <BuyPuppy web3={props.web3} contract={props.contract} accounts={props.accounts}/>
            {/* <AttackList web3={props.web3} contract={props.contract} accounts={props.accounts}></AttackList> */}
            <h3>Hi</h3>
        </div>
    )
}

export default HomePage;