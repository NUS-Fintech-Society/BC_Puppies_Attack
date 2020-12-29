import React from 'react';

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
            var firstOwn = true;
            var firstOther = true;
            for (var i = 0; i < length; i++) {
                const puppy = await contract.methods.allPuppies(i).call()
                if (puppy.owner === accounts[0] && puppy.level > 0) {
                    if (firstOwn) {
                        this.setState({attackingPuppyId: puppy.id})
                        firstOwn = false;
                    }
                    myPuppies.push(puppy);
                } else if (puppy.owner !== accounts[0] && puppy.level > 0) {
                    if (firstOther) {
                        this.setState({targetPuppyId: puppy.id})
                        firstOther = false;
                    }
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
        this.listenToEvent()
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
        console.log(this.state.attackingPuppyId)
        console.log(this.state.targetPuppyId)
        const attackingPuppyId = this.state.attackingPuppyId
        const targetPuppyId = this.state.targetPuppyId
        try{
            this.props.contract.methods._attack(attackingPuppyId, targetPuppyId).send({ from: this.props.accounts[0] })
                    .on("receipt", (receipt) => {
                        console.log(receipt)
                        this.refreshPage()
                    })
                    .on("error", error => {
                        console.log(error.message);
                    });
        } catch (err) {
            console.log(err)
        }
        
            
    }

    refreshPage = () => {
        window.location.reload(false);
    }

    listenToEvent = () => {
        
        this.props.contract.events.SuccessAttack({filter: { _attackingPuppyId: this.state.attackingPuppyId, _targetedPuppyId: this.state.targetPuppyId } })
        .on("data", function(event) {
            console.log("Successss")
            alert("Attack Success! Such a brilliant puppy! Your puppy's level have increased by one :) Please wait for page to refresh, if it did not refresh, refresh it yourself to see your puppies' new level")
        }).on("error", console.error);

        this.props.contract.events.FailAttack({filter: { _attackingPuppyId: this.state.attackingPuppyId, _targetedPuppyId: this.state.targetPuppyId } })
        .on("data", function(event) {
            console.log("Failuuuure")
            alert("Attack Failed! No penalties given to your puppy. Better luck next time! :)")
        }).on("error", console.error);
    };
    

    render() {
        var myPuppiesList = this.state.myPuppiesList
        var otherPuppiesList = this.state.otherPuppiesList


        return(
            <div>
                <form name="AttackForm" onSubmit={this.handleSubmit}>
                    <div className="row ml-2 centreRow">
                    <div className="form-group col-md-4 ml-2">
                        <h4 htmlFor="myPuppies">Select your puppy to attack:</h4>
                        <select className="form-control" id="myPuppies" name="attackingPuppyId" value={this.state.attackingPuppyId} onChange={this.handleInputChange} required>
                            {myPuppiesList}
                        </select>
                    </div>

                    <div className="form-group col-md-4">
                        <h4 htmlFor="otherPuppies">Select another puppy to attack:</h4>
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