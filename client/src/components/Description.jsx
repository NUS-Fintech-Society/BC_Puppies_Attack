import React from "react";
import Alert from "react-bootstrap/Alert";

const Description = () => {
  return (
    <div>
      <Alert variant="success">
        <h3>WELCOME:</h3>
        <p>
          In Puppies Attack, you get to purchase and own your very own{" "}
          <strong>UNIQUE</strong> puppies that starts off at{" "}
          <strong>level 5</strong>. Other than being a cutie pie, your puppy can
          attack other puppies in hopes of gaining extra levels.
        </p>
        <p>
          Every puppy is stored in{" "}
          <strong>ethereum's ropsten blockchain</strong>, ensuring security and
          immutability.
        </p>
        <p style={{ fontSize: "15px", fontStyle: "italic" }}>
          (Cost: Leveling up increases your puppy's level by 1 with a cost of
          0.005 ether. However, if your puppy is level 0, you may revive it to
          level 1 with 0.01 ether.)
        </p>
      </Alert>
      <Alert variant="warning">
        <h3>ATTACKING INSTRUCTIONS:</h3>
        <p>
          Choose one of your puppy to attack someone else's puppy! If your puppy
          level is higher than the targeted puppy, your pupy has a 70% chance of
          attack success. If your puppy level is same as targeted puppy, success
          rate is 50%. If your puppy level is lower than targeted puppy, success
          rate is 30%. Upon successful attack, your puppy level will increase by
          one while the targeted puppy level will decrease by one. Upon failed
          attack, your puppy level and targeted puppy level will remain the
          same.
        </p>
        <p style={{ fontSize: "15px", fontStyle: "italic" }}>
          (Note: If you see error messages, please ensure that you possess
          puppies with levels &gt; 0 and there are eligible puppies for you to
          attack. If transaction produced error, please try again by increasing
          your gas limit to at least 2100000.)
        </p>
      </Alert>
    </div>
  );
};

export default Description;
