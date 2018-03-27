import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import SearchBar from './SearchBar';
import Marker from './Marker';

export default class Map extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: ''
        };
        this.key = 'AIzaSyAy1kxNENmEKmQd3jWo_zWIB5khsBDO-yo';
        this.center = { lat: 40.7446790, lng: -73.9485420 };
        this.zoom = 16;
    }

    render() {
        return (
            <div className='map-container'>
                <SearchBar />
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
                <div className="overlay" />
            </div>
        )
    }
}