import React, { useState, useEffect } from 'react';
import AlertMessage from '../components/AlertMessage';
import ScrollAble from '../components/ScrollAble';
import SearchBox from '../components/SearchBox';
import 'tachyons'

const HomePage = () => {
    
    const [show, setShow] = useState(false);
    const [searchfield, setSearchfield] = useState('');

    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
    }

    // Change show to true for the transition
    useEffect(() => {
        setShow(true);
    }, []); 

    console.log(searchfield);

    return (
        <div>
            <div className="tc">
                <AlertMessage type="success" show={show} onClose={() => setShow(false)}>
                    Welcome
                </AlertMessage>
                <h1 className="f2">Puppies Attack</h1>
                <SearchBox searchChange = {onSearchChange} />
                <ScrollAble>
                    {/* <Cardlist cats={filteredCats} /> */}
                </ScrollAble>
            </div>
        </div>
    )
}

export default HomePage;