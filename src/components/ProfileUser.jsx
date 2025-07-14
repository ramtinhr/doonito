import React, { Component, useEffect, useState } from 'react'
import top from '../asset/img/top01.svg'
import TopBar from './TopBar'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import LottieAnimation from './lottie/LottieAnimation'
import lottie from '../asset/loading.json'
import axiosInstance from '../axios'
import { dayOfWeek } from '../utils/date'
import Popup from './PopUp'

const ProfileUser = () => {
  const [userInfo, setUseInfo] = useState([])
  const [isLoading, setIsLoading] = useState([])
  const [scores, setScores] = useState([])

  const getMyDonito = async () => {
    setIsLoading(true)
    const resp = await axiosInstance.get('/client/profile/myDonito')
    setUseInfo(resp.data.content)
    setIsLoading(false)
  }

  const calculateContestScore = (id) => {
    return scores.length
  }

  useEffect(() => {
    getMyDonito()
  }, [null])

  return (
    <React.Fragment>
      <section className="profileSection">
        <div className="container">
          {isLoading ? (
            <div className="data__loading">
              <LottieAnimation lotti={lottie} width="200px" height="60vh" />
            </div>
          ) : (
            <div className="row">
              <div className="col-md-12 col-12">
                <TopBar />
              </div>
              <div className="col-md-6 col-6  mt-5">
                <span className="userName"></span>
              </div>
              <div className="col-md-6 col-6"></div>
              <div className="col-md-6 col-12 totalInfo">
                <div className="row h-100">
                  <div className="col-md-12 col-12">
                    <div className="row">
                      <div className="col-md-12 col-12 text-center p-3 m-0">
                        <Link to="/EditProfile" className="editPro">
                          ویرایش پروفایل شخصی
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-12 pt-4 pb-4">
                    <div className="row">
                      <div className="col-md-6 col-6 align-self-center">
                        <p className="mb-0"> تعداد بازی</p>
                      </div>
                      <div className="col-md-6 col-6 text-left">
                        <p className="mb-0">{userInfo.userContests.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-12 pt-4 pb-4">
                    <div className="row">
                      <div className="col-md-6 col-6 align-self-center">
                        <p className="mb-0">موجودی قابل دریافت</p>
                      </div>
                      <div className="col-md-6 col-6 text-left">
                        <p className="takeMony mb-0">
                          {parseInt(userInfo.user.wallet) > 0
                            ? userInfo.user.wallet
                            : 0}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-12">
                    <div className="row">
                      <div className="col-md-6 col-6 align-self-center">
                        <p className="mb-0">مبلغ دریافت شده </p>
                      </div>
                      <div className="col-md-6 col-6 text-left mb-0">
                        <p className="amountreceived">
                          {parseInt(userInfo.user.wallet) > 0
                            ? userInfo.user.wallet
                            : 0}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-12 userStation">
                    <div className="row">
                      <div className="col-md-6 col-6 align-self-center">
                        <p className="mb-0">جایگاه شما نسبت به نفرات برتر</p>
                      </div>
                      <div className="col-md-6 col-6 text-left">
                        <img
                          src={top}
                          className="img-fluid img-topUser"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 ">
                <div className="row">
                  <div className="col-md-12 infoGameBox">
                    <div className="row">
                      <div className="col-md-6 col-6 text-right align-self-center">
                        <p className="m-0">بازی های شما</p>
                      </div>
                      <div className="col-md-6 col-6 text-left align-self-center">
                        <p className="m-0">امتیاز</p>
                      </div>
                      <hr />
                      <div className="col-md-12 gameDateBox">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-12 col-12 text-right">
                              <div className="topPeopletbl-content">
                                <table
                                  className="topPeopleTbl w-100"
                                  cellPadding="0"
                                  cellSpacing="0"
                                  border="0"
                                >
                                  <tbody>
                                    {userInfo.userContests.length
                                      ? userInfo.userContests.map(
                                          (userContest, index) => {
                                            return (
                                              <tr key={index}>
                                                <td className="pb-4">
                                                  {dayOfWeek(
                                                    userContest.contest
                                                      .timestamp,
                                                  )}
                                                </td>
                                                <td className="pb-4">
                                                  {userContest.contest.date}
                                                </td>
                                                <td className="pb-4">
                                                  {userInfo.contestUserScore.reduce(
                                                    (total, contest) => {
                                                      if (
                                                        contest.contest ===
                                                        userContest.contest._id
                                                      ) {
                                                        return (
                                                          total +
                                                          contest.user.score
                                                        )
                                                      }
                                                    },
                                                    0,
                                                  )}
                                                </td>
                                              </tr>
                                            )
                                          },
                                        )
                                      : 'در حال حاظر هیچ بازیی ثبت نشده'}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </React.Fragment>
  )
}

export default ProfileUser
