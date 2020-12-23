import React, { useState, useEffect } from "react";

const Listing = props => {
    const [puppyIds, setPuppyIds] = useState([]);
    useEffect(async () => {
        const allPuppiesCount = await props.contract.methods.getAllPuppiesNumber().call();
        const allPuppyIds = [...Array(1+parseInt(allPuppiesCount)).keys()];
        setPuppyIds(allPuppyIds);
    }, []);
    return (
        <div>
            <ul>
                {puppyIds.map(i => (
                    <li key={i}>
                        <h3>{i}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Listing;