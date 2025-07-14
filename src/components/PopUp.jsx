// import React from 'react';
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Cookies from 'js-cookie';
// import history from "../history";
import { Link } from 'react-router-dom';
// import axios from 'axios';
const PopUp = (props) => {
  const [showPopUp, setOpenTooltip] = useState(false);
  useEffect(() => {
    let token = Cookies.get('accessToken')
    if (token === undefined || token === false || token === null) {
      setOpenTooltip(true);
    } else if (token.length > 0) {
      setOpenTooltip(false);
    }
  }, [null]);
  return (
    <Popup
      closeOnEscape={false}
      closeOnDocumentClick={true}
      open={showPopUp}
      position="fixed center center"
      modal
      nested
      onClose={()=> props.onClose()}
    >
      {(close) => (
        <div className="text-center">
          <div className="modal-body">
            <p>کاربر مهمان عزیز </p>
            <p>دسترسی به این صفحه نیازمند حساب کاربری است</p>
            <p>برای ورود به حساب کاربری اقدام کنید</p>
          </div>
          <Link to="/signin" onClick={()=>props.onClose()}>
            <p className="messageBtn"> ورود</p>
          </Link>
        </div>
      )}
    </Popup>
  );
};
export default PopUp;
