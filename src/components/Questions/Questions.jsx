import React, { Fragment, useEffect, useState } from 'react'
import SingleQuestion from './SingleQuestion'

const Questions = ({ id, questions, isQuestionReceived, socket }) => {
  const [questionsClone, setQuestionsClone] = useState([])
  const [counter, setCounter] = useState(0)

  const counterHandler = () => {
    if (counter !== questions.length) {
      setCounter(counter + 1)
    }
  }

  useEffect(() => {
    const Qcounter = localStorage.getItem('questionsCounter')
      ? JSON.parse(localStorage.getItem('questionsCounter'))
      : 1
    setCounter(Qcounter)
    setQuestionsClone(questions)
  }, [questions, counter])

  return (
    <Fragment>
      {questionsClone.length
        ? questionsClone.map((question, index) => (
            <SingleQuestion
              key={id + index.toString()}
              question={question}
              counterHandler={counterHandler}
              socket={socket}
              counter={counter}
              questionsLength={questionsClone.length}
              isSecondsMatch={isQuestionReceived && counter === index + 1}
            />
          ))
        : null}
    </Fragment>
  )
}

export default Questions
