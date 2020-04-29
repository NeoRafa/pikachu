import { Component } from "react";
import React from "react";
import "./Pokemon.css";
import {
  Image,
  Button,
  Segment,
  Container,
  List,
  Table,
} from "semantic-ui-react";
const axios = require("axios");

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = { pokemonData: null };
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    const url = "https://pokeapi.co/api/v2/pokemon/" + id;

    axios({
      method: "get",
      url: url,
    })
      .catch((err) => {
        console.error(err);
      })
      .then((resp) => {
        this.setState({ pokemonData: resp.data });
      });
  }

  render() {
    const { pokemonData } = this.state;
    const {
      name,
      id,
      abilities,
      //   forms,
      height,
      moves,
      //   order,
      stats,
      sprites,
      types,
    } = pokemonData
      ? pokemonData
      : {
          name: null,
          id: null,
          abilities: [],
          sprites: null,
          height: null,
          moves: [],
          stats: [],
          types: [],
        };

    return (
      <Container className="pokemonAbout">
        <Segment textAlign="left">
          <List>
            <List.Item>
              Name: {name} / Pokedex Number: {id}
            </List.Item>
            <br></br>
            <List.Item>
              Types: {types.map((type) => type.type.name).join(" / ")}
            </List.Item>
            <br></br>
            <List.Item>
              Sprites:
              {sprites ? (
                <div className="spritesWrapper">
                  <Image src={sprites.back_default} size="small"></Image>
                  <Image src={sprites.front_default} size="small"></Image>
                  <Image src={sprites.back_shiny} size="small"></Image>
                  <Image src={sprites.front_shiny} size="small"></Image>
                </div>
              ) : (
                ""
              )}
            </List.Item>
            <br></br>
            <List.Item>
              Abilities:
              {abilities.map((ability) => (
                <span key={ability.ability.url}>
                  <a href={ability.ability.url}>{ability.ability.name}</a> |{" "}
                </span>
              ))}
            </List.Item>
            <br></br>
            <List.Item>Height: {height}</List.Item>
            <br></br>
            <List.Item>
              Status:
              <br></br>
              {stats.length > 0 ? (
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Speed</Table.HeaderCell>
                      <Table.HeaderCell>Special Defense</Table.HeaderCell>
                      <Table.HeaderCell>Special Attack</Table.HeaderCell>
                      <Table.HeaderCell>Defense</Table.HeaderCell>
                      <Table.HeaderCell>Attack</Table.HeaderCell>
                      <Table.HeaderCell>HP</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>{stats[0].base_stat}</Table.Cell>
                      <Table.Cell>{stats[1].base_stat}</Table.Cell>
                      <Table.Cell>{stats[2].base_stat}</Table.Cell>
                      <Table.Cell>{stats[3].base_stat}</Table.Cell>
                      <Table.Cell>{stats[4].base_stat}</Table.Cell>
                      <Table.Cell>{stats[5].base_stat}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              ) : (
                ""
              )}
            </List.Item>
            <br></br>
            <List.Item>
              Moves:
              <br></br>
              {moves.length > 0 ? (
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Version</Table.HeaderCell>
                      <Table.HeaderCell>Level</Table.HeaderCell>
                      <Table.HeaderCell>Method</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {moves.map((move) => {
                      return move.version_group_details.map((moveVersion) => {
                        return (
                          <Table.Row
                            key={
                              move.move.name +
                              moveVersion.version_group.name +
                              moveVersion.move_learn_method +
                              moveVersion.level_learned_at
                            }
                          >
                            <Table.Cell>{move.move.name}</Table.Cell>
                            <Table.Cell>
                              {moveVersion.version_group.name}
                            </Table.Cell>
                            <Table.Cell>
                              {moveVersion.level_learned_at}
                            </Table.Cell>
                            <Table.Cell>
                              {
                                <a href={moveVersion.move_learn_method.url}>
                                  {moveVersion.move_learn_method.name}
                                </a>
                              }
                            </Table.Cell>
                          </Table.Row>
                        );
                      });
                    })}
                  </Table.Body>
                </Table>
              ) : (
                ""
              )}
            </List.Item>
          </List>
        </Segment>
      </Container>
    );
  }
}

export default Pokemon;
