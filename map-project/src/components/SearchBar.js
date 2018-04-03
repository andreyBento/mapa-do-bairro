import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            result: null,
            teste: null
        };
        this.locationsTypes = [
            'Mercados e armazéns',
            'Lojas de contrução e madereiras',
            'Creches',
            'Eletroeletrônicos',
            'Concesionárias',
            'Spas',
            'Lotéricas',
            'Conveniências',
            'Agências bancárias e caixas',
            'Pet shops',
            'Veterinárias',
            'Gráficas',
            'Instrumentos musicais',
            'Locadoras de automóveis',
            'Estacionamentos',
            'Estações de metro e trem',
            'Igrejas',
            'Agências de correios',
            'Roupas, calçados e acessórios',
            'Móveis',
            'Produtos e brinquedos infantis',
            'Restaurantes e lanchonetes',
            'Cafeterias e tabacarias',
            'Bares e lojas de bebidas',
            'Docerias e chocolaterias',
            'Postos de gasolina',
            'Boates e clubes',
            'Academias e lojas do nicho',
            'Bancas, papelarias e livrarias',
            'Escolas, cursos e faculdades',
            'Museus e feiras de arte',
            'Praças',
            'Casas de festa e lojas do nicho',
            'Drogarias e manipulação',
            'Hospitais e clínicas',
            'Shoppings e cinemas',
            'Fast-food',
            'Hamburguerias e sanduicherias',
            'Padarias',
            'Pizzarias',
            'Petiscarias',
            'Cosertos, reparos e trocas',
            'Praias',
            'Pontos turísticos',
            'Salões de beleza e barbearias',
            'Utensílios domésticos',
            'Planos telefônicos e celulares',
            'Informática e jogos'
        ];
        this.isFocused = false;
        this.searchKey = 'STVDWS5B2TNGTH41TABSLOF1ZMAPD2VWWTS40OKKRZZ1BZOZ';
        this.handleFocusIn = this.handleFocusIn.bind(this);
        this.handleFocusOut = this.handleFocusOut.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFocusIn(){
        this.isFocused = true;
        this.props.handleFocus(this.isFocused);
    }

    handleFocusOut(){
        this.isFocused = false;
        this.props.handleFocus(this.isFocused);
    }

    handleChange(value){
        this.setState({ value: value });

        if(value){
            const match = new RegExp(escapeRegExp(value), 'i');
            this.setState({ result: this.locationsTypes.filter((result) => {
                // console.log(result + ' ' + match.test(result) );
                return match.test(result);
            }) });
        } else {
            this.setState({ result: null });
        }
    }

    handleClick(event){
        // console.log(event.target.innerHTML);
        this.isFocused = false;
        this.props.handleFocus(this.isFocused);
        this.setState({value: event.target.innerHTML});
        this.setState({result: null});

        // var teste = fetch(`https://api.foursquare.com/v2/venues/search?||=40.7446790,-73.9485420&query=restaurante&oath_token=STVDWS5B2TNGTH41TABSLOF1ZMAPD2VWWTS40OKKRZZ1BZOZ`).then(res => res.json()).catch(error => {throw new Error('error')});

        const request = require('request');

        var that = this;

        request({
            url: 'https://api.foursquare.com/v2/venues/explore',
            method: 'GET',
            qs: {
                client_id: 'STVDWS5B2TNGTH41TABSLOF1ZMAPD2VWWTS40OKKRZZ1BZOZ',
                client_secret: 'DAWJIRXIBQ3Z5MTKLZI0BQKLPNQQYRHGCCMVW1S0552KFKAN',
                ll: '40.7243,-74.0018',
                query: 'restaurant',
                v: '20180323',
                limit: 10,
                venuePhotos: 1
            }
        }, function(err, res, body) {
            if (err) {
                throw new Error('O seguinte erro ocorreu: ' + err);
            } else {
                // console.log(body);
                var teste2 = JSON.parse(body)
                that.setState({ teste: teste2 });
                console.log(that.state.teste.response.groups)
            }
        });




        // console.log(request || JSON);
    }

    handleSubmit(){}


    render() {
        if( this.state.result != null && this.state.result !== '' ){
            return (
                <form className="form-busca" onSubmit={this.handleSubmit}>
                    <input type="text" className="form-control" placeholder="Estabelecimentos..." value={this.state.value} onChange={(event) => this.handleChange(event.target.value)} />
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
                    <input type="text" className="form-control" placeholder="Estabelecimentos..." value={this.state.value} onChange={(event) => this.handleChange(event.target.value)} onFocus={this.handleFocusIn} onBlur={this.handleFocusOut} />
                </form>
            );
        }
    }
}

export default SearchBar;