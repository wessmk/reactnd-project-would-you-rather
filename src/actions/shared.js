import { getInitialData, saveQuestionAnswer, saveQuestion} from "../utils/api";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
//import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading";
export const ADD_QUESTIONS_ANSWER = 'ADD_QUESTIONS_ANSWER'
export const ADD_QUESTIONS = 'ADD_QUESTIONS'

export function  handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({users, questions }) =>{
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(hideLoading())
            })
    }
}

function addQuestionsAnswer(authedUser, qid, answer) {
    return {
        type: ADD_QUESTIONS_ANSWER,
        authedUser,
        qid, 
        answer
    }
}
export function handleAddQuestionsAnswer(authedUser, qid, answer) {
   
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestionAnswer({ authedUser, qid, answer })
            .then(() =>{
                dispatch(addQuestionsAnswer(authedUser, qid, answer))
                dispatch(hideLoading())
            })
    }
}

function addQuestions(formattedQuestion) {
    return {
        type: ADD_QUESTIONS,
        formattedQuestion
    }
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
   
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestion({ optionOneText, optionTwoText, author })
            .then((formattedQuestion) => {
                dispatch(addQuestions(formattedQuestion))
                dispatch(hideLoading())
            })
    }
}
