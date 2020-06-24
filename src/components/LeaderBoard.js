import React, { Component } from 'react';
import { connect } from "react-redux";
import User from "./User";
class LeaderBoard extends Component {
    render(){
        const {orderedUsers} = this.props
        console.log(orderedUsers)
        return(
            <div className='leaderboard-users'>
                {
                    orderedUsers.map((id, index) => (
                        <User id={id} key={id} index={index} />
                    ))
                }
            </div>
        )
    }
}
function mapStateToProps({users}) {
    let usersArray = Object.keys(users)
    console.log(usersArray)
    let orderedUsers = Object.keys(users).sort((a, b) => {
        //console.log(users[a].questions.length - users[b].questions.length)
        //console.log(Object.keys(users[a].answers).length - Object.keys(users[b].answers).length)
        return ((users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length))
    })
    console.log(orderedUsers)
    return{
        orderedUsers,
        users
    }
}

export default connect(mapStateToProps)(LeaderBoard)