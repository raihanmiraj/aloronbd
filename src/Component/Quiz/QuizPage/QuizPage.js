import React, { Component, Fragment, useRef, useState } from 'react'
 import axios from 'axios';
 import { useHistory } from "react-router-dom";
 import { Link } from 'react-router-dom';
 class QuizPage extends Component {

    state = {
        // quizRadioButtonClass : 'block mt-4 border border-gray-300 rounded-lg py-2 px-6 text-lg hover:bg-gray-100 cursord-pointer',
        quizRadioButtonClass : 'block mt-4 border border-gray-300 rounded-lg py-2 px-6 text-lg hover:bg-gray-100 cursord-pointer',
        quizRadioButtonOnCLickClass : 'block mt-4 border border-gray-300 rounded-lg py-2 px-6 text-lg bg-green-200 bg-red-200',
        selectedQuiz:[],
        quesData:[],
        loading: true,
        quiz_id:"",
        is_attend:0,
        timeover:0,
        open:true,
        message:"",
        userresultid:""
 }

     componentDidMount(){
  
        // if(!localStorage.getItem("quiz"+params.id)){
        //     // this.context.router.push("/quiz/"+params.id);
        //     this.props.history.push("/quiz/"+params.id)
        // }
         this.setState({
            quiz_id:this.props.quizid
        })

        axios.post('/question/'+this.props.quizid)
.then( (response) => {
this.setState({
    quesData:response.data,
    loading:false,
    message:response.data.message
 });

 
 
})
.catch(  (error) => {
  console.log(error);
});

 

if(localStorage.getItem('quiz'+this.props.quizid)){
    this.setState({
        selectedQuiz:JSON.parse(localStorage.getItem('quiz'+this.props.quizid)) ,
    });
}
    }


  onClickHandle =()=>{

var data = {
quiz_data : JSON.stringify(this.state.selectedQuiz),
quizid:this.state.quiz_id

}
console.log(data);

    axios.post('/submitquiz/'+this.state.quiz_id , data)
    .then( (response) => {
  alert(response.data);
    
   })
    .catch(  (error) => {
      console.log(error);
    });
    localStorage.removeItem('quiz'+this.state.quiz_id);
        // console.log(JSON.stringify(this.state.selectedQuiz) );
    }

    quizSelectHandler = (e) =>{
        if(!e.target.getAttribute("disabled")  ){
            let menu =e.target ;
            if(menu.firstChild){
              
var id_question = menu.firstChild.id;

var value_question = menu.firstChild.value;

var condition = 'this.state.selectedQuiz=={} || this.state.selectedQuiz[id_question].indexOf(value_question)==-1';
if(this.state.selectedQuiz==""  ||this.state.selectedQuiz[id_question]==null || this.state.selectedQuiz[id_question].indexOf(value_question)==-1 ){
   
    var updateQuiz ={
        ...this.state.selectedQuiz
    }
     if(this.state.selectedQuiz[id_question]){
                 var updateSubmittedOptionsForSameQuestion = [...this.state.selectedQuiz[id_question],value_question] ;
                 updateQuiz[id_question]   = updateSubmittedOptionsForSameQuestion;
                   } else{
                      
                    updateQuiz[id_question]=[value_question];
                     
                   }
        
                   this.setState({
                    selectedQuiz:updateQuiz,
                   })
               
                   
                     console.log(this.state.selectedQuiz);
                    menu.removeChild(menu.firstChild);
                    // console.log(e.target);
                    e.target.className  = 'block mt-4 border border-gray-300 rounded-lg py-2 px-6 text-lg bg-green-200 bg-red-200';
        
                  e.target.setAttribute('disabled',"true");
} 


        }
 
        }
         
        localStorage.setItem("quiz"+this.state.quiz_id, JSON.stringify(this.state.selectedQuiz) );
    }
    // 

    handleGoBack = ()=>{
        this.props.history.goBack();
    }




    render() {
 
var ModalCode =   <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
<div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
 
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
 
  <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

 
  <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
      
          <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
         Quiz Error
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
            {this.state.message}   </p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
      <Link to="/quizlist"type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
       Go Back
      </Link>
    
    </div>
  </div>
</div>
</div>;

    var renderQuiz ='';
    
   var selected_quiz = this.state.selectedQuiz;
    if(!this.state.loading ){
        
    const quizData =  this.state.quesData.data;
     var renderQuiz  =quizData==0?ModalCode:  quizData.map(i=>{

        var setting = JSON.parse(i.setting) ;
        var posMark = setting.posMark;
        var negMark = setting.negMark;
        console.log(posMark);

var options = JSON.parse(i.options) ;
 
 var renderOptions =  Object.keys(options).map(optionkey=>{
    var id =  i.id;
var quiz = selected_quiz[id];
var makeSelectedQuizdisable = false;
var classOfRadioButton = this.state.quizRadioButtonClass;
if(quiz!=null && quiz.indexOf(optionkey) !=-1 ){
    console.log(quiz);
    var classOfRadioButton = this.state.quizRadioButtonOnCLickClass;
}
 var optionValue = "";
 
if(options[optionkey].type=='text'){
  optionValue =   options[optionkey].option;
}else if(options[optionkey].type=='img'){
  optionValue = <img src={options[optionkey].option}  />;
}

  return (
        <label onClick={this.quizSelectHandler}  for={id} class={classOfRadioButton} disabled={"false"} value={optionkey} ><input id={id} type="radio" class="hidden" value={optionkey}  />{optionValue}</label>
     )
})
 
var questionJson = JSON.parse(i.question);
var question = "";
if(questionJson.type="text"){
  question = questionJson.question;
}else if(questionJson.type="img"){
  question = <img src={questionJson.question}  />;
}

            return(<div class="bg-white p-12 rounded-lg  w-full mt-8"><div><p class="text-2xl font-bold">{question}</p><p class="text-2xl font-bold">(postive mark: {posMark} , negative mark: {negMark})</p>
   {renderOptions}
  </div></div>)
        })
    }
      
    return (
            <div>
               {renderQuiz}
 
  <button type="button" onClick={this.onClickHandle}>Submit</button>
            </div>
        )
    }
}

export default QuizPage
