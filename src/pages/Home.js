import { Component } from "react";
import React from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Image,
  Button,
  Segment,
  Container,
  Message,
  Header,
} from "semantic-ui-react";
import pokemon from "../assets/pokemon-logo.png";
import "./Home.css";
const axios = require("axios");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", results: null, loading: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value, error: false });
  }

  handleSubmit(event) {
    this.setState({ loading: true });
    let { value } = this.state;
    value = value ? value.toLowerCase() : null;
    let url = "https://pokeapi.co/api/v2/pokemon/" + value;
    axios({
      method: "get",
      url: url,
    })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false, error: true, results: null });
        setTimeout(() => {
          this.setState({ error: false });
        }, 8000);
      })
      .then((resp) => {
        if (resp) {
          this.setState({ results: resp.data, loading: false });
        }
      });
    event.preventDefault();
  }

  render() {
    const { results, loading, error } = this.state;
    const link = results ? "/chars/" + results.id : "";
    let resultsSection = results ? (
      <Segment>
        <Container textAlign="left">
          <Link to={link}>{results.name}</Link>
        </Container>
      </Segment>
    ) : (
      ""
    );

    return (
      <div className="mainWrap">
        <div className="innerWrap">
          <div className="pokeLogo">
            <Image src={pokemon} size="medium"></Image>
            <Header as="h1">
              Pikachu
              <Header.Subheader>A ClassApp React App!</Header.Subheader>
            </Header>
          </div>
          <form onSubmit={this.handleSubmit}>
            <Input
              focus
              className="pokeInput"
              loading={loading}
              placeholder="Search for a Pokéman..."
              value={this.state.value}
              onChange={this.handleChange}
            />
            <Button type="submit">Search</Button>
          </form>

          {results ? resultsSection : ""}

          {error ? (
            <Message warning>
              <Message.Header>
                Ops! Something went wrong with your request.
              </Message.Header>
              <p>Maybe the Pokémon you searched does not exist...yet!</p>
            </Message>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Home;
