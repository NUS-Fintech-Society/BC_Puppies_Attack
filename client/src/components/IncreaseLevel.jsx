import React from "react";

class IncreaseLevel extends React.Component{
    constructor(props){
        super(props);
        this.state = {level: 5};
        this.increasePuppyLevel = this.increasePuppyLevel.bind(this);
        this.revivePuppy = this.revivePuppy.bind(this);
    }

    componentDidMount(){
        const getPuppies = async() => {
            const contract = this.props.contract;
            const account = this.props.accounts;
            var myPuppies = [];
            const length = await contract.methods.getAllPuppiesNumber().call();
            for(var i = 0; i < length; i++){
                const puppy = await contract.methods.allPuppies(i).call();
                if(puppy.owner === account[0] && puppy.level > 0){
                    myPuppies.push(puppy);
                    console.log("my puppy's id" + puppy.id + " " + puppy.name + " " + puppy.level);
                } else {
                    console.log("other's puppy id: " + puppy.id + " " + puppy.name  + " " + puppy.level);
                }
            }
        }
        getPuppies();
    }

    // hard coded puppy id to be 4. to be changed during integration
    increasePuppyLevel(event){
        // do some checks on the level of the puppy
        const { contract: { methods } } = this.props;
        methods.getAllPuppiesNumber().call().then(msg => {
            console.log(msg);
        });
        methods._levelUp(4).send({ from: this.props.accounts[0]})
        .on("receipt", (receipt) => {
            console.log("Level has been upgraded");
        })
        .on("error", error => {
            alert(error.message);
        })
        // methods._levelUp(***puppy id***).call().then()
    }

    // hard coded puppy id to be 4. to be changed during integration
    revivePuppy(event){
        // do some checks on the level of the puppy
        const { contract: { methods }} = this.props;
        methods.revive(4).send({ from: this.props.accounts[0]})
        .on("receipt", (receipt) => {
            console.log("Level has been upgraded");
        })
        .on("error", error => {
            alert(error.message);
        })
    }

    render(){
        return (
        <div>
            <label>
                Puppy level: <b>{this.state.level + "  "} </b>
                <button onClick={this.revivePuppy}>Increase Level</button>
            </label>
        </div>
        );
    }
}

export default IncreaseLevel;