import React from 'react';

const Card = ({ id, name, level }) => {
    return (
        <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
            <img alt="robot_photo" src={`https://robohash.org/${id}?size=240x240&set=set4`} />
            <div>
                <h3>{name}</h3>
                <p>{level}</p>
            </div>
        </div>
    )
}

export default Card;