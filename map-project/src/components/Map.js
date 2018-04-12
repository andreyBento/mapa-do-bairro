import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import SearchBar from './SearchBar';
import Marker from './Marker';
import Card from './Card';
import Menu from './Menu';

export default class Map extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: '',
            isFocused: false,
            userLocation: { lat: -22.891551099999997, lng: -43.564511800000005 },
            center: { lat: -22.891551099999997, lng: -43.564511800000005 },
            arrayMarkers: null,
            arrayLocations: null,
            menuOpen: false,
            cardOpen: false
        };
        this.key = 'AIzaSyAy1kxNENmEKmQd3jWo_zWIB5khsBDO-yo';
        this.zoom = 16;
        this.changeState = this.changeState.bind(this);
        this.renderOverlay = this.renderOverlay.bind(this);
        this.handleCenter = this.handleCenter.bind(this);
        this.handleMarkers = this.handleMarkers.bind(this);
        this.handleLocationsInfos = this.handleLocationsInfos.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.changeCard = this.changeCard.bind(this);
        this.savePosition = this.savePosition.bind(this);
    }

    // Função que atualiza a informação se o input esta em foco
    changeState(value){
        this.setState({ isFocused: value });
    }

    // Função que renderiza a div escura que fica atrás do input ou menu
    renderOverlay(){
        if(this.state.isFocused){
            return <div className="overlay" onClick={ this.toggleMenu } />;
        } else{
            return null;
        }
    }

    // Função que atualiza o centro do mapa
    handleCenter(newLat, newLng){
        this.setState({ center: { lat: newLat, lng: newLng } });
    }

    // Função que recebe as latitudes e longitudes dos resultados da pesquisa
    handleMarkers(incoming){
        this.setState({ arrayMarkers: incoming })
    }

    // Função que abre ou fecha os cards
    changeCard(value){
        this.setState({ cardOpen: value });
    }

    // Função que renderiza os markers
    renderMarkers() {
        
        if( this.state.arrayMarkers != null ){
            return this.state.arrayMarkers.map((res, index) => {
                if(res.lat === this.state.center.lat && res.lng === this.state.center.lng){
                    return <Marker key={ index } lat = { res.lat } lng = { res.lng } active={ true } handleCenter={(lat, lng) => this.handleCenter(lat, lng)} cardOpen={ (value) => this.changeCard(value) } />
                } else{
                    return <Marker key={ index } lat = { res.lat } lng = { res.lng } handleCenter={(lat, lng) => this.handleCenter(lat, lng)} cardOpen={ (value) => this.changeCard(value) } />
                }
            });
        }

    }

    // Função que armazena os dados resultantes da pesquisa
    handleLocationsInfos(res){
        this.setState( { arrayLocations: res } )
    }

    // Função que renderiza os cards
    handleCards(){
        if(this.state.cardOpen){
            return this.state.arrayLocations.map((res, index) => {
                if(res.venue.location.lat === this.state.center.lat && res.venue.location.lng === this.state.center.lng){
                    return <Card key={index} index={ index } values={ res.venue } />
                } else {
                    return null;
                }
            });
        }
    }

    // Função que abre o menu
    toggleMenu(){
        if(this.state.arrayLocations != null){
            if(document.getElementById('btn-menu').classList.contains('active')){
                this.setState({ menuOpen: false });
                document.getElementById('btn-menu').classList.remove('active');
                this.setState({ isFocused: false });
            } else {
                this.setState({ menuOpen: true });
                document.getElementById('btn-menu').classList.add('active');
                this.setState({ isFocused: true });
            }
        }
    }

    // Função que renderiza o botão que abre o menu
    handleButton(){

        if(this.state.arrayLocations != null){
            return <button className="btn btn-lg btn-menu" id="btn-menu" onClick={ this.toggleMenu }>Menu</button>
        }

    }

    // Função que renderiza o menu na tela
    handleMenu(){

        if(this.state.menuOpen){
            return <Menu locations={this.state.arrayLocations} handleCenter={(lat, lng) => this.handleCenter(lat, lng)} handleClose={ this.toggleMenu } openCard={ (value) => this.changeCard(value) } />
        }

    }

    // Função que salva a posição do gps do usuário
    savePosition(){
        this.setState({ userLocation: { lat: Number(window.localStorage.lat), lng: Number(window.localStorage.lng) } });
        this.setState({ center: { lat: Number(window.localStorage.lat), lng: Number(window.localStorage.lng) } });
    }

    render() {
        // Pede ao browser a localização do usuário
        navigator.geolocation.getCurrentPosition(showPosition);
        let that = this;
        function showPosition(position) {
            window.localStorage.setItem('lat', position.coords.latitude)
            window.localStorage.setItem('lng', position.coords.longitude)
        }
        that.savePosition;
        
        return (
            <div className='map-container'>
                <SearchBar handleFocus={this.changeState} handleCenter={(lat, lng) => this.handleCenter(lat, lng)} handleMarkers={(result) => this.handleMarkers(result)} location={this.state.userLocation} handleLocationsInfos={(res) => this.handleLocationsInfos(res)} />
                {this.renderOverlay()}
                <GoogleMapReact 
                bootstrapURLKeys={ { key: 'AIzaSyAy1kxNENmEKmQd3jWo_zWIB5khsBDO-yo' } } 
                center={ this.state.center } 
                defaultZoom={ this.zoom } 
                onClick={ (teste) => {
                    teste = false;
                    this.changeCard(teste)
                } } >
                    <Marker lat = { this.state.userLocation.lat } lng = { this.state.userLocation.lng } user={ true } handleCenter={(lat, lng) => this.handleCenter(lat, lng)} />
                    {this.renderMarkers()}
                </GoogleMapReact>
                { this.handleCards() }
                { this.handleButton() }
                { this.handleMenu() }
            </div>
        )
    }
}