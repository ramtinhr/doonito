import React, { useEffect, useState, Fragment } from 'react'
import axiosInstance from '../../axios'
import LottieAnimation from '../lottie/LottieAnimation'
import lottie from '../../asset/loading.json'

const GameDetailTable = ({ isLoading, topUsers }) => {
  return (
    <Fragment>
      {isLoading ? (
        <div className="d-flex justify-content-center align-center gameDetailLoading">
          <LottieAnimation lotti={lottie} width="100px" height="100%" />
        </div>
      ) : (
        <table
          className="game-detail-table w-100"
          cellPadding="0"
          cellSpacing="0"
          border="0"
        >
          <thead>
            <th className="text-right">نفرات برتر</th>
            <th></th>
            <th className="text-lightgreen">امتیاز</th>
          </thead>
          <tbody>
            {topUsers?.map((topUser, index) => (
              <tr key={index}>
                <td className="text-right">
                  {topUser.user.firstName} {topUser.user.lastName}
                </td>
                <td className="text-center">
                  {topUser.user.phoneNumber.slice(9, 11)}*****
                  {topUser.user.phoneNumber.slice(0, 4)}
                </td>
                <td>{topUser.user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Fragment>
  )
}

export default GameDetailTable
