import React, { Component } from 'react';

export default class Marker extends Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        console.log('me clicou pq?');
    }

    render() {
        return (
            <div className="marker-container active" onClick={this.handleClick}>
                <div className="ellipse"></div>
            </div>
        )
    }
}