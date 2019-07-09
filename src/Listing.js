// import React, { Component } from 'react';
// import { connect } from 'react-redux'
// import {Grid, Card, Form, Segment, Image, Button } from 'semantic-ui-react'
//
// class Listing extends Component {
//
//   render() {
//     return (
//       <Grid columns={2} stackable className="fill-content">
//         <Card.Group itemsPerRow={4}>
//         <h3>Reviews:</h3>
//         {
//           this.props.currentUser.received_ratings.map(ratings => {
//             return (
//               <Card key={ratings.id}>
//                 <Card.Content>
//                   <Card.Description>
//                     <p>Review: {ratings.review}</p>
//                     <p>Rating: {ratings.stars}</p>
//                   </Card.Description>
//                 </Card.Content>
//               </Card>
//           )})
//         }
//         </Card.Group>
//
//       )
//
//
//
//           {
//             this.props.currentUser.listings.map(userListing => {
//             return  <Card.Group centered>
//                 <Card key={userListing.id}>
//                   <Card.Content>
//                     <Image src={userListing.image} floated='right' size='small'/>
//                     <Card.Header>{userListing.instrument_name}</Card.Header>
//                     <Card.Description>
//                       <p>Price/per day:${userListing.price}</p>
//                         {
//                           !this.state.rented
//                           ?
//                           <Button color="yellow" onClick={this.rentInstrument}>Rent!</Button>
//                           :
//                           <Button color="red" >Not Available</Button>
//                         }
//
//                       // <Button color="red">Rent {userListing.rented}!</Button>
//                     </Card.Description>
//                   </Card.Content>
//                 </Card>
//               </Card.Group>
//             })
//           }
//       </Grid>
//     );
//   }
//
// }
//
// function mapStateToProps(state) {
//   return {
//     currentUser: state.currentUser,
//     listings: state.listings,
//     ratings: state.ratings
//   }
// }
//
// export default connect(mapStateToProps)(Listing);
