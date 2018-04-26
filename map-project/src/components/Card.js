import React, { Component } from 'react';

export default class Card extends Component {

    isOpen(){
        if(this.props.values.hours){
            if(this.props.values.hours.isOpen){
                return <p className="open">Aberto</p>
            } else {
                return <p className="open">Fechado</p>
            }
        }
    }

    renderRating(){
        if(this.props.values.rating){
            return <p className="rating"><span>{this.props.values.rating}</span> / 10</p>
        } else {
            return <p>Ainda não avaliado</p>
        }
    }

    render() {
        return (
            <div key={this.props.index} className="card open">
                <h2 className="name">{this.props.values.name}</h2>
                {this.renderRating()}
                <p className="address">{this.props.values.location.address}</p>
                {this.isOpen()}
            </div>
        )
    }
}