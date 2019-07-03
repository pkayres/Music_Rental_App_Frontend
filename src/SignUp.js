import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'


class SignUp extends Component {

  state = {
    name: '',
    password: '',
    passwordConfirmation: '',
    image: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  createUser = () => {
		fetch("http://localhost:3000/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json",
			},
			body: JSON.stringify({
        user: this.state
      })
		})
		.then(res => res.json())
		.then((response) => {
			if (response.message){
				alert(response.message)
			} else {
				localStorage.setItem("token", response.jwt)
				this.props.setCurrentUser(response.user)
				 this.props.history.push(`/users/${response.user.id}`)
			}
		})
	}

  handleSubmit = (e) => {
    e.preventDefault();
		if(this.state.password === this.state.passwordConfirmation){
			this.createUser()
		} else {
			alert("Passwords don't match!")
		}
	}


  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
      <Form.Field >
        <label>Create Username:</label>
        <input placeholder="User Name" name="name" required="required" value={this.state.name} onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>Add Avatar Image:</label>
        <input placeholder="Image URL" name="image" required="required" value={this.state.image} onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>Create Password:</label>
        <input placeholder="Password" name="password" required="required" value={this.state.password} onChange={this.handleChange} />
      </Form.Field>
      <Form.Field>
        <label>Confirm Password: </label>
         <input placeholder="Password Confirmation" name="passwordConfirmation" required="required" value={this.state.passwordConfirmation} onChange={this.handleChange} />
      </Form.Field>
        <Button type="submit">Submit </Button>
      </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);