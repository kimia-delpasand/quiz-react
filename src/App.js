import './App.css';
import React, { useRef, useState } from 'react'
import data from "./data"
const App = () => {
  //   index for number of questions ,0 first question
  let [index,setindex]=useState(0)
  // we want to get the question with related number 
  let [question,setquestion]=useState(data[index])
  //for giving only one choice for selecting answer
  let[lock,setlock]=useState(false)
  // برای جمع امتیازات for storing scores
  let[store,setstore]=useState(0)
  // for result
  let [result,setresult]=useState(false)



  const checkanswer =(e,ans)=>{
  if (lock===false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setlock(true);
        setstore((prev)=>prev+1);
      } else {
        e.target.classList.add("wrong");
        setlock(true);
        optionarray[question.ans-1].current.classList.add("correct")
      }
  }
  }

  // for showing right answer
  let option1 =useRef(null)
  let option2 =useRef(null)
  let option3 =useRef(null)
  let option4 =useRef(null)

  let optionarray =[option1,option2,option3,option4]



  const next =()=>{
    if (lock===true) {
      if (index===data.length -1) {
        setresult(true)
        return 0;
      }

      setindex(++index)
      setquestion(data[index])
      setlock(false)
      optionarray.map((elem)=>{
        elem.current.classList.remove("wrong")
        elem.current.classList.remove("correct")
        return null;
      })
    }
  }

  const startagain =()=>{
    setindex(0)
    setquestion(data[0])
    setstore(0)
    setlock(false)
    setresult(false)
  }
  return (
    <div className="wrapper d-flex justify-content-center p-5">
      <div className="container col-5 px-5 mx-auto bg-light ">
        <h1 className='text-primary'>Vocab test</h1>
        <hr />
        {result ? (
          <>
            <h2>
              you scored {store} out of {data.length}
            </h2>
            <button className="btn btn-primary" onClick={startagain}>
              Reset
            </button>
          </>
        ) : (
          <>
            <h2 className="mb-3">
              {index + 1}-{question.question}
            </h2>
            <ul className="list-unstyled">
              <li ref={option1} onClick={(e) => checkanswer(e, 1)}>
                {question.option1}
              </li>
              <li ref={option2} onClick={(e) => checkanswer(e, 2)}>
                {question.option2}
              </li>
              <li ref={option3} onClick={(e) => checkanswer(e, 3)}>
                {question.option3}
              </li>
              <li ref={option4} onClick={(e) => checkanswer(e, 4)}>
                {question.option4}
              </li>
            </ul>
            <button onClick={next} className='btn btn-primary px-5 fw-4'>Next</button>
            <div className="index">
              {index + 1} of {data.length} questions
            </div>
          </>
        )}
      </div>
    </div>
  );
}
 
export default App;

