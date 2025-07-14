import React from 'react'

import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

const CustomSlideDown = (props) => {
  return (
    <SlideDown className={'my-dropdown-slidedown'}>
      {props.isOpen ? props.children : null}
    </SlideDown>
  )
}

export default CustomSlideDown
