import React, { Component } from "react";
import { Card, Image, Button, Label, Icon, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ShowPage from "./ShowPage";

class HomePageCard extends Component {
  handleClick = (event) => {
    fetch(`http://localhost:3000/listings/${this.props.listing.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => response.json());
    this.props.history.push(`/listings/${this.props.listing.id}`);
  };

  render() {
    return (
      <Card onClick={this.handleClick} key={this.props.listing.id}>
        <Card.Content textAlign="center">
          <Card.Header textAlign="center" size="large">
            {this.props.listing.instrument_name}
          </Card.Header>
          <br></br>
          <Image src={this.props.listing.image} size="medium" rounded />
          <Card.Description textAlign="centered">
            <br></br>
            <Header size="small">DESCRIPTION</Header>
            <p>{this.props.listing.description}</p>
          </Card.Description>
        </Card.Content>
        <Card.Description>
          {this.props.listing.rented ? (
            <Label as="a" basic color="red" ribbon="left">
              NOT AVAILABLE
            </Label>
          ) : (
            <Label as="a" color="yellow" ribbon="left">
              RENT
            </Label>
          )}
        </Card.Description>
        <Card.Content extra>
          {this.props.listing.rented ? null : (
            <Header color="green" size="medium">
              ${this.props.listing.price} per/day{" "}
            </Header>
          )}
        </Card.Content>
      </Card>
    );
  }
}

export default HomePageCard;
