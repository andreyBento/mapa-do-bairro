import React, { Component } from 'react';
import ListItem from './ListItem';

export default class Menu extends Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(lat, lng){
        this.props.handleCenter(lat, lng);
    }

    // Renderiza os itens da lista
    createLi(){
        return this.props.locations.map((res, index) => {
            return <ListItem key={index} lat={res.venue.location.lat} lng={res.venue.location.lng} handleClick={this.handleClick} name={res.venue.name} handleClose={ this.props.handleClose } changeCard={ this.props.openCard } />
        });
    }

    render() {

        return (
            <ul className="menu">
                {this.createLi()}
            </ul>
        )
        
    }
}