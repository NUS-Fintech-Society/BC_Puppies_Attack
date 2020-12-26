import React, { useState } from 'react';
import AlertMessage from '../components/AlertMessage';

class AttackList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            attackingPuppyId: 0,
            targetPuppyId: 0,
            message: "",
            myPuppies: [],
            otherPuppies: []
        }
        this.handleInputChange = this.handleInputChange.bind(this)

    }

    componentDidMount() {
        const getPuppies = async() => {
            const contract = this.props.contract;
            const accounts = this.props.accounts;
            var myPuppies = [];
            var otherPuppies = [];
            const length = await contract.methods.getAllPuppiesNumber().call()
            for (var i = 0; i < length; i++) {
                const puppy = await contract.methods.allPuppies(i).call()
                if (puppy.owner === accounts[0] && puppy.level > 0) {
                    myPuppies.push(puppy);
                } else if (puppy.owner !== accounts[0] && puppy.level > 0) {
                    otherPuppies.push(puppy);
                }
            }

            var myPuppiesList = '';
            var otherPuppiesList = '';
            
            myPuppiesList = myPuppies.map(puppy => (
                <option key= {puppy.id} value={puppy.id}>Name: {puppy.name} Level: {puppy.level}</option>
            ))        
            otherPuppiesList = otherPuppies.map(puppy => (
                <option key= {puppy.id} value={puppy.id}>Name: {puppy.name} Level: {puppy.level}</option>
            ))
            
            this.setState({
                myPuppiesList: myPuppiesList,
                otherPuppiesList: otherPuppiesList
            })
        }
        
        getPuppies()
    }

    handleInputChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log("H")
        console.log(this.state.attackingPuppyId)
        console.log(this.state.targetPuppyId)
        const attackingPuppyId = this.state.attackingPuppyId
        const targetPuppyId = this.state.targetPuppyId
        
        this.props.contract.methods._attack(attackingPuppyId, targetPuppyId).send({ from: this.props.accounts[0] })
        .on("receipt", (receipt) => {
            alert("Success")
        })
        .on("error", error => {
            alert(error.message);
        });
    
        /*this.props.contract.events.SuccessAttack({ filter: { _attackingPuppyId: attackingPuppyId } })
            .on("data", function(event) {
            this.setState({
                message: "Attack Success! Such a brilliant puppy! Your puppy's level have increased by one :)"
            })}).on("error", console.error);

        this.props.contract.events.FailAttack({ filter: { _attackingPuppyId: attackingPuppyId } })
            .on("data", function(event) {
            this.setState({
                message: "Attack Failed! No penalties given to your puppy. Better luck next time! :)"
            })}).on("error", console.error);*/
    
    }
    

    render() {

        /*var message = '';
        const [show, setShow] = useState(true);
        if (this.state.message !== "") {
            message = (
                <AlertMessage type="info" show={show} onClose={() => setShow(false)}>
                    {this.state.message}
                </AlertMessage>
            )
        }*/
        var myPuppiesList = this.state.myPuppiesList
        var otherPuppiesList = this.state.otherPuppiesList


        return(
            <div>
                <h3>Attack Another Puppy!!!</h3>
                <h5>If you see error messages, please ensure that you possess puppies with levels > 0 and there are eligible puppies for you to attack</h5>
                <form name="AttackForm" onSubmit={this.handleSubmit}>
                    <div className="row">
                    <div className="form-group col-md-4">
                        <label htmlFor="myPuppies">Select your puppy to attack:</label>
                        <select className="form-control" id="myPuppies" name="attackingPuppyId" value={this.state.attackingPuppyId} onChange={this.handleInputChange} required>
                            {myPuppiesList}
                        </select>
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="otherPuppies">Select another puppy to attack:</label>
                        <select className="form-control" id="otherPuppies" name="targetPuppyId" value={this.state.targetPuppyId} onChange={this.handleInputChange} required>
                            {otherPuppiesList}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        )
            
        
    }
}

export default AttackList