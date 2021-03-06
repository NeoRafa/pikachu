import { Component } from "react";
import React from "react";
import "./Pokemon.css";
import {
  Image,
  Button,
  Segment,
  Container,
  Accordion,
  Icon,
  List,
  Table,
} from "semantic-ui-react";
const axios = require("axios");

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonData: null,
      showMoves: false,
      pokemonDescription: null,
    };
    this.movesClick = this.movesClick.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    const url = "https://pokeapi.co/api/v2/pokemon/" + id;
    const descriptionUrl = "https://pokeapi.co/api/v2/pokemon-species/" + id;
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

    axios({
      method: "get",
      url: descriptionUrl,
    })
      .catch((err) => {
        console.error(err);
      })
      .then((resp) => {
        this.setState({ pokemonDescription: resp.data });
      });
  }

  movesClick() {
    const { showMoves } = this.state;
    this.setState({ showMoves: !showMoves });
  }

  render() {
    const { pokemonData, showMoves, pokemonDescription } = this.state;
    const {
      name,
      id,
      abilities,
      height,
      held_items,
      weight,
      moves,
      stats,
      sprites,
      types,
      base_experience,
    } = pokemonData
      ? pokemonData
      : {
          name: null,
          id: null,
          abilities: [],
          weight: null,
          held_items: [],
          sprites: null,
          height: null,
          moves: [],
          stats: [],
          types: [],
          base_experience: null,
        };
    const { flavor_text_entries } = pokemonDescription
      ? pokemonDescription
      : { flavor_text_entries: [] };

    return (
      <Container className="pokemonAbout">
        <Segment textAlign="left">
          <List>
            <List.Item>
              <div>
                <h3>Name:</h3>
                {name}
              </div>
              <br></br>
              <div>
                <h3>Pokedex number:</h3>
                {id}
              </div>
            </List.Item>
            <br></br>
            <List.Item>
              <h3>Types:</h3> {types.map((type) => type.type.name).join(" / ")}
            </List.Item>
            <br></br>
            <List.Item>
              <h3>Sprites:</h3>
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
              {held_items.length > 0 ? (
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Held Items</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {held_items.map((held_item, index) => {
                      return (
                        <Table.Row key={index}>
                          <Table.Cell>
                            <a href={held_item.item.url}>
                              {held_item.item.name}
                            </a>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              ) : (
                ""
              )}
            </List.Item>
            <br></br>
            <List.Item>
              {abilities.length > 0 ? (
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Abilities:</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {abilities.map((ability, index) => {
                      return (
                        <Table.Row key={index}>
                          <Table.Cell>
                            <a href={ability.ability.url}>
                              {ability.ability.name}
                            </a>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              ) : (
                ""
              )}
            </List.Item>
            <br></br>
            <List.Item>
              <h3>Infos:</h3>
              <div>
                {flavor_text_entries.length > 0 ? (
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Description:</Table.HeaderCell>
                        <Table.HeaderCell>Version:</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {flavor_text_entries.map((flavor, index) => {
                        console.log(flavor)
                        if (flavor.language.name === 'en') {
                          return (
                            <Table.Row key={index}>
                              <Table.Cell>
                                {flavor.flavor_text}
                              </Table.Cell>
                              <Table.Cell>
                                {flavor.version.name}
                              </Table.Cell>
                            </Table.Row>
                          );
                        }
                      })}
                    </Table.Body>
                  </Table>
                ) : (
                  ""
                )}
              </div>
              <br></br>
              <div>
                <span>Height: {height}</span> &nbsp; / &nbsp;
                <span>Base Experience: {base_experience}</span> &nbsp; / &nbsp;
                <span>Weight: {weight}</span>
              </div>
            </List.Item>
            <br></br>
            <List.Item>
              <h3>Status:</h3>
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
              {moves.length > 0 ? (
                <Accordion>
                  <Accordion.Title
                    active={showMoves}
                    onClick={this.movesClick}
                    index={0}
                  >
                    <Icon name="dropdown" />
                    Moves
                  </Accordion.Title>
                  <Accordion.Content active={showMoves}>
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
                          return move.version_group_details.map(
                            (moveVersion, index) => {
                              return (
                                <Table.Row key={index}>
                                  <Table.Cell>{move.move.name}</Table.Cell>
                                  <Table.Cell>
                                    {moveVersion.version_group.name}
                                  </Table.Cell>
                                  <Table.Cell>
                                    {moveVersion.level_learned_at}
                                  </Table.Cell>
                                  <Table.Cell>
                                    {
                                      <a
                                        href={moveVersion.move_learn_method.url}
                                      >
                                        {moveVersion.move_learn_method.name}
                                      </a>
                                    }
                                  </Table.Cell>
                                </Table.Row>
                              );
                            }
                          );
                        })}
                      </Table.Body>
                    </Table>
                  </Accordion.Content>
                </Accordion>
              ) : (
                ""
              )}
            </List.Item>
          </List>
          <Button onClick={() => this.props.history.push("/")}>Back</Button>
        </Segment>
      </Container>
    );
  }
}

export default Pokemon;
