import React, { Component } from 'react';
import assets from './assets/images/logo.png'
import { Link, withRouter} from 'react-router-dom';
import { Menu, Input, Button } from 'semantic-ui-react'

class NavBar extends Component {

  render() {
    return (

      <Menu fluid size='huge' secondary >
        <Menu.Item header>
          <Link to='/home'className="item">
         <img src={assets} />
         </Link>
       </Menu.Item>
        <Menu.Item>
          <Link to='/home'className="item">
            Home
          </Link>
        </Menu.Item>
      <Menu.Menu position="left" >
        <Menu.Item>
            <Link to='/guitars' className='item' >
              Guitars
            </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to='/basses'className='item' >
            Basses
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/keyboards"className='item' >
            Keyboards
          </Link>
        </Menu.Item>
          <Menu.Item>
          <Link to="/brass"className='item' >
            Brass
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/drums"className='item' >
            Drums
          </Link>
        </Menu.Item>


      </Menu.Menu>

        {
          this.props.currentUser

          ?

          <Menu.Menu position="right">
              <Menu.Item>
								<Link className="item" to={`/users/${this.props.currentUser.id}`}>
									<img src={this.props.currentUser.image}/>
								</Link>
              </Menu.Item>

								<Menu.Item position="right" onClick={this.props.logOut}>
                  <Link to='/home'>
  								  Log out
                  </Link>
								</Menu.Item>
						</Menu.Menu>

        :

          <Menu.Menu position="right">
            <Menu.Item >
              <Link className="item" to="/signup">
                SignUp
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link className="item" to="/login">
                Login
              </Link>
            </Menu.Item>
          </Menu.Menu>
      }
    </Menu>
    );
  }

}

export default withRouter(NavBar);
