import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import TopBar from '../components/TopBar'
import GameDetailTable from '../components/GameDetail/GameDetailTable'
import axiosInstance from '../axios'

const GameDetail = () => {
  let { id } = useParams()
  const [contestDetail, setContestDetail] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchContest = async () => {
    setIsLoading(true)
    await axiosInstance.get(`/client/contest/details/${id}`).then((resp) => {
      setContestDetail(resp.data.content)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    fetchContest()
  }, [null])

  return (
    <section className="gameInfoSection">
      <div className="container">
        <TopBar />
        <div className="row rowContent mt-5 pb-5 pt-5">
          <div className="col-md-12 col-12">
            <div className="row">
              <div className="col-md-12 col-12 pb-4">
                <h2 className="text-center">پایان مسابقه</h2>
              </div>
            </div>
          </div>
          <div className="col-6 pl-5">
            <span>تعداد سوالات درست {contestDetail?.myDetails?.user.correct}</span>
          </div>
          <div className="col-6 text-right pr-5">
            <span>تعداد سوالات نادرست {contestDetail?.myDetails?.user.wrong}</span>
          </div>
          <div className="col-md-12 text-center pt-4 pb-4">
            <h2 className="text-lightgreen">
              امتیاز شما در این بازی {contestDetail?.myDetails?.user.score}
            </h2>
          </div>
          <div className="col-md-6 m-auto">
            <GameDetailTable
              contestId={id}
              topUsers={contestDetail?.topUsers}
              isLoading={isLoading}
            />
          </div>
          <div className="col-12 text-center pt-5">
            <p>
              لطفا برای دیدن نتایج و پاسخ درست سوالات به صفحه{' '}
              <Link
                to="#"
                onClick={() => {
                  this.checkLogin('/GameInfo')
                }}
              >
                <span className="text-yellow mr-1 ml-1">نتایج</span>
              </Link>
              دونیتو مراجعه کنید
            </p>
            <button className="btn-donito mt-4">
              <Link to="/">
                <span className="text-white">بازگشت به صفحه اصلی</span>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GameDetail
