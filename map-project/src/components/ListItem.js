import React, { Component } from 'react';

export default class ListItem extends Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    // Modifica o centro do mapa, fecha o menu e abre o cad do item
    handleClick(){
        this.props.handleClick(this.props.lat, this.props.lng);
        this.props.handleClose();
        this.props.changeCard(true);
    }

    render() {
        return <li onClick={this.handleClick}>{this.props.name}</li>
    }
}