import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            result: null
        };
        this.locationsTypes = [
            'Restaurantes',
            'Hamburguerias',
            'Roupas'
        ];
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit() {}

    render() {
        if( this.state.result != null && this.state.result !== '' ){
            return (
                <form className="form-busca" onSubmit={this.handleSubmit}>
                    <input type="text" className="form-control" placeholder="Estabelecimentos..." value={this.state.value} onChange={(event) => this.handleChange(event.target.value)} />
                    <ul className="result-list">
                        {this.state.result.map( (teste, index) => <li key={index}><a role="button" aria-label={teste}>{teste}</a></li> )}
                    </ul>
                </form>
            );
        } else{
            return (
                <form className="form-busca" onSubmit={this.handleSubmit}>
                    <input type="text" className="form-control" placeholder="Estabelecimentos..." value={this.state.value} onChange={(event) => this.handleChange(event.target.value)} />
                </form>
            );
        }
    }
}

export default SearchBar;