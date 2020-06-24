import React, { Component } from 'react';
import { connect } from "react-redux";
import Poll from "./Poll";
class PollList extends Component{
    render(){
        const {questionsPoll, users, questions, showUnansweredQuestions} = this.props
        return(
            <div className='poll-list'>
                <h1>{showUnansweredQuestions === true ? 'Unanswered Questions' : 'Answered Questions'}</h1>
                {
                    questionsPoll.map(answeredQuestion => (

                        <Poll key={answeredQuestion} question_id={answeredQuestion} users={users} questions={questions} isQuestion={false} />
                       
                    ))
                }
            </div>
            
        )
    }
}
function mapStateToProps({questions, users}) {
   
    return {
      questions,
      users
    }
}
export default connect(mapStateToProps)(PollList)