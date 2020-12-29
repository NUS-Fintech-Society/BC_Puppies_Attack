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
          {/* <label>
            <h4 htmlFor="myPuppies">Select your puppy to attack:</h4>
            <div class="input-group input-group-sm mb-3">
              Name: &nbsp;
              <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={this.state.value} onChange={this.handleChange}/>
            </div>
          </label> &nbsp;
          <input class="btn btn-primary" type="submit" value="Buy Puppy" /> */}
          <div className="row ml-2 centreRow">
            <div className="form-group col-md-4 ml-2">
                <h4 htmlFor="myPuppies">Buy Puppy:</h4>
                <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Name of Puppy:" value={this.state.value} onChange={this.handleChange}/>
            </div>
            <input class="btn btn-primary" type="submit" value="Buy Now!" />
          </div>
        </form>
        {/* <button onClick={this.getTotalPuppies}>Get Puppies Number</button> */}
      </div>
    );
  }
}

export default BuyPuppy;