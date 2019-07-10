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
    //
  }

  handleClose = () => this.setState({ modalClose: false})

  handleChange = e => this.setState({ stars: e.target.value })

  // handleCurrentUser = () => this.setState({ rater: this.props.currentUser.id })

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
      this.props.deleteListing(userListing)}
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
        console.log(rating)
         this.props.addRating(rating);
         this.setState({ modalOpen: false, modalClose: true})
         this.props.deleteFromRentals(currentListing)
      })
    fetch(`http://localhost:3000/rents/${currentListing.rent.id}`, {
      method: 'DELETE'
    })
  }


  render() {
    const { rating } = this.state
    // debugger
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
            <Button color="green">Create Listing</Button>
          </Link>
          </div>
          <Header size='huge'>Owner Reviews:</Header>
          <Segment raised style={{ overflow: 'auto', maxHeight: '27em' }}>
        {
          this.props.currentUser.received_ratings.map(ratings => {
            return (
              <Card.Group right>
                <Card key={ratings.id}>
                  <Card.Content>
                    <Card.Description>
                      <p>{ratings.name}</p>
                      <p>Review: {ratings.review}</p>
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
        <Header size='huge'>Currently Leasing:</Header>
        <Segment raised style={{ overflow: 'auto', maxWidth: '40em', maxHeight: '50em' }}>
          <Card.Group centered>
          {
            this.props.currentUser.listings.map(userListing => {
            return (
              <div>
                <Link to ={`/listings/${userListing.id}`}>
                <Card key={userListing.id}>
                  <Card.Content>
                    <Card.Header>{userListing.instrument_name}</Card.Header>
                    <Image src={userListing.image} size='small'/>
                    <Card.Description>
                      <p>Price: ${userListing.price}</p>
                        {
                          userListing.rented
                          ?
                          <Label as='a' basic color="red" pointing>
                            Currently Rented
                          </Label>
                          :
                          <Label as='a' color="yellow" ribbon>
                            Available
                          </Label>
                        }
                    </Card.Description>
                  </Card.Content>
                </Card>
                </Link>
                <Button onClick={() => this.removeListing(userListing)} color="blue">Remove Listing</Button>
              </div>
            )
            })
          }
          </Card.Group>
        </Segment>
          </Grid.Column>
          <Divider horizontal></Divider>
          <Header size='huge'>Currently Renting:</Header>
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
                            trigger={<Button onClick={() => this.handleOpen(userRental)}>Return</Button>}
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
                                      <Button  type="submit">Submit </Button>
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
  ) // return of component
  }
} // end of the component



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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
