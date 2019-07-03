import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Image, Button, Grid, Divider, Segment, Rating } from 'semantic-ui-react'

class Profile extends Component {

  render() {
    return (
      <Segment>
      <Grid columns={2} centered>
        <Grid.Column width={6}>
          <div class="ui card">
            <div class="image">
              <img src={this.props.currentUser.image}/>
            </div>
            <div class="content">
              <a class="header">{this.props.currentUser.name}</a>
            </div>
          </div>
          <h3>Owner Reviews:</h3>
        {
          this.props.currentUser.received_ratings.map(ratings => {
            return <Card.Group right>
                <Card key={ratings.id}>
                  <Card.Content>
                    <Card.Description>
                      <p>{ratings.name}</p>
                      <p>Review: {ratings.review}</p>
                      <Rating icon='star'defaultRating={ratings.stars} maxRating={5}/>
                    </Card.Description>
                  </Card.Content>
                </Card>
            </Card.Group>

          })
        }
    	</Grid.Column>
      <Grid.Column>
        <h3>Currently Leasing:</h3>
          {
            this.props.currentUser.listings.map(userListing => {
            return  <Card.Group centered>
              <Link to ={`/listings/${userListing.id}`}>
                <Card key={userListing.id}>
                  <Card.Content>
                    <Image src={userListing.image} floated='right' size='small'/>
                    <Card.Header>{userListing.instrument_name}</Card.Header>
                    <Card.Description>
                      <p>Price: ${userListing.price}</p>
                        {
                          userListing.rented
                          ?
                          <Button color="red">Rented</Button>
                          :
                          <Button color="yellow">Available</Button>
                        }
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Link>
              </Card.Group>
            })
          }
          </Grid.Column>
          <h3>Currently Renting:</h3>
            {
              this.props.userRentals.map(userRental => {
              return  <Card.Group centered>
                  <Card key={userRental.id}>
                    <Card.Content>
                      <Image src={userRental.image} floated='right' size='small'/>
                      <Card.Header>{userRental.instrument_name}</Card.Header>
                      <Card.Description>
                        <Button color="red">Return</Button>
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Card.Group>
              })
            }
      </Grid>
      <Divider vertical></Divider>
      </Segment>
    );
  }
}



function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    listings: state.listings,
    ratings: state.ratings,
    userRentals: state.userRentals
  }
}

function mapDispatchToProps(dispatch){
  return {
    rentInstrument:(id) => {
      dispatch({ type: "RENT_INSTRUMENT", payload: id})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
