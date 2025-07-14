import React, { Fragment, useEffect, useState } from 'react'
import { convertSecondToMilliSecond } from '../../utils/time'
import CustomSlideDown from '../SlideDown/SlideDown'
import socketIOClient from 'socket.io-client'
import Countdown from 'react-countdown'

const SingleQuestion = ({
  question,
  questionsLength,
  counterHandler,
  counter,
  socket,
  isSecondsMatch,
}) => {
  const [savedTime, setSavedTime] = useState(0)
  const [isOpen, setIsOpen] = useState(isSecondsMatch)

  const onClickHandler = (questionId, optionIndex = 0) => {
    const answer = optionIndex + 1

    increseCounter()
    counterHandler()

    setIsOpen(false)

    socket.emit('answer', {
      questionId,
      answer,
      savedTime,
    })
  }

  const increseCounter = () => {
    localStorage.setItem('questionsCounter', counter + 1)
  }

  useEffect(() => {
    setIsOpen(isSecondsMatch)
  }, [isSecondsMatch, counter, question])

  return (
    <Fragment>
      <CustomSlideDown isOpen={isOpen && isSecondsMatch}>
        <div className="col-md-12 col-12">
          <div className="row numberOfSoldier">
            <div className="col-md-10 p-3 d-flex">
              <span className="ml-4">
                {counter} از
                {questionsLength}
              </span>
              <div
                dangerouslySetInnerHTML={{
                  __html: question.body,
                }}
              />
            </div>
            <div className="col-md-2">
              <Countdown
                intervalDelay={0}
                daysInHours={false}
                zeroPadTime={0}
                onMount={(prop) => {
                  setSavedTime(prop.seconds)
                }}
                date={
                  Date.now() + convertSecondToMilliSecond(question.time)
                }
                renderer={(props) => (
                  <div className="timer">
                    {`${props.formatted.minutes}:${props.formatted.seconds}`}
                  </div>
                )}
                onComplete={() => {
                  increseCounter()
                  counterHandler()
                  setIsOpen(false)
                }}
              />
            </div>
            <div className="col-md-12 d-flex mt-2 justify-content-center">
              {question.options.map((option, index) => {
                return (
                  <button
                    onClick={() => onClickHandler(question._id, index)}
                    className="answer__button"
                  >
                    <p className="text-white">{option}</p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </CustomSlideDown>
    </Fragment>
  )
}

export default SingleQuestion
