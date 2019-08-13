import React, {Component} from 'react'
import { Jumbotron, FormControl, FormGroup, ControlLabel } from "react-bootstrap";

export default class SearchBar extends Component{
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: ""
        };

        this.handleChange = this.handleChange
    }

    handleChange = event => {
        console.log(event)
        this.setState({
            [event.target.id]: event.target.value
        });
    }


    render(){
        return(
            <Jumbotron>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Find a Project</ControlLabel>
                    <FormControl
                        autoFocus
                        type="search"
                        value={this.state.searchTerm}
                        placeholder = 'Search'
                        onChange={this.handleChange}
                    />
                </FormGroup>
            </Jumbotron>
        );
    }
}