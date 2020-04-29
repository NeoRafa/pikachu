import { Component } from "react";
import React from "react";
import { Input, Image, Button, List } from "semantic-ui-react";
import pokemon from "../assets/pokemon-logo.png";
import "./Home.css";
const axios = require("axios");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", results: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + this.state.value;
    axios({
      method: "get",
      url: url,
    }).then((resp) => {
      console.log(resp);
      this.setState({ results: resp });
    });
    event.preventDefault();
  }

  render() {
    const { value, results } = this.state;

    let resultsSection = (
      <List>
        {results.forms.map((pokemonForm) => {
          return <List.item>{pokemonForm.name}</List.item>;
        })}
      </List>
    );

    return (
      <div className="mainWrap">
        <div className="innerWrap">
          <div className="pokeLogo">
            <Image src={pokemon} size="medium"></Image>
          </div>
          <form onSubmit={this.handleSubmit}>
            <Input
              focus
              className="pokeInput"
              loading={true}
              placeholder="Search for a Pokéman..."
              value={this.state.value}
              onChange={this.handleChange}
            />
            <Button type="submit">Search</Button>
          </form>

          {results ? resultsSection : ""}
          
        </div>
      </div>
    );
  }
}

export default Home;
