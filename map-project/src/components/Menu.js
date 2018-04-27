import React, { Component } from 'react';
import ListItem from './ListItem';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

export default class Menu extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: '',
            locations: this.props.locations,
            locationsSearch: this.props.locations
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(lat, lng){
        this.props.handleCenter(lat, lng);
    }

    // Renderiza os itens da lista
    createLi(){
        return this.state.locationsSearch.map((res, index) => {
            return <ListItem key={index} lat={res.venue.location.lat} lng={res.venue.location.lng} handleClick={this.handleClick} name={res.venue.name} handleClose={ this.props.handleClose } changeCard={ this.props.openCard } />
        });
    }

    handleChange(value){
        this.setState({value: value});

        let valorSemEspaco = value.replace(/\s/g, '');

        if(valorSemEspaco.length > 0){

            const match = new RegExp(escapeRegExp(value), 'i');
            let result = this.state.locations.filter((item) => match.test(item.venue.name));
            result.sort(sortBy('title'));

            this.setState({ locationsSearch: result });

            let resultLatLng = result.map((res, index) => {
                let item = { lat: res.venue.location.lat, lng: res.venue.location.lng };
                return item;
            });

            this.props.handleMarkers(resultLatLng);
            
            if(resultLatLng.length !== 0){
                this.props.handleCenter(resultLatLng[0].lat, resultLatLng[0].lng);
            }


        } else{
            this.setState({ locationsSearch: this.state.locations });

            let resultLatLng = this.props.locations.map((res, index) => {
                let item = { lat: res.venue.location.lat, lng: res.venue.location.lng };
                return item;
            });

            this.props.handleMarkers(resultLatLng);
        }

    }

    render() {

        return (
            <div className="menu">
                <form className="pesquisaMenu">
                    <input className="form-control"  type="text" placeholder="Filtre os resultados..." value={this.state.value} onChange={(event) => this.handleChange(event.target.value)} />
                </form>
                <ul>
                    {this.createLi()}
                </ul>
            </div>
        )
        
    }
}