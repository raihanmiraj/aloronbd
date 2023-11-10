import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import QuizListAnimation from './QuizListAnimation';
export class QuizList extends Component {
    state = {
        quiz_meta_data:"",
        loading:true,
    }

    componentDidMount(){
      console.log("called")
        axios.get('/getallquizmeta')
.then( (response) => {
this.setState({
    quiz_meta_data:response.data.data,
    loading:false
 });
 

 
 
})
.catch(  (error) => {
  console.log(error);
});
    }

    render() {

  
       const QuizMeta =  this.state.quiz_meta_data;


        const quizlist =  Object.keys(QuizMeta)
        .map(key=>{
          var imgdata = JSON.parse(QuizMeta[key].image);
         var img = imgdata.hasOwnProperty('thumb')?imgdata.thumb:(imgdata.hasOwnProperty('medium')?imgdata.medium:imgdata.image)
             return (
              
                <Link to={'/quiz/'+QuizMeta[key].id }  key={QuizMeta[key].id} className="group relative">
                <div className="w-full  h-72 md:h-40 bg-gray-200 aspect-video rounded-md overflow-hidden group-hover:opacity-75   lg:aspect-video hover:blur-lg cursor-pointer relative">
                  <img
                    src={img}
                    alt={img }
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                    <p className="absolute bottom-0 bg-yellow-400 right-0 text-sm font-semibold text-black px-5 py-1 rounded-tl-md">{QuizMeta[key].subject_name}</p>
                    <p className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm rounded-bl-md">{QuizMeta[key].point}</p>
                </div>
              
                <div className="mt-2 flex justify-between overflow-hidden">
                  <div>
                  <h3 className="text-md text-black font-semibold truncate " >
                       {QuizMeta[key].quiz_name}
                      </h3>
                   
                  </div>
                 
                </div>
              </Link>
            )
        })

 
        //   const quizlist =    QuizMeta.map((quiz) => (
            // <div key={quiz.id} className="group relative">
            //   <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
            //     <img
            //       src={quiz.id}
            //       alt={quiz.id}
            //       className="w-full h-full object-center object-cover lg:w-full lg:h-full"
            //     />
            //   </div>
            //   <div className="mt-4 flex justify-between">
            //     <div>
            //       <h3 className="text-sm text-gray-700">
            //         <Link href={quiz.id }>
            //           <span aria-hidden="true" className="absolute inset-0" />
            //           {quiz.quiz_name}
            //         </Link>
            //       </h3>
            //       <p className="mt-1 text-sm text-gray-500">{quiz.id}</p>
            //     </div>
            //     <p className="text-sm font-medium text-gray-900">{quiz.id}</p>
            //   </div>
            // </div>
        //   ))

var renderQuizAnimation  = <QuizListAnimation/> ;
     
          
        return (
            <div>
                <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
   
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
 {!this.state.loading?quizlist:     <QuizListAnimation/>  } 
     
        </div>
      </div>
    </div>
            </div>
        )
    }
}

export default QuizList
