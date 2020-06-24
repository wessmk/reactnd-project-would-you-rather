import React, { Component } from 'react';
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
class Login extends Component {
    state = {
        choosedUser: ''
    }

    handleChange = (e) =>{
        const choosedUser = e.target.value
        
        this.setState(() => ({choosedUser}))
    }
    login = (ev) => {
        ev.preventDefault()
        const choosedUser = this.state.choosedUser
        choosedUser !== ''
            ? this.props.dispatch(setAuthedUser(choosedUser))
            : alert('Please try login correctly')
        
    }
  render(){
    const {usersIds, users} = this.props
    console.log(usersIds)
    return (
        <div>
        {
            usersIds.length !== 0 && <div className="Login" >
                <h1>Login</h1>
                <select  onChange={this.handleChange}>
                    <option value=''>Select User</option>
                    {
                        usersIds.map(uId => (
                            <option key={uId} value={uId}>{users[uId].name}</option>
                        ))
                    }
                    
                </select>
                <button onClick={this.login}>
                    Submit
                </button>
            </div>
        }
      </div>
    );
  }
}
function mapStateToProps({users}) {
    return {
       usersIds: Object.keys(users),
       users
    }
}


export default connect(mapStateToProps)(Login)
