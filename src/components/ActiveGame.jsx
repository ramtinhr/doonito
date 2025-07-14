import React, { Component, useEffect, useState, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import TopBar from './TopBar'
import Popup from './PopUp'
import axiosInstance from '../axios'
import { io } from 'socket.io-client'
import isAuthenticated from '../utils/auth'
import ReactPlayer from 'react-player'
import LottieAnimation from './lottie/LottieAnimation'
import lottie from '../asset/loading.json'
import Questions from './Questions/Questions'
import { convertSecondToMilliSecond } from '../utils/time'

const ActiveGame = () => {
  const [playing, setPlaying] = useState(isAuthenticated)
  const [controls, setControls] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [key, setKey] = useState(1)
  const [contest, setContest] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [delay, setDelay] = useState(0)
  const [socket, setSocket] = useState(null)
  const [isFinished, setIsFinished] = useState(false)
  const [finishedTimeRange, setFinishedTimeRange] = useState(1)
  const [questions, setQuestions] = useState(null)
  const [streamBaseUrl] = useState('http://45.147.77.110:8000')
  const [baseurl] = useState('http://45.147.77.110')
  const [url, setUrl] = useState(null)
  const ref = React.createRef()

  let { id } = useParams()
  const handlePlay = () => {
    setPlaying(true)
    setControls(false)
    const delay = convertSecondToMilliSecond(
      contest.questions.reduce((total, question) => {
        if (
          Number(question.category) ===
          Number(contest.timeQuestionPaire[finishedTimeRange - 1].category)
        ) {
          return total + Number(question.time)
        }
        return total
      }, 0),
    )

    if (finishedTimeRange) setDelay(delay)
  }

  const handleEnded = () => {
    setTimeout(() => {
      if (key !== contest.timeQuestionPaire.length) {
        localStorage.setItem('questionsCounter', 1)
        setKey(key + 1)
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
        }, 100)
      } else {
        setIsFinished(true)
      }
      setQuestions(null)
    }, delay)
  }

  const fetchContenst = async () => {
    await axiosInstance.get(`/client/contest/get/${id}`).then((res) => {
      const { contest } = res.data.content
      setContest(contest)
      contest.isStarted
        ? setUrl(`${streamBaseUrl}${contest.streamUrl}`)
        : setUrl(`${baseurl}${contest.intro}`)
      if (contest.isFinished) {
        setIsFinished(true)
      }
    })
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const setParticipation = async () => {
    const resp = await axiosInstance.get(
      `/client/contest/isParticipanted/${id}`,
    )
    const { content } = resp.data

    if (!content.result) {
      await axiosInstance
        .post(`/client/contest/participation/${id}`)
        .then((_) => { })
        .catch((e) => <Redirect to="/" />)
    }
  }
  const openSocket = () => {
    var options = {
      rememberUpgrade: true,
      transports: ['websocket'],
      secure: true,
      rejectUnauthorized: false,
    }
    const socket = io(`http://45.147.77.110:3000/${id}`, options)

    setSocket(socket)

    
    axiosInstance.get('/client/profile/myDonito').then((resp) => {
      socket.emit('introduce', {
        _id: resp.data.content.user._id,
      })  
    })

    socket.emit('realtimeQuestion')

    socket.on('realtimeQuestion', ({ questions }) => {
      localStorage.setItem('questionsCounter', 1)
      setQuestions(questions)
    })

    socket.on('finished', ({ content, message }) => {
      if (content && content.numberOfFinishedTimeRange) {
        setFinishedTimeRange(content.numberOfFinishedTimeRange)
      }
      if (content._questions?.length) {
        localStorage.setItem('questionsCounter', 1)
        setQuestions(content._questions)
      }
    })
  }

  useEffect(() => {
    localStorage.setItem('questionsCounter', 1)
    if (isAuthenticated()) {
      fetchContenst()
      setParticipation()
      openSocket()
      return () => {
        if (socket) {
          socket.close()
        }
      }
    }
  }, [null])

  return (
    <React.Fragment>
      {isFinished && contest.isStarted ? (
        <Redirect to={`/GameDetail/${id}`} />
      ) : (
        <section className="sectionActiveGame">
          <Popup onClose={onClose} />
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <TopBar />
              </div>
              <div className="col-md-12 col-12">
                <h1 className="station"> {contest?.title}</h1>
              </div>
              <div className="col-md-12 col-12">
                {contest &&
                  !isLoading ? (
                  <ReactPlayer
                    ref={ref}
                    key={key}
                    width="100%"
                    height="100%"
                    className="img-fluid"
                    playing={playing}
                    controls={controls}
                    pip={false}
                    config={{
                      file: {
                        forceFlv: true,
                      },
                    }}
                    previewTabIndex={2}
                    onEnded={handleEnded}
                    onPlay={handlePlay}
                    button={<button>Play</button>}
                    url={url}
                  />
                ) : (
                  <LottieAnimation lotti={lottie} height={560} width={'15%'} />
                )}
              </div>
              {
                contest?.description && !contest?.isStarted ?
                  <p className="text-white mt-5 text-right">{contest.description}</p> : null
              }
              {questions?.length && contest.isStarted ? (
                <Questions
                  questions={questions}
                  id={contest._id}
                  socket={socket}
                  isQuestionReceived={questions.length}
                />
              ) : null}
            </div>
          </div>
        </section>
      )}
    </React.Fragment>
  )
}

export default ActiveGame
