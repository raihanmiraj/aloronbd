import React, { Component } from 'react'
import axios from 'axios';
import { data } from 'autoprefixer';

import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import QuizPage from '../../../Component/Quiz/QuizPage/QuizPage';
 


export class UserQuizResultsPage extends Component {




    
    state = {
        // quizRadioButtonClass : 'block mt-4 border border-gray-300 rounded-lg py-2 px-6 text-lg hover:bg-gray-100 cursord-pointer',
        quizRadioButtonClass : 'block mt-4 border border-gray-300 rounded-lg py-2 px-6 text-lg hover:bg-gray-100 cursord-pointer',
        quizRightAns : 'block mt-4 border border-gray-300 rounded-lg py-2 px-6 text-lg bg-green-200 bg-red-200',
        quizWrongButton:'block mt-4 border border-gray-300 rounded-lg py-2 px-6 text-lg  bg-red-200',
        userQuizResultAndQuestion:"",
        loading:true,
        urlparam:"",
        userresultid:""      
    
 }

     componentDidMount(){
        
        const { match: { params } } = this.props;
        // console.log(params );
        this.setState({urlparam:params.id});
    // this.setState({
    //     userresultid:this.props.location.userresultquiz.id
    //     })
        // console.log(this.props.match.params.redirectParam);

       

        axios.post('userquizresult/'+params.id)
.then( (response) => {
this.setState({
    userQuizResultAndQuestion:response.data,
    loading:false,

 });

 
 
})
.catch(  (error) => {
  console.log(error);
});

  }


  


    render() {

//         var userResultQuiz = [{
//             id:1,
//             question:{
//                 question:"helo",
//                 type:"text"
//             },
//             option:{
//                 A:{
//                     option:"raihan Miraj",
//                     type:"text",
//                     userans:1,
//                     mainans:1
//                 },
//                 B:{
//                     option:"raihan Miraj",
//                     type:"text",
//                     userans:0,
//                     mainans:1
//                 }
//             },
//             is_user_take:1
//         }
//     ,
//     {
//         question:{
//             question:"helo",
//             type:"text"
//         },
//         option:{
//             A:{
//                 option:"raihan Miraj",
//                 type:"text",
//                 userans:1,
//                 mainans:2
//             },
//             B:{
//                 option:"raihan Miraj",
//                 type:"text",
//                 userans:0,
//                 mainans:0
//             }
//         },
//         is_user_take:1
//     }
// ]
        if(!this.state.loading){
       var   userResultQuiz=    this.state.userQuizResultAndQuestion;
 

        }

        // userResultQuiz = JSON.parse(userResultQuiz);






      

var QuizResultRender = !this.state.loading? userResultQuiz.map(data=>{
    var question = data.question.question;
if(data.question.type=='img'){
    var question = <img src={data.question.question}/>
}
var options = data.option;
 

var renderOptions =  Object.keys(options).map(optionkey=>{
    var id =  data.id;
 

var classOfRadioButton =this.state.quizRadioButtonClass;
 var optionValue = "";
 
if(options[optionkey].type=='text'){
  optionValue =   options[optionkey].option;
}else if(options[optionkey].type=='img'){
  optionValue = <img src={options[optionkey].option}  />;
}

if(options[optionkey].userans == 1 && options[optionkey].mainans == 1){
   var  classOfRadioButton =this.state.quizRightAns;
}else if(options[optionkey].userans == 1  && options[optionkey].mainans ==0) {
    var  classOfRadioButton =this.state.quizWrongButton; 
}else if(options[optionkey].userans == 0  && options[optionkey].mainans ==1) {
    var  classOfRadioButton =this.state.quizRightAns; 
}
 
  return (
        <label onClick={this.quizSelectHandler}  for={id} class={classOfRadioButton} disabled={"false"} value={optionkey} ><input id={id} type="radio" class="hidden" value={optionkey}  />{optionValue}</label>
     )
})


    return (<div class="bg-white p-12 rounded-lg  w-full mt-8"><div><p class="text-2xl font-bold">{question}</p> 
    {renderOptions}
   </div></div>)
}):""


 
 
        return (
            <div>
                
               {QuizResultRender}
 
 
            </div>
        )
    }
}

export default UserQuizResultsPage
