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
 import PublicRoute from '../PublicRoute';
 import PrivateRoute from '../PrivateRoute';
 import AuthContext from '../Context/AuthContext';
 import {isLogin} from '../utils/index';
 
class Header extends Component {
   state = {
       user:{},
       loggedIn:""
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
  
   setLoggedIn=()=>{
     this.setState({
       loggedIn:true
     })
   }
    render() {
      const loggedIn = this.state.loggedIn;
      const setLoggedIn = this.setLoggedIn;
      console.log(loggedIn);
        return (
            <>
     <Router> 
     <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
          <Navbar user={this.state.user} setUser={this.setUser} />
          </AuthContext.Provider>
          <Switch>
          {/* <Route exact path="/" component={Home} />
          <Route  path="/login" component=  {()=> <Login user={this.state.user} />} />
          <Route  exact path="/quizlist" component=  { QuizList } />
          
          <Route exact  path="/quiz/:id" component={QuizStartingPage} />
          <Route exact  path="/quiz/start/:id" component={QuizPage} />
          <Route  path="/forgetpassword" component={ForgetPassword} />
          <Route  path="/register" component={()=> <Register user={this.state.user} />}  />
          <Route  path="/profile" component={()=> <UserProfile user={this.state.user} />} />
          <Route exact   path="/userquizresult/:id" component={UserQuizResultsPage} />
           */}
             <Switch>
          <PublicRoute restricted={false} component={Home} path="/" exact />
          <PrivateRoute component={QuizList} path="/quizlist" exact />
          <PublicRoute restricted={isLogin()} component={()=> <Login user={this.state.user} />} path="/login" exact />
          <PublicRoute restricted={isLogin()}  component={Register} path="/register" exact />
          <PrivateRoute component={QuizStartingPage} path="/quiz/:id"  exact />
          <PrivateRoute component={QuizPage} path="/quiz/start/:id" exact />
          <PrivateRoute component={UserProfile} path="/profile" exact />
          <PrivateRoute component={UserQuizResultsPage}  path="/userquizresult/:id" exact />
          <Route component={Home} />
        </Switch>
          
        </Switch>
   
    </Router>
            </>
        )
    }
}

export default Header
