import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from 'react-router-dom';
  import axios from 'axios';
import Home from '../../Container/Home/Home';
import Login from '../../Container/Login/Login';
import ForgetPassword from '../../Container/ForgetPassword/ForgetPassword';
import Register from '../../Container/Register/Register';
import Profile from '../../Container/Profile/Profile';
 import QuizList from '../../Container/Quiz/QuizList/QuizList';
 import QuizStartingPage from '../../Container/Quiz/QuizStartingPage/QuizStartingPage';
 import QuizPage from '../Quiz/QuizPage/QuizPage';
 import UserProfile from '../../Container/Profile/UserProfile/UserProfile';
 import UserQuizResultsPage from '../UserProfileComponent/UserQuizResultsPage/UserQuizResultsPage';
 
class Header extends Component {
   state = {
       user:{}
   }

       // "start": "react-scripts start",
    // "build": "react-scripts build",
    // "test": "react-scripts test",

   componentDidMount(){
    //    Login user crediential
    axios.get('/user' )
    .then( (response) => {
     this.setUser(response.data);
    })
    .catch(  (error) => {
      console.log(error);
    });
   }

   setUser = (user)=>{
      this.setState({user: user}) 
   }
  

    render() {
        return (
            <>
     <Router> 
          <Navbar user={this.state.user} setUser={this.setUser} />
          <Switch>
          <Route exact path="/" component={Home} />
          <Route  path="/login" component=  {()=> <Login user={this.state.user} />} />
          <Route  path="/quizlist" component=  {()=> <QuizList/>} />
          {/* <Route  path="/quiz/:id" component=  {()=> <QuizStartingPage/>} /> */}
          <Route exact  path="/quiz/:id" component={QuizStartingPage} />
          <Route exact  path="/quiz/start/:id" component={QuizPage} />
          <Route  path="/forgetpassword" component={ForgetPassword} />
          <Route  path="/register" component={()=> <Register user={this.state.user} />}  />
          <Route  path="/profile" component={()=> <UserProfile user={this.state.user} />} />
          <Route exact   path="/userquizresult/:id" component={UserQuizResultsPage} />
          
          
        </Switch>
   
    </Router>
            </>
        )
    }
}

export default Header
