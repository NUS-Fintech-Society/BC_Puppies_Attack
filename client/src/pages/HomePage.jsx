import React, { useState, useEffect } from 'react';
import AlertMessage from '../components/AlertMessage';
import ScrollAble from '../components/ScrollAble';
import 'tachyons'
import AttackList from '../components/AttackList';
import BuyPuppy from '../components/BuyPuppy';
import IncreaseLevel from '../components/IncreaseLevel';
import Listing from '../components/Listing';
import Description from '../components/Description';


const HomePage = props => {

    const [show, setShow] = useState(false);

    // Change show to true for the transition
    useEffect(() => {
        setShow(true);
    }, []);

    return (
        <div>
            <div className="tc">
                <AlertMessage type="success" show={show} onClose={() => setShow(false)}>
                    Welcome
                </AlertMessage>
                <h1 className="f2">Puppies Attack</h1>
                <Description />
                <h2 className="title">MANAGE MY PUPPIES</h2>
                <BuyPuppy web3={props.web3} contract={props.contract} accounts={props.accounts}/>
                <br />
                <IncreaseLevel web3={props.web3} contract={props.contract} accounts={props.accounts}/>
                <h2 className="title">ATTACK!</h2>
                <AttackList web3={props.web3} contract={props.contract} accounts={props.accounts} />
                <Listing web3={props.web3} contract={props.contract} accounts={props.accounts} />
            </div>
        </div>
    )
}

export default HomePage;