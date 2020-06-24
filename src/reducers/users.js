import { RECEIVE_USERS } from "../actions/users";
import { ADD_QUESTIONS_ANSWER, ADD_QUESTIONS } from "../actions/shared";
export default function  users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_QUESTIONS_ANSWER:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                    }
                }
            }
        case ADD_QUESTIONS:

            return{
                ...state,
                [action.formattedQuestion.author]:{
                    ...state[action.formattedQuestion.author],
                    questions: state[action.formattedQuestion.author].questions.concat([action.formattedQuestion.id])
                }
            }

        default:
            return state;
    }
}