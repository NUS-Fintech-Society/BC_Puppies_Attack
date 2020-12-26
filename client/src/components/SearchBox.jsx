import React from 'react';

const SearchBox = ({searchChange}) => {
    return (
        <div className="pa2">
            {/* onchange doesn't work, only onChange works 
            Thus, everytime onChange happens, it will run the searchChange function that was define in App.js*/}
            <input className="pa3 ba b--green bg-lightest-blue" type="search" placeholder="Search Puppy" 
                onChange={searchChange} />
        </div>
    )
}

export default SearchBox;