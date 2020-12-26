import React, { useState, useEffect } from "react";
import Card from './Card';

const Listing = props => {
    const [puppies, setPuppies] = useState([]);
    useEffect(async () => {
        const puppiesCount = await props.contract.methods.getAllPuppiesNumber().call();
        const puppies = [];
        for (let i = 0; i < puppiesCount; i++) {
            const puppy = await props.contract.methods.allPuppies(i).call();
            puppies.push(puppy);
        }
        setPuppies(puppies);
    }, []);

    return (
        <div>
            {puppies.map((puppy) => {
                return <Card key={puppy.id} id={puppy.id} name={puppy.name} level={puppy.level} />
            })}
        </div>
    );
}

export default Listing;