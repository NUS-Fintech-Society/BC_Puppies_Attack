import React, { useState, useEffect } from 'react';
import AlertMessage from '../components/AlertMessage';
import ScrollAble from '../components/ScrollAble';
import SearchBox from '../components/SearchBox';
import 'tachyons'
import AttackList from '../components/AttackList';
import BuyPuppy from '../components/BuyPuppy';
<<<<<<< HEAD
import ChangeName from '../components/ChangeName';
=======
import Listing from '../components/Listing';
>>>>>>> Get listing to display properly


const HomePage = props => {

    const [show, setShow] = useState(false);
    const [searchfield, setSearchfield] = useState('');

    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
    }

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
                <SearchBox searchChange = {onSearchChange} />
                <BuyPuppy web3={props.web3} contract={props.contract} accounts={props.accounts}/>
                <AttackList web3={props.web3} contract={props.contract} accounts={props.accounts}></AttackList>
                <ChangeName web3={props.web3} contract={props.contract} accounts={props.accounts}/>
                {/* <AttackList web3={props.web3} contract={props.contract} accounts={props.accounts}></AttackList> */}
                <ScrollAble>
                    { <Listing web3={props.web3} contract={props.contract} accounts={props.accounts} /> }
                </ScrollAble>
            </div>
        </div>
    )
}

export default HomePage;