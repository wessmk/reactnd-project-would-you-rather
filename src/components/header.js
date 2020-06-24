import React, { Component } from 'react';
import { connect } from "react-redux";
import {NavLink} from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import { Redirect } from 'react-router-dom'
class Header extends Component {
    handleLogout = (ev) =>{
        ev.preventDefault()
        this.props.dispatch(setAuthedUser(''))
    }
  render(){
    const { name, avatarURL,   authedUser} = this.props
    return (
      <div className="App">
        {
            authedUser 
            ?   <div>
                    <nav className='Nav'>
                        <ul>
                            <li>
                                <NavLink to='/' exact activeClassName='active'>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/add' exact activeClassName='active'>
                                    New Question
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/leaderboard' exact activeClassName='active'>
                                    Leader Board
                                </NavLink>
                            </li>
                            <li>
                                <span>
                                    Hello, {name}
                                </span>
                                <img src={avatarURL} alt={`Profile avatar of ${name}`} className='header-avatar' />
                            </li>
                            <li>
                                <NavLink to='/' onClick={this.handleLogout}>
                                    logout
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    
                </div>
            : <Redirect to='/' />
        }
      </div>
    );
  }
  
}

function mapStateToProps({authedUser, users}) {
    const user = users[authedUser]
    return {
        authedUser, 
        name: user ? user.name : null,
        avatarURL: user ? user.avatarURL : null,
    }
}


export default connect(mapStateToProps)(Header)
