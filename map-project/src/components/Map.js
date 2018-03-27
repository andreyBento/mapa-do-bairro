import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import SearchBar from './SearchBar';
import Marker from './Marker';

export default class Map extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: '',
            isFocused: false
        };
        this.key = 'AIzaSyAy1kxNENmEKmQd3jWo_zWIB5khsBDO-yo';
        this.center = { lat: 40.7446790, lng: -73.9485420 };
        this.zoom = 16;
        this.changeState = this.changeState.bind(this);
        this.renderOverlay = this.renderOverlay.bind(this);
    }

    changeState(value){
        this.setState({ isFocused: value });
    }

    renderOverlay(){
        if(this.state.isFocused){
            return <div className="overlay" />;
        } else{
            return null;
        }
    }

    render() {
        return (
            <div className='map-container'>
                <SearchBar handleFocus={this.changeState} />
                {this.renderOverlay()}
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyAy1kxNENmEKmQd3jWo_zWIB5khsBDO-yo' }}
                    defaultCenter={ this.center }
                    defaultZoom={ this.zoom }>
                    <Marker
                        lat={ 40.7446790 }
                        lng={ -73.9485420 }
                        text={ 'Meio' }
                    />
                </GoogleMapReact>
            </div>
        )
    }
}