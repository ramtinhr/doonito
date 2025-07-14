import React, { useState, useEffect } from 'react';
import moment from 'jalali-moment';
import logo from '../asset/img/logo.png';
import axiosInstance from '../axios';
import ReactCodesInput from 'react-codes-input';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Link } from 'react-router-dom';
import history from '../history';
import {
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";
import Check from "./../asset/img/check.png"
import lottie from '../asset/loading.json'

import LottieAnimation from "./lottie/LottieAnimation"

const VerificationCode = (props) => {
  const [WORS, setWORS] = useState('success');
  const [url, setUrl] = useState('/');
  const [successFlag, setsuccessFlag] = useState(false);
  const [warningFlag, setwarningFlag] = useState(false);
  const [showSweet, setShowSweet] = useState(false);
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [msgSweet, setMsgSweet] = useState('');
  const [codeVerify, setCodeVerify] = useState('');
  const curTime = moment(new Date(), 'YY/MM/DD ')
    .locale('fa')
    .format('YY/MM/DD');
  const curH = moment(new Date(), 'h:m').locale('fa').format('h:m');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // useEffect(() => {
  //   axios
  //     .post('api/auth/verifyCode')
  //     .then
  //     // (res)=> console.log(res)
  //     ();
  // }, [null]);
  const setCode = async (e) => {
    setCodeVerify(e)
    if (e.toString().length === 5) {

    }
  };


  let location = useLocation();
  useEffect(() => {
    console.log(location, "location")
    if (location.state.originForUrl === "forgetPass") {
      setUrl("/auth/passwordReset/verificationCode")
    }
    if (location.state.originForUrl === "signup") {
      setUrl("/auth/verifyCode")
    }
  }, [])


  const resendCodehandler = async (event) => {
    setLoadingFlag(true)

    await axiosInstance
      .post(url, { code: codeVerify })
      .then((response) => {
        setLoadingFlag(false)
        if (response.status === 200 || response.status === 201) {
          console.log("true")
          setWORS('success');
          setsuccessFlag(true)
          if (location.state.originForUrl === "forgetPass") {
            let msg = (
              <div>
                <img src={Check} alt="مشکل آپلود" style={{ width: '70px' }} />
                <br /> <br />
                کد با موفقیت برای شما ارسال شد  <br /> رمز عبور جدید:  <br /> {response.data.content.newPassword}
              </div>

            )
            setMsgSweet(msg);
          }
          if (location.state.originForUrl === "signup") {
            let msg = (
              <div>
                <img src={Check} alt="مشکل آپلود" style={{ width: '70px' }} />
                <br /> <br />
                عملیات با موفقیت انجام شد
              </div>

            )
            setMsgSweet(msg);
          }
          // console.log(response.data.content.code)
          setShowSweet(true);
        }
      })
      .catch((err) => {
        setLoadingFlag(false)

        //alert("کد ارسال نشد");
        setMsgSweet('کد وارد شده نامعتبر است');
        setShowSweet(true);
        setWORS('warning');
        setwarningFlag(true)
      });
  };
  return (
    <React.Fragment>
      <section className="verificationSection">
        {showSweet ? (
          <SweetAlert
            warning={warningFlag}
            show={showSweet}
            showCloseButton
            style={{
              color: '#fff',
              backgroundColor: ' rgb(182 178 178 / 52%)',
              borderRadius: '30px',
            }}
            title={msgSweet}
            customButtons={
              <React.Fragment>
                <button
                  onClick={() => {
                    if (WORS === "success") {
                      history.replace({
                        pathname: '/signin',
                        state: { routedViaLink: true },
                      })

                    } else {
                      setShowSweet(false)
                    }
                    setsuccessFlag(false)
                    setwarningFlag(false)
                  }}
                  className="alertBtn"
                >
                  باشه
                </button>
              </React.Fragment>
            }
            openAnim={{ name: 'showSweetAlert', duration: 2000 }}
            closeAnim={{ name: 'hideSweetAlert', duration: 2000 }}
          />
        ) : <> </>}

        <div className="container">
          <div className="verificationBody">
            {loadingFlag ? (
              <LottieAnimation
                lotti={lottie}
                height={"70vh"}
                width={"25%"}
              />) : (
              <>
                <div className="row m-0 mt-5 rowTitle">
                  <div className="col-md-6 col-6 text-right text-light">
                    <p> درباره دونیتو</p>
                  </div>
                  <div className="col-md-6 col-6">
                    <p className="text-light p-time">
                      {curTime}
                      <span>{curH}</span>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8 text-center marginBox">
                    <div className="col-md-12">
                      <img src={logo} alt="" className="logo img-fluid" />
                    </div>
                    <div className="col-md-12">
                      <p className="notifMessage">
                        ارسال کد به شماره موبایل شما با موفقیت انجام شد
                      </p>
                    </div>
                    <div className="col-md-12">
                      <p className="enterCodeTxt">کد را وارد کنید</p>
                    </div>
                    <div className="col-md-8 m-auto">
                      <div className="row vCodeBox">
                        <ReactCodesInput
                          initialFocus={true}
                          codeLength={5}
                          type="number"
                          onChange={(e) => {
                            setCode(e);
                          }}
                          customStyleComponent={{
                            maxWidth: '300px',
                            margin: '0 auto',
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-12 col mt-5">
                      <input
                        type="button"
                        value={location.state ? (location.state.originForUrl === "forgetPass" ? "ارسال مجدد کد ثبت نام" : "ارسال کد ثبت نام") : ""}
                        onClick={() => resendCodehandler()}
                        className={
                          !isButtonDisabled
                            ? 'opacity5 sendCodeBtn'
                            : ' sendCodeBtn'
                        }
                      />
                    </div>
                  </div>
                </div>
              </>)}
          </div>
        </div>

      </section>
    </React.Fragment>
  );
};

export default VerificationCode;
