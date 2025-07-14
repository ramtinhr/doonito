import React from 'react'
import Lottie from 'react-lottie'

export default function LottieAnimation({ lotti, width, height , style }) {
  const defaultOptions = {
    autoplay: true,
    animationData: lotti,
  }

  return (
    <div>
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  )
}
