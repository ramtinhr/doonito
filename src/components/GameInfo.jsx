import React, { Component, useEffect, useState } from 'react'
import TopBar from './TopBar'
import axiosInstance from '../axios'
import LottieAnimation from './lottie/LottieAnimation'
import lottie from '../asset/loading.json'
import { dayOfWeek } from '../utils/date'
import Popup from './PopUp'
import socketIOClient from 'socket.io-client'

const GameInfo = () => {
  const [contests, setContests] = useState([])
  const [userDetails, setUserDetails] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [price, setPrice] = useState(0)
  const [isDetailLoading, setIsDetailLoading] = useState(false)

  const fetchContestDetail = async (id) => {
    if (!isDetailLoading && contests.length > 0) {
      setIsDetailLoading(true)
    }
    const resposne = await axiosInstance.get(`/client/contest/details/${id}`)
    await setUserDetails(resposne.data.content.contetUserScores)
    setIsDetailLoading(false)
  }

  const fetchContenstList = async () => {
    setIsLoading(true)
    setIsDetailLoading(true)
    const resposne = await axiosInstance.get(`/client/contest/list`)
    const contests = resposne.data.content.contests.docs
    contests.forEach((contest, index) => {
      index === 0 ? (contest.isSelected = true) : (contest.isSelected = false)
    })
    setContests(contests)
    const docs = resposne.data.content.contests.docs[0]
    if (docs && docs.length) {
      setPrice(docs.price)
      const id = docs._id
      contestSocket(id)
      fetchContestDetail(id)
    } else {
      setIsDetailLoading(false)
    }
    setIsLoading(false)
  }

  const contestSocket = (id) => {
    var options = {
      rememberUpgrade: true,
      transports: ['websocket'],
      secure: true,
      rejectUnauthorized: false,
    }
    const socket = socketIOClient(`http://45.147.77.110:3000/${id}`, options)

    socket.emit('getUsers')

    socket.on('getUsers', (data) => {
      console.log(data)
    })
  }

  const selectContest = async (index) => {
    const selectedIndex = contests.findIndex((contest) => contest.isSelected)
    contests[selectedIndex].isSelected = false
    contests[index].isSelected = true
    setContests(contests)
    setPrice(contests[index].price)
    if (selectedIndex !== index) {
      await fetchContestDetail(contests[index]._id)
    }
  }

  const searchDetail = (e) => {
    if (e.target.value) {
      const filteredDetails = userDetails.filter(
        (detail) =>
          detail.user.firstName.includes(e.target.value) ||
          detail.user.firstName.includes(e.target.value),
      )
      setUserDetails(filteredDetails)
    } else {
      const index = contests.findIndex((contest) => contest.isSelected)
      fetchContestDetail(contests[index]._id)
    }
  }

  useEffect(() => {
    fetchContenstList()
  }, [null])

  return (
    <React.Fragment>
      <section className="gameInfoSection">
        <Popup />
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <TopBar />
            </div>
            <div className="col-md-12">
              {price ? (
                <p className="txtTitle1">
                  مبلغ این بازی <span> {price / 1000000} میلیون</span> میباشد.
                </p>
              ) : null}

              <p className="txtTitle2">
                {' '}
                این مبلغ بین برندگان بازی تقسیم خواهد شد.
              </p>
              <div className="row rowContent">
                <div className="col-md-4 col-12 dayG">
                  <div className="row">
                    <div className="col-md-12 col-12 ">
                      <h1 className="text-right">روز بازی</h1>
                      <div className="daytbl-content">
                        {!contests.length && !isLoading ? (
                          <p className="m-auto h-100 text-center noGame">
                            در حال حاضر بازیی انجام نشده است
                          </p>
                        ) : isLoading ? (
                          <div className="h-100 d-flex justify-content-center align-center">
                            <LottieAnimation
                              lotti={lottie}
                              width="80px"
                              height="100%"
                            />
                          </div>
                        ) : (
                          <table
                            className="dayTbl"
                            cellPadding="0"
                            cellSpacing="0"
                            border="0"
                          >
                            <tbody>
                              {contests.map((contest, index) => (
                                <tr
                                  onClick={() => selectContest(index)}
                                  className={
                                    contest.isSelected
                                      ? 'game__days-active'
                                      : null
                                  }
                                  key={index}
                                >
                                  <td>{dayOfWeek(contest.timestamp)}</td>
                                  <td>{contest.date}</td>
                                  <td>{contest.time}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12 col-12 informationBox">
                      <h6 className="titleInformation">
                        تعداد شرکت کنندگان بازی
                      </h6>
                      <p className="infoPlaceholder">
                        <span className="numberOfGamers">0</span>
                      </p>
                      <h6 className="titleInformation">رتبه شما</h6>
                      <p className="infoPlaceholder">
                        <span className="userScore">0</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-8 col-12 topPeople">
                  <div className="topTbl-header">
                    <table
                      className="topPeopleTbl"
                      cellPadding="0"
                      cellSpacing="0"
                      border="0"
                      data-filter="#filter"
                    >
                      <thead>
                        <tr>
                          <th>
                            <h6>نفرات برتر</h6>
                          </th>
                          <th colSpan="2">
                            <input
                              onChange={(e) => searchDetail(e)}
                              type="text"
                              className="searchTbl form-control input-sm m-b-xs"
                              id="filter"
                              placeholder="جست و جو بازیکن "
                            />
                          </th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <div className="topPeopletbl-content">
                    {!userDetails?.length && !isDetailLoading ? (
                      <h3 className="m-auto h-100 text-center noGame">
                        بازیکنی در این بازی شرکت نکرده است
                      </h3>
                    ) : isLoading || isDetailLoading ? (
                      <div className="h-100 d-flex justify-content-center align-center">
                        <LottieAnimation
                          lotti={lottie}
                          width="110px"
                          height="100%"
                        />
                      </div>
                    ) : (
                      <table
                        className="topPeopleTbl"
                        cellPadding="0"
                        cellSpacing="0"
                        border="0"
                      >
                        <tbody>
                          {userDetails.map((userDetail, index) => (
                            <tr key={index}>
                              <td>
                                {userDetail.user.firstName}{' '}
                                {userDetail.user.lastName}
                              </td>
                              <td>{userDetail.user.phoneNumber}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="row my-5">
                                    <h1>جواب سوال ها</h1>
                                    <table className='questionTbl'
                                           cellPadding="0" cellSpacing="0"
                                           border="0">
                                        <tbody>
                                        {Array.from({length: 7}).map((_, index) => (
                                            <tr key={index}>
                                                <td>{index + ' - '}</td>
                                                <td colSpan='2'
                                                    className='questionS'> بلندترین
                                                    استخوان پا کدام است؟
                                                </td>
                                                <td><p className='border-green'>ران </p></td>
                                                <td><p>ستون فقرات </p></td>
                                                <td><p>ساق پا </p></td>
                                                <td><p>بازو </p></td>
                                            </tr>
                                        ))}

                                        </tbody>
                                    </table>
                                </div> */}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default GameInfo
