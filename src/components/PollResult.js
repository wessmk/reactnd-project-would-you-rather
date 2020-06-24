import React, { Component } from 'react';
import { connect } from "react-redux";

class PollResult extends Component{
    render(){
        const {id, users, questions, voteOptionOne, voteOptionTwo, optionOne, optionTwo, authedUser} = this.props
        return(
           <div className={'poll-page poll'}>
            <h1>Result</h1>
                <div>
                    <div className='user-who-asked'>
                        <p >{users[questions[id].author].name} asks:</p>
                    </div>
                    <div className='avatar-wrap'>
                        <img src={users[questions[id].author].avatarURL} alt={`Avatar of ${users[questions[id].author].name}`} />
                    </div>
                        <div className='question-body'>
                            <h2>Would You Rather ...</h2>
                            <div className= {questions[id].optionOne.votes.includes(authedUser) ? 'active result-single' : 'result-single'} >
                                <p>{questions[id].optionOne.text}</p>
                                <div className='percentage'>
                                    <div className='progress' style={{width: `${voteOptionOne}%`}}></div>
                                    <p>{voteOptionOne}%</p>
                                </div>
                                <p>{optionOne} out of {optionOne+ optionTwo} votes</p>
                                
                            </div>
                            <div className= {questions[id].optionTwo.votes.includes(authedUser) ? 'active result-single' : 'result-single'}>
                                <p>{questions[id].optionTwo.text}</p>
                               <div className='percentage'>
                                    <div className='progress' style={{width: `${voteOptionTwo}%`}}></div>
                                    <p>{voteOptionTwo}%</p>
                                </div>
                                <p>{optionTwo} out of {optionOne+ optionTwo} votes</p>
                            </div>   
                                    
                                    
                                    
                        </div>
                      
                    
                    
                </div>
            </div>
            
        )
    }
}
function mapStateToProps({authedUser, questions, users}, props) {
    console.log(props)
    console.log(authedUser)
    let optionOne = questions[props.id].optionOne.votes.length
    let optionTwo = questions[props.id].optionTwo.votes.length

    return{
        questions,
        users,
        authedUser,
        voteOptionOne: ((optionOne / (optionTwo + optionOne)) * 100).toFixed(2),
        voteOptionTwo: ((optionTwo / (optionTwo + optionOne)) * 100).toFixed(2),
        optionOne,
        optionTwo
    }
}
export default connect(mapStateToProps)(PollResult)