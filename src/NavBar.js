import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

class NavBar extends Component {

  render() {
    return (

      <Menu>
        <Link to='/home'className="item">
          Supply Divide
        </Link>
        <Menu.Menu position="left" >
          <Link to='/guitars' className='item' >
            Guitars
          </Link>
          <Link to='/basses'className='item' >
            Basses
          </Link>
          <Link to="/keyboards"className='item' >
            Keyboards
          </Link>
          <Link to="/brass"className='item' >
            Brass
          </Link>
          <Link to="/drums"className='item' >
            Drums
          </Link>
        </Menu.Menu>

        {
          this.props.currentUser

          ?

          <Menu.Menu position="right">
								<Link className="item" to={`/users/${this.props.currentUser.id}`}>
									<img src={this.props.currentUser.image}/>
								</Link>

								<Menu.Item onClick={this.props.logOut}>
                <Link to='/home'>
									Log out
                </Link>
								</Menu.Item>

						</Menu.Menu>

        :

          <Menu.Menu position="right">
            <Link className="item" to="/signup">
              SignUp
            </Link>
            <Link className="item" to="/login">
              Login
            </Link>
          </Menu.Menu>
      }
    </Menu>
    );
  }

}

export default withRouter(NavBar);
