import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            result: null,
            places: null
        };
        this.locationsTypes = [
            'Lojas',
            'Restaurantes',
            'Escolas',
            'Faculdades',
            'Drogaria',
            'Hospital',
            'Pizzaria'
        ];
        this.isFocused = false;
        this.searchKey = 'STVDWS5B2TNGTH41TABSLOF1ZMAPD2VWWTS40OKKRZZ1BZOZ';
        this.handleFocusIn = this.handleFocusIn.bind(this);
        this.handleFocusOut = this.handleFocusOut.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.location = this.props.location;
    }

    // Atualiza a informação sobre o foco no input
    handleFocusIn(){
        this.isFocused = true;
        this.props.handleFocus(this.isFocused);
    }

    // Atualiza a informação sobre o foco no input
    handleFocusOut(){
        this.isFocused = false;
        this.props.handleFocus(this.isFocused);
    }

    // Filtra os itens com o texto digitado
    handleChange(value){
        this.setState({ value: value });

        if(value){
            const match = new RegExp(escapeRegExp(value), 'i');
            this.setState({ result: this.locationsTypes.filter((result) => {
                return match.test(result);
            }) });
        } else {
            this.setState({ result: null });
        }
    }

    // Realiza a busca em cima do item clicado
    handleClick(event){
        this.isFocused = false;
        this.props.handleFocus(this.isFocused);

        this.setState({value: event.target.innerHTML});
        this.setState({result: null});

        const request = require('request');
        var that = this;

        request({
            url: 'https://api.foursquare.com/v2/venues/explore',
            method: 'GET',
            qs: {
                client_id: 'I4YY4031ZG3MEIQOH2Z5XX1RFSX5VQLBEOJVFBSSY4D22LBO',
                client_secret: '55QNVWE1YTIOGAW3WHFSWHBJ4JG2TCQEGQDA31I5XNDYS3CR',
                ll: this.location.lat + ',' + this.location.lng,
                query: event.target.innerHTML,
                v: '20180323',
                limit: 10,
                venuePhotos: 1
            }
        }, function(err, res, body) {
            if (err) {
                alert('Ocorreu um erro com a API do FourSquare, por favor carregue novamente a página');
                console.log('Por favor carregue novamente a página');
                throw new Error('O seguinte erro ocorreu: ' + err);
            } else {

                var infoJson = JSON.parse(body);
                that.setState({ places: infoJson.response.groups[0].items });

                that.props.handleCenter(that.state.places[0].venue.location.lat, that.state.places[0].venue.location.lng);

                var arrayMarker = that.state.places.map(res => {
                    var result = { lat: res.venue.location.lat, lng: res.venue.location.lng }
                    return result;
                });

                that.props.handleMarkers(arrayMarker);

                that.props.handleLocationsInfos(that.state.places);
                
            }
        });

    }

    render() {
        if( this.state.result != null && this.state.result !== '' ){
            return (
                <form className="form-busca">
                    <input type="text" className="form-control" placeholder="Mudar Busca..." value={this.state.value} onChange={(event) => this.handleChange(event.target.value)} />
                    <ul className="result-list">
                        {this.state.result.map( (item, index) => {
                            if(index > 5){
                                return null;
                            } else{
                                return <li key={index}><a role="button" onClick={event => this.handleClick(event)} aria-label={item}>{item}</a></li>;
                            }
                        } )}
                    </ul>
                </form>
            );
        } else{
            return (
                <form className="form-busca" onSubmit={this.handleSubmit}>
                    <input type="text" className="form-control" placeholder="Mudar Busca..." value={this.state.value} onChange={(event) => this.handleChange(event.target.value)} onFocus={this.handleFocusIn} onBlur={this.handleFocusOut} />
                </form>
            );
        }
    }
}

export default SearchBar;