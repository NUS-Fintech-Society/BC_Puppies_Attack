import React from "react";

class IncreaseLevel extends React.Component{
    constructor(props){
        super(props);
        this.state = {level: 5};
        this.increasePuppyLevel = this.increasePuppyLevel.bind(this);
    }

    increasePuppyLevel(event){
        // do some checks on the level of the puppy
        

        const { contract: { methods } } = this.props;
        methods._levelUp(***puppy id***).call().then()
    }

    render(){
        return (
        <div>
            <label>
                Puppy level: <b>{this.state.level + "  "} </b>
                <button onClick={this.increasePuppyLevel}>Increase Level</button>
            </label>
        </div>
        );
    }
}

export default IncreaseLevel;