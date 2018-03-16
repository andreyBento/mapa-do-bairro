import React, { Component } from 'react';
import Button from '../resources/Button'

class FirstEnter extends Component {

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
            <div className="firstEnter container">
                <div className="center">
                    <h1 className="logo">#3A6CB5</h1>
                    <Button necessity="local" />
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" className="form-control input-lg" placeholder="Localização..." value={this.state.value} onChange={(event) => this.handleChange(event.target.value)} />
                    </form>
                </div>
            </div>
        );
    }
}

export default FirstEnter;