import React, { Component } from 'react';

export default class Card extends Component {

    constructor(props){
        super(props);
        this.rating = 0;
    }

    isOpen(){
        if(this.props.values.hours){
            if(this.props.values.hours.isOpen){
                return <p className="open">Aberto</p>
            } else {
                return <p className="open">Fechado</p>
            }
        }
    }

    render() {
        if(this.props.values.rating){
            this.rating = this.props.values.rating;
        }
        return (
            <div key={this.props.index} className="card open">
                <h2 className="name">{this.props.values.name}</h2>
                <p className="rating"><span>{this.rating}</span> / 10</p>
                <p className="address">{this.props.values.location.address}</p>
                {this.isOpen()}
            </div>
        )
    }
}