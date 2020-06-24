import { RECEIVE_QUESTIONS } from "../actions/questions";
import { ADD_QUESTIONS_ANSWER, ADD_QUESTIONS } from "../actions/shared";
export default function  questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTIONS_ANSWER:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer].votes.concat([action.authedUser])
                    }
                }
            }
        case ADD_QUESTIONS: 
            return{
                 ...state,
                 [action.formattedQuestion.id]: action.formattedQuestion
                  
                 
            }
        default:
            return state;
    }
}