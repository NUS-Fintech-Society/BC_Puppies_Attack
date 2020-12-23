import React from "react";

class BuyPuppy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const { contract: { methods } } = this.props;
    const puppyName = this.state.value;
    methods._create(puppyName)
    alert(`Your puppy, ${this.state.value} has been created!`);
    event.preventDefault();
  }

  render() {
    console.log(this.props.contract.events)
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Buy Puppy" />
      </form>
    );
  }
}

export default BuyPuppy;