import React, { Component } from 'react';
import moment from 'jalali-moment';
import logo from '../asset/img/logo.png';
import 'react-codes-input/lib/react-codes-input.min.css';
// let url = " http://45.147.77.110:5000/api/";
import Check from "./../asset/img/check.png"
import LottieAnimation from "./lottie/LottieAnimation"
import axiosInstance from '../axios';
import history from '../history';
import SweetAlert from 'react-bootstrap-sweetalert';
import lottie from '../asset/loading.json'




class ForgetPass extends Component {
  constructor() {
    super();
    this.state = {
      curTime: moment(new Date(), 'YY/MM/DD ').locale('fa').format('YY/MM/DD'),
      curH: moment(new Date(), 'h:m').locale('fa').format('h:m'),
      isButtonDisabled: true,
      Vcode: '',
      phone: '',
      WORS: '',
      msgSweet: '',
      showSweet: false,
      successFlag: false,
      warningFlag: false,
      loadingFlag: false
    };
  }

  resend() {
    const params = {
      phoneNumber: this.state.phone,
    };
    axiosInstance
      .post(`/auth/passwordReset/sendSMS`, params)
      .then((response) => {
        this.setState({ loadingFlag: false })
        if (response.status === 200 || response.status === 201) {
          this.setState({ WORS: 'success' });
          let msg = (
            <div>
              <img src={Check} alt="مشکل آپلود" style={{ width: '70px' }} />
              <br /> <br /> کد با موفقیت برای شما ارسال شد  <br /> کد ارسالی شما:  <br /> {response.data.content.code}
            </div>

          )
          this.setState({ msgSweet: msg });
          this.setState({ showSweet: true });
          this.setState({ successFlag: true });
        }
        else {
          this.setState({ WORS: 'warning' });
          this.setState({ msgSweet: 'عملیات با مشکل مواجه شد' });
          this.setState({ showSweet: true });
          this.setState({ warningFlag: true });

          // console.log(response.data);
        }
      })
      .catch(() => {
        this.setState({ loadingFlag: false })
        this.setState({ WORS: 'warning' });
        this.setState({ msgSweet: 'عملیات با مشکل مواجه شد' });
        this.setState({ showSweet: true });
        this.setState({ warningFlag: true });

      });
  }

  getPhone(e) {
    this.setState({ phone: e.target.value });

  }

  render() {
    return (
      <React.Fragment>
        {this.state.showSweet ? (
          <SweetAlert
            show={this.state.showSweet}
            closeOnClickOutside={false}
            warning={this.state.warningFlag}
            // showCancel
            // confirmBtnText="باشه"
            // confirmBtnBsStyle={'linear-gradient(45deg,#e90f0f,#efb204'}
            style={{
              color: '#fff',
              backgroundColor: ' rgb(182 178 178 / 52%)',
              borderRadius: '30px',
            }}
            title={this.state.msgSweet}
            onConfirm={() => this.setState({ showSweet: false })}
            onCancel={() => this.setState({ showSweet: false })}
            customButtons={
              <React.Fragment>

                <button onClick={() => {
                  if (this.state.WORS === "success") {
                    history.replace({
                      pathname: '/verificationcode',
                      state: { routedViaLink: true, originForUrl: "forgetPass" },
                    })

                  } else {
                    this.setState({ showSweet: false })
                  }
                  this.setState({ warningFlag: false, successFlag: false });
                }

                } className="alertBtn">
                  باشه
                </button>

              </React.Fragment>
            }
            openAnim={{ name: 'showSweetAlert', duration: 2000 }}
            closeAnim={{ name: 'hideSweetAlert', duration: 2000 }}
          />
        ) : <></>}
        <section className="forgetPassSection">
          <div className="container">
            <div className="forgetPassBody">


              {this.state.loadingFlag ? (
                <LottieAnimation
                  lotti={lottie}
                  height={"65vh"}
                  width={"25%"}
                  style={{}}
                />
              ) : <>

                <div className="row m-0 mt-5 rowTitle">
                  <div className="col-md-6 col-6 text-right text-light">
                    <p> درباره دونیتو</p>
                  </div>
                  <div className="col-md-6 col-6">
                    <p className="text-light p-time">
                      {this.state.curTime}
                      <span>{this.state.curH}</span>
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-8 text-center marginBox">
                    <div className="col-md-12">
                      <img src={logo} alt="" className="logo img-fluid" />
                    </div>
                    <div className="col-md-12">
                      <p className="notifMessage">رمز خود را فراموش کرده اید ؟</p>
                    </div>
                    <div className="col-md-8 m-auto">
                      <div className="row passbox">
                        <input
                          type="tel"
                          name="phoneNumber"
                          placeholder="شماره تلفن"
                          id=""
                          onChange={(e) => { this.getPhone(e) }}
                        />
                      </div>
                    </div>
                    <div className="col-md-12 col mt-5">
                      <input
                        className="sendCodeBtn "
                        type="button"
                        value="ارسال کد"
                        onClick={() => {
                          this.setState({ loadingFlag: true })
                          this.resend()
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>}

            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default ForgetPass;
