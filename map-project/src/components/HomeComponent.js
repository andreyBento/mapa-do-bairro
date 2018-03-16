import React, { Component } from 'react';
import SearchBar from './SearchBar';

class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    render() {
        return (
            <SearchBar />
        );
    }
}

export default HomeComponent;