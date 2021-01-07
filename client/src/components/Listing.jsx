import React, { useState, useEffect } from "react";
import Card from './Card';
import ScrollAble from '../components/ScrollAble';

const Listing = props => {
    const [myPuppies, setMyPuppies] = useState([]);
    const [otherPuppies, setOtherPuppies] = useState([]);
    useEffect(async () => {
        const puppiesCount = await props.contract.methods.getAllPuppiesNumber().call();
        const myPuppies = [];
        const otherPuppies = [];
        for (let i = 0; i < puppiesCount; i++) {
            const puppy = await props.contract.methods.allPuppies(i).call();
            if (puppy.owner == props.accounts[0]) {
                myPuppies.push(puppy);
            } else {
                otherPuppies.push(puppy);
            }
        }
        setMyPuppies(myPuppies);
        setOtherPuppies(otherPuppies);
    }, []);

    return (
        <div>
            <h2 className="title">MY PUPPIES</h2>
            <ScrollAble>
                {myPuppies.map((puppy) => {
                    return <Card key={puppy.id} id={puppy.id} name={puppy.name} level={puppy.level} methods={props.contract.methods} accounts={props.accounts} isMyPuppy />
                })}
            </ScrollAble>
            <h2 className="title">OTHER PUPPIES</h2>
            <ScrollAble>
                {otherPuppies.map((puppy) => {
                    return <Card key={puppy.id} id={puppy.id} name={puppy.name} level={puppy.level} methods={props.contract.methods} accounts={props.accounts} isMyPuppy={false} />
                })}
            </ScrollAble>
        </div>
    );
}

export default Listing;