import React, { Component } from 'react'
import moment from 'jalali-moment'
import Countdown from 'react-countdown'
import { useState, useEffect } from 'react'
import axiosInstance from '../axios'

const TopBar = () => {
  const curTime = moment(new Date(), 'YY/MM/DD ').locale('fa').format('YY/MM/DD')
  const curH = moment(new Date(), 'h:m').locale('fa').format('h:m')
  const [timestamp, setTimestamp] = useState(null)

  const fetchLastContest = () => {
    axiosInstance.get(`/client/contest/last`).then((res) => {
      if (res.data.content.contest) {
        setTimestamp(res.data.content.contest.timestamp)
      }
    })
  }

  useEffect(() => {
    fetchLastContest()
  }, [null])

  return (
    <div className="col-md-12 col-12 d-flex justify-content-end">
      <div className="topbar-box">
        <p className="text-light p-time">
          {curTime}
          <span className="ml-2">{curH}</span>
        </p>
      </div>
      <div className="topbar-box mr-4">
        {
          timestamp && timestamp > Date.now() ?
            <div className="topbar-box-countdown">
              <Countdown
                intervalDelay={0}
                daysInHours={true}
                zeroPadTime={0}
                date={
                  timestamp
                }
              />
              <span className="mr-2"> تا شروع بازی </span>
            </div>
            : null
        }
      </div>
    </div>
  )
}

export default TopBar
