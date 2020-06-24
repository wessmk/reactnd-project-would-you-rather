import React, { Component } from 'react';
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import { handleAddQuestionsAnswer } from "../actions/shared";
import PollResult from "./PollResult";
class Poll extends Component{
    state ={
        Answer: 'optionOne',
    }
    handleInputChange = (ev) => {
        this.setState({Answer: ev.target.value})
    }
    handleSubmit = (ev) => {
        ev.preventDefault()
        const {Answer} = this.state
        const {question_id, authedUser, dispatch} = this.props
        dispatch(handleAddQuestionsAnswer(authedUser, question_id, Answer))
    }
    render(){
        const {question_id, users, questions, isQuestion, answeredPoll} = this.props

        if (isQuestion === true && answeredPoll === true) {
            return ( <PollResult id={question_id} /> )
        }
        return(
            <div className={this.props.match ? 'poll-page poll' : 'poll'}>
                <div>
                    <div className='user-who-asked'>
                        <p >{users[questions[question_id].author].name} asks:</p>
                    </div>
                    <div className='avatar-wrap'>
                        <img src={users[questions[question_id].author].avatarURL} alt={`Avatar of ${users[questions[question_id].author].name}`} />
                    </div>
                    {
                        isQuestion === true
                        ? <div className='question-body'>
                                <h2>Would You Rather ...</h2>
                                <form onSubmit={this.handleSubmit}>
                                    <label>
                                        {questions[question_id].optionOne.text}
                                        <input
                                            name="response"
                                            type = "radio"
                                            value = "optionOne"
                                            defaultChecked
                                            onChange={this.handleInputChange} />
                                    </label>
                                    <label>
                                        {questions[question_id].optionTwo.text}
                                        <input
                                            name = "response"
                                            type = "radio"
                                            value = "optionTwo"
                                            onChange={this.handleInputChange} />
                                    </label>
                                    <button className='btn' type='submit'>
                                        Submit
                                    </button>
                                </form>
                                
                            </div>
                        : <div className='question-excerpt'>
                                <p>Would you rather</p>
                                <p>{questions[question_id].optionOne.text}...</p>
                                <Link to={`/questions/${question_id}` } >View Poll</Link>
                            </div>
                    }
                    
                    
                </div>
            </div>
            
        )
    }
}
function mapStateToProps({authedUser, questions, users}, props) {
    console.log(props)
    const {question_id} = props.isQuestion ? props.match.params : props 
    let answeredPoll = users[authedUser].answers.hasOwnProperty(question_id)
    return{
        question_id,
        questions,
        users,
        authedUser,
        answeredPoll
    }
}

export default connect(mapStateToProps)(Poll)