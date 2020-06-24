import React, { Component } from 'react';
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/shared";
import { Redirect } from 'react-router-dom'
class AddQuestion extends Component {
    state = {
        optionOne : '', 
        optionTwo : '',
        toHome: false
    }
    handleSubmit = (ev) => {
        ev.preventDefault()
        const {dispatch, authedUser} = this.props
        const {optionOne, optionTwo} = this.state
        console.log(optionOne)
        dispatch(handleAddQuestion(optionOne, optionTwo, authedUser))
        this.setState(() => ({
            
            toHome: true,
        }))
    }
    handleOptionOneChange = (ev) => {
        const optionOne = ev.target.value
        this.setState(() => ({optionOne}))
    }
    handleOptionTwoChange = (ev) => {
        const optionTwo = ev.target.value
        this.setState(() => ({optionTwo}))
    }
    render(){
        const {optionOne, optionTwo, toHome} = this.state
         if (toHome === true) {
            return(<Redirect to='/' />)
        }
        return(
            <div className='new-question-wrap'>
                <h1>Create New Question</h1>
                <p>Complete the question: </p>
                <h3>Would You rather</h3>
                <form className='new-question' onSubmit={this.handleSubmit}>
                    <input type='text' value={optionOne}  onChange={this.handleOptionOneChange} />
                    <input type='text' value={optionTwo}  onChange={this.handleOptionTwoChange} />
                    <button className='btn' type='submit' disabled={(optionOne==='' || optionTwo==='') || (optionOne === optionTwo)}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}
function mapStateToProps({authedUser}) {
    return{
        authedUser,
    }
}
export default connect(mapStateToProps)(AddQuestion)