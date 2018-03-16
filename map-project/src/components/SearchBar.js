import React, { Component } from 'react';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange() {}

    handleSubmit() {}

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" className="form-control" placeholder="Localização..." value={this.state.value} onChange={(event) => this.handleChange(event.target.value)} />
            </form>
        );
    }
}

export default SearchBar;