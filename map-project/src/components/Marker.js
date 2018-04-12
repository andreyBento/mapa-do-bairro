import React, { Component } from 'react';

export default class Marker extends Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.handleCenter(this.props.lat, this.props.lng)
        if(this.props.cardOpen !== undefined){
            this.props.cardOpen(true);
        }
    }

    render() {
        if( this.props.active ){
            return (
                <div className="marker-container active" onClick={this.handleClick}>
                    <div className="ellipse"></div>
                </div>
            )
        } else if( this.props.user ) {
            return (
                <div className="marker-container user" onClick={this.handleClick}>
                    <div className="ellipse"></div>
                </div>
            )
        } else {
            return (
                <div className="marker-container" onClick={this.handleClick}>
                    <div className="ellipse"></div>
                </div>
            )
        }
        
    }
}