// import React, { Component } from 'react'
// import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'
//
// export default class ReviewForm extends Component {
//   state = { modalOpen: false }
//
//   handleOpen = () => this.setState({ modalOpen: true })
//
//   handleClose = () => this.setState({ modalOpen: false })
//
//   render() {
//     return (
//       <Modal
//         trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
//         open={this.state.modalOpen}
//         onClose={this.handleClose}
//         basic
//         size='small'
//       >
//         <Header icon='browser' content='Cookies policy' />
//         <Modal.Content>
//         <Modal.Description>
//           <Header>{userRental.instrument_name}</Header>
//           <Rating icon='star' value={this.state.stars} defaultRating={0} maxRating={5}/>
//             <Form onSubmit={this.handleSubmit}>
//             <Form.Field >
//               <label>Username:</label>
//               <input placeholder="Username" name="name" required="required" value={this.state.name} onChange={this.handleChange}/>
//             </Form.Field>
//             <Form.Field>
//               <label>Review: </label>
//                <input placeholder="Review" name="review"  value={this.state.review} onChange={this.handleChange} />
//             </Form.Field>
//               <Button type="submit">Submit </Button>
//             </Form>
//         </Modal.Description>
//         </Modal.Content>
//         <Modal.Actions>
//           <Button color='green' onClick={this.handleClose} inverted>
//             <Icon name='checkmark' /> Got it
//           </Button>
//         </Modal.Actions>
//       </Modal>
//     )
//   }
// }
