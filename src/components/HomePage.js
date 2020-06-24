import React, { Component } from 'react';
import { connect } from "react-redux";
import PollList from "./PollList";
import {Link} from "react-router-dom";
class HomePage extends Component{
    state = {
        showUnansweredQuestions: true,
        showAnsweredQuestions: false
    }
    showUnanswered = (ev) => {
        ev.preventDefault()
        this.setState(() => ({
            showUnansweredQuestions: true,
            showAnsweredQuestions: false
        }))
    }
    showAnswered = (ev) => {
        ev.preventDefault()
        this.setState(() => ({
            showUnansweredQuestions: false,
            showAnsweredQuestions: true
        }))
    }
    render(){
        const {showUnansweredQuestions} = this.state
        const {answeredQuestions, unAnsweredQuestions} = this.props
        return(
            <div className='Home'>
                <div className='tab'>
                    <Link to='#' onClick={this.showUnanswered} className = {this.state.showUnansweredQuestions ? 'active' : ''} >Unanswered Questions</Link>
                    <Link to='#' onClick={this.showAnswered} className = {this.state.showAnsweredQuestions ? 'active' : ''}>Answered Questions</Link>
                </div>
                <PollList questionsPoll={
                    showUnansweredQuestions === true
                        ? unAnsweredQuestions 
                        : answeredQuestions
                } showUnansweredQuestions={showUnansweredQuestions}  />
            </div>
        )
    }
}
function mapStateToProps({authedUser, questions, users}) {
    let orderedQuestions = Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    return {
      answeredQuestions: orderedQuestions.filter(Q => {
          return questions[Q].optionOne.votes.includes(authedUser) || questions[Q].optionTwo.votes.includes(authedUser)
      }),
      unAnsweredQuestions: orderedQuestions.filter(Q => {
          return !questions[Q].optionOne.votes.includes(authedUser) && !questions[Q].optionTwo.votes.includes(authedUser)
      }),
      questions,
      users
    }
}
export default connect(mapStateToProps)(HomePage)