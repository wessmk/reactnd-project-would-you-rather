import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Header from "./header";
import Login from "./Login";
import LoadingBar from "react-redux-loading";
import { setAuthedUser } from "../actions/authedUser";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from "./HomePage";
import Poll from "./Poll";
import LeaderBoard from "./LeaderBoard";
import AddQuestion from "./AddQuestion";
class App extends Component {
  componentDidMount(){
    const {dispatch}  = this.props
    dispatch(handleInitialData())
    if(this.props.loading === true){
      dispatch(setAuthedUser(''))
    }
  }
  render(){
    let {needToLogin, loading} = this.props
    
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
              <Header />
              { this.props.loading === true 
                    ? null 
                    : <div>
                    {
                      !loading && needToLogin 
                      ? <Route path='/' exact component={Login} />
                      : <Route path='/' exact component={HomePage} />
                    }
                    <Route path='/questions/:question_id' component={ (props) => <Poll {...props} isQuestion={true} />} />
                    <Route path='/leaderboard' component={LeaderBoard} />
                    <Route path='/add' component={AddQuestion} />
                    
                    </div>
                }
          </div>
         
        </Fragment>
      </Router>
      
    );
  }
  
}
function mapStateToProps({authedUser}) {
  return{
    loading: authedUser === null,
    needToLogin: authedUser === '',
    authedUser
  }
}
export default connect(mapStateToProps)(App)
