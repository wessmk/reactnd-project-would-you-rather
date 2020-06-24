import React, { Component } from 'react';
import { connect } from "react-redux";
class User extends Component{
    render(){
        const {id, users, index} = this.props
        return(
            <div className='user'>
                <div className='user-who-asked'>
                    <p>{index + 1 }: {users[id].name}</p>
                </div>
                <div className='avatar-wrap'>
                    <img src={users[id].avatarURL} alt={`Avatar of ${users[id].name}`} />
                </div>
                <div className = 'user-info' >
                    <p>Answered questions : {Object.keys(users[id].answers).length}</p>
                    <p>Created questions : {users[id].questions.length}</p>
                </div>
                <div className='score'>
                    <p>Score:</p>
                    <div className='score-wrap'><span>{Object.keys(users[id].answers).length + users[id].questions.length}</span> </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps({users}) {
    return{
        users,
    }
}
export default connect(mapStateToProps)(User)