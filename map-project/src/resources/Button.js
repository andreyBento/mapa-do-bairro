import React, { Component } from 'react';

class Button extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleButton(){
        if(this.props.necessity === "local"){
            return <button className="btn btn-block btn-lg btn-primary">Utilizar localização atual</button>
        }
    }

    render() {
        return this.handleButton();
    }
}

export default Button;