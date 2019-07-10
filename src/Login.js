import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Button, Header } from 'semantic-ui-react'

class Login extends Component {

  state = {
    password: '',
    name: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
  		fetch("http://localhost:3000/login", {
  			method: "POST",
  			headers: {
  				"Content-Type": "application/json",
  				"Accepts": "application/json",
  			},
  			body: JSON.stringify(this.state)
  		})
  		.then(res => res.json())
  		.then(response => {
          if (response.message) {
            alert(response.message)
        } else {
            localStorage.setItem("token", response.jwt)
            this.props.setCurrentUser(response.user)
            this.props.history.push(`/users/${response.user.id}`)
          }
      })
  }

  render() {
    return (
      <div>
      <Header size='huge'>Sign in</Header>
      <br>
      </br>
      <Form size='huge' onSubmit={this.handleSubmit}>
        <Form.Field >
          <label>Username:</label>
          <input placeholder="User Name" name="name" required="required" value={this.state.name} onChange={this.handleChange}/>
        </Form.Field>
        <Form.Field >
          <label>Password</label>
          <input type='password' placeholder="Password" name="password" required="required" value={this.state.password} onChange={this.handleChange} />
        </Form.Field >
          <Button color='blue' type="Submit">Login</Button>
        </Form>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  }
}

function mapDispatchToProps(dispatch){
  return {
    setCurrentUser:(userObj) => {
      dispatch({ type: "SET_CURRENT_USER", payload: userObj})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
