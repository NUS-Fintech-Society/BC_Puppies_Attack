import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './Card.css';

const Card = ({ id, name, level, methods, accounts, isMyPuppy }) => {
    const [showModal, setShowModal] = useState(false);
    const [formValue, setFormValue] = useState('');

    const handleChange = (event) => {
        setFormValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formValue === '') {
            alert('Please enter a name to change');
        } else if (formValue === name) {
            alert('Please enter a different name to change to');
        } else {
            methods._changeName(id, formValue).send({ from: accounts[0] })
            .on("receipt", (receipt) => {
                alert(`Your puppy name has been changed to ${formValue}!`);
                window.location.reload();
            })
            .on("error", error => {
                alert(error.message);
            });

            setFormValue('');
            setShowModal(false);
        }
    }

    const closeModal = (event) => {
        event.preventDefault();
        setShowModal(false);
    }

    return (
        <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
            <img alt="robot_photo" src={`https://robohash.org/${id}?size=240x240&set=set4`} />
            <div>
                <h3>{name}</h3>
                <p>{level}</p>
                {isMyPuppy && <Button variant="outline-dark" onClick={() => setShowModal(true)}>Change Name</Button>}
            </div>
            {showModal
            && (
                <div className="changeNameModal">
                    <h4>Change Your Puppy Name</h4>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Change Name:
                            <input type="text" value={formValue} onChange={handleChange} />
                        </label>
                        <input type="submit" value="Proceed" />
                    </form>
                    <Button variant="outline-dark" onClick={closeModal}>Close Modal</Button>
                </div>
            )}
        </div>
    )
}

export default Card;