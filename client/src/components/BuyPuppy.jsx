import React from "react";

class BuyPuppy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getTotalPuppies = this.getTotalPuppies.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const { contract: { methods } } = this.props;
    const puppyName = this.state.value;

    methods._create(puppyName).send({ from: this.props.accounts[0] })
    .on("receipt", (receipt) => {
      alert(`Your puppy, ${this.state.value} has been created!`);
      this.setState({ value: '' });
    })
    .on("error", error => {
      alert(error.message);
    });
    event.preventDefault();
  }

  getTotalPuppies(event) {
    const { contract: { methods } } = this.props;
    methods.getAllPuppiesNumber().call().then(msg => alert(`You have ${msg} puppies`));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Buy Puppy" />
        </form>
        <button onClick={this.getTotalPuppies}>Get Puppies Number</button>
      </div>
    );
  }
}

export default BuyPuppy;