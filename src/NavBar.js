import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import { Menu, Input, Button } from 'semantic-ui-react'
import Assets from './Assets/images/logo.png'

class NavBar extends Component {

  render() {
    return (

      <Menu fluid size='huge' secondary >
        <Menu.Item header>
          <Link to='/home'className="item">
         <img src={Assets} />
         </Link>
       </Menu.Item>
        <Menu.Item>
          <Link to='/home'className="item">
            HOME
          </Link>
        </Menu.Item>
      <Menu.Menu position="left" >
        <Menu.Item>
            <Link to='/guitars' className='item' >
              GUITARS
            </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to='/basses'className='item' >
            BASSES
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/keyboards"className='item' >
            KEYBOARDS
          </Link>
        </Menu.Item>
          <Menu.Item>
          <Link to="/brass"className='item' >
            BRASS
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/drums"className='item' >
            DRUMS
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
  								  LOG OUT
                  </Link>
								</Menu.Item>
						</Menu.Menu>
          :
          <Menu.Menu position="right">
            <Menu.Item >
              <Link className="item" to="/signup">
                SIGN UP
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link className="item" to="/login">
                LOG IN
              </Link>
            </Menu.Item>
          </Menu.Menu>
      }
    </Menu>
    );
  }

}

export default withRouter(NavBar);
