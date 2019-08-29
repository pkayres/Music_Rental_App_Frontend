import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Image, Button, Grid, Divider, Segment, Rating, Modal, Header, Form, Input, Select, TextArea, Icon, Label } from 'semantic-ui-react'

let currentListing = ''
class Profile extends Component {

  state = {
    rater: this.props.currentUser !== null ? this.props.currentUser.id : null,
    stars: '',
    review:'',
    rated: null
  }

  handleOpen = (listing) => {
    currentListing = listing
    this.setState({
      modalOpen: true,
      rated: listing.user_id},
    )
  }

  handleClose = () => this.setState({ modalClose: false})

  handleChange = e => this.setState({ stars: e.target.value })


  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  removeListing = (userListing) => {
    fetch(`http://localhost:3000/listings/${userListing.id}`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(listing => {
      this.props.deleteListing(userListing)
      this.props.deleteFromCollection(userListing)
    }
    )
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/ratings', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
         "rater_id": this.state.rater,
          "review": this.state.review,
          "stars": this.state.stars,
          "rated_id": this.state.rated
        })
    }).then(response => response.json())
      .then(rating => {
         this.props.addRating(rating);
         this.setState({ modalOpen: false, modalClose: true})
         this.props.deleteFromRentals(currentListing)
         this.props.changeListingStatus(currentListing)
      })
    fetch(`http://localhost:3000/rents/${currentListing.rent.id}`, {
      method: 'DELETE'
    })
  }


  render() {
    const { rating } = this.state
    return (
      <div>
      {
        this.props.currentUser !== null
        ?
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
          <div>
          <Link to="/newlisting" >
            <Button color="green">CREATE LISTING</Button>
          </Link>
          </div>
          <Header size='huge'>OWNER REVIEWS</Header>
          <Segment raised style={{ overflow: 'auto', maxHeight: '27em' }}>
        {
          this.props.currentUser.received_ratings.map(ratings => {
            return (
              <Card.Group right>
                <Card key={ratings.id}>
                  <Card.Content>
                    <Card.Description>
                      <p>{ratings.name}</p>
                      <p>REVIEW {ratings.review}</p>
                      <Rating icon='star'defaultRating={ratings.stars} maxRating={5} disabled/>
                    </Card.Description>
                  </Card.Content>
                </Card>
            </Card.Group>
          )
          })
        }
      </Segment>
    	</Grid.Column>
      <Grid.Column>
        <Header size='huge'>CURRENTLY LEASING</Header>
        <Segment raised style={{ overflow: 'auto', maxWidth: '40em', maxHeight: '50em' }}>
          <Card.Group centered>
          {
            this.props.currentUser.listings.map(userListing => {
            return (
              <div>
                <Card key={userListing.id}>
                  <Card.Content>
                    <Card.Header>{userListing.instrument_name}</Card.Header>
                    <div>
                      <Link to ={`/listings/${userListing.id}`}>
                        <Image src={userListing.image} size='small'/>
                      </Link>
                    </div>
                    <Card.Description>
                        {
                          userListing.rented
                          ?
                          <Label as='a' basic color="red" ribbon>
                            CURRENTLY RENTED
                          </Label>
                          :
                          <Label as='a' color="yellow" ribbon>
                            AVAILABLE
                          </Label>
                        }
                    </Card.Description>
                  </Card.Content>
                  <Button floated='right' onClick={() => this.removeListing(userListing)} color="blue">REMOVE LISTING</Button>
                </Card>
              </div>
            )
            })
          }
          </Card.Group>
        </Segment>
          </Grid.Column>
          <Divider horizontal></Divider>
          <Header size='huge'>CURRENTLY RENTING</Header>
           <Card.Group >
            {
              this.props.currentUser !== null
              ?
              this.props.userRentals.map(userRental => {
               return(
                 userRental.rent.user_id === this.props.currentUser.id
                 ?

                  <Card key={userRental.id}>
                    <Card.Content>
                      <Image src={userRental.image} floated='right' size='small'/>
                      <Card.Header>{userRental.instrument_name}</Card.Header>
                      <Card.Description>
                        <Modal
                            trigger={<Button color="red" onClick={() => this.handleOpen(userRental)}>RETURN</Button>}
                            open={this.state.modalOpen}
                            onClose={this.handleClose}
                            dimmer
                            size='small'
                          >
                            <Header> {currentListing.instrument_name} </Header>

                            <Modal.Content>
                              <Image src={currentListing.image} floated='right' size='small'/>
                              <Modal.Description>
                                <Header>How was your experience?</Header>
                                  <Form onSubmit={this.handleSubmit}>
                                    <div>
                                        <div>Rating:{this.state.stars}</div>
                                        <input type='range' min={0} max={5} value={this.state.stars} required="required" onChange={this.handleChange} />
                                        <br />
                                        <Rating rating={this.state.stars}  maxRating={5} />
                                      </div>
                                      <Form.Field >
                                          <input  hidden placeholder="Username" name="rated" required="required" value={currentListing.user_id} onChange={this.handleInput}/>
                                      </Form.Field>
                                      <Form.Field>
                                      <label>Review: </label>
                                        <TextArea placeholder="Review" name="review" required="required" value={this.state.review} onChange={this.handleInput} />
                                      </Form.Field>
                                      <Button  type="submit">SUBMIT </Button>
                                  </Form>
                                </Modal.Description>
                            </Modal.Content>
                          </Modal>
                      </Card.Description>
                    </Card.Content>
                  </Card>

                :
                null
              )
              })
              :
              null
            }
        </Card.Group>
      </Grid>

      :
      null
    }

    </div>
  )
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
    },
    addRating:(rating) => {
      dispatch({ type: "ADD_RATING", payload: rating})
    },
    deleteFromRentals:(listing) => {
      dispatch({type: "DELETE_FROM_RENTALS", payload: listing})
    },
    deleteListing: (listing) => {
      dispatch({ type: "DELETE_LISTING", payload: listing})
    },
    changeListingStatus: (listing) => {
      dispatch({type:"CHANGE_LISTING_STATUS", payload: listing})
    },
    deleteFromCollection: (listing) => {
      dispatch({type: "DELETE_FROM_COLLECTION", payload: listing})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
