import React, { useState } from 'react';
import AlertMessage from '../components/AlertMessage';

class AttackList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            attackingPuppyId: -1,
            targetPuppyId: -1,
            message: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this)

    }

    handleInputChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    handleSubmit() {
        const attackingPuppyId = this.state.attackingPuppyId
        const targetPuppyId = this.state.targetPuppyId
        if (attackingPuppyId === -1 || targetPuppyId === -1) {
            this.setState({
                message: "Choose a attacking Puppy and a target Puppy please"
            })
        } else {
            this.props.web3.methods._attack(attackingPuppyId, targetPuppyId)
            //DElete the need for return parameters. Or only one event with message passed as success or failure
            this.props.web3.events.SuccessAttack({ filter: { _attackingPuppyId: attackingPuppyId } })
                .on("data", function(event) {
                this.setState({
                    message: "Attack Success! Such a brilliant puppy! Your puppy's level have increased by one :)"
                })}).on("error", console.error);

            this.props.web3.events.FailAttack({ filter: { _attackingPuppyId: attackingPuppyId } })
                .on("data", function(event) {
                this.setState({
                    message: "Attack Failed! No penalties given to your puppy. Better luck next time! :)"
                })}).on("error", console.error);
        }
    }
    
    render() {
        const allPuppies = this.props.contract.methods.allPuppies.filter(x => x.owner !== this.props.accounts)
        const myPuppies = this.props.contract.methods.userToPuppies[this.props.accounts]
        const myPuppiesList = myPuppies.map(puppy => (
            <option value={puppy.id}>Name: {puppy.name} Level: {puppy.level}</option>
        ))        
        const otherPuppiesList = allPuppies.map(puppy => (
            <option value={puppy.id}>Name: {puppy.name} Level: {puppy.level}</option>
        ))

        var message = '';
        const [show, setShow] = useState(true);
        if (this.state.message !== "") {
            message = (
                <AlertMessage type="info" show={show} onClose={() => setShow(false)}>
                    {this.state.message}
                </AlertMessage>
            )
        }

        return (
            <div>
                <h3>Attack Another Puppy!!!</h3>
                <form name="AttackForm" onSubmit={this.handleSubmit()}>
                    <div class="form-group">
                        <label for="myPuppies">Select your puppy to attack:</label>
                        <select class="form-control" id="myPuppies" value={this.state.attackingPuppyId} onChange={this.handleInputChange} required>
                            {myPuppiesList}
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="otherPuppies">Select another puppy to attack:</label>
                        <select class="form-control" id="otherPuppies" value={this.state.targetPuppyId} onChange={this.handleInputChange} required>
                            {otherPuppiesList}
                        </select>
                    </div>
                    <input id="submit" type="submit" value="Attack!!!"></input>
                </form>

                {message}
            </div>
        )
    }
}

export default AttackList