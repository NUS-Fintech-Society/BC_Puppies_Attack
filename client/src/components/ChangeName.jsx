import React from 'react';

const ChangeName = (props) => {
  const { accounts, contract: { methods } } = props;

  const handleNameChange = (puppyName) => {
    methods._changeName(0, 'NewPuppyTestName').send({ from: accounts[0] })
    .on("receipt", (receipt) => {
      alert(`Your puppy name has been changed to ${puppyName}!`);
      window.location.reload();
    })
    .on("error", error => {
      alert(error.message);
    });
  }

  return (
    <div>
      <button onClick={handleNameChange}>Change Puppy Name</button>
    </div>
  )
}

export default ChangeName;