import React, { Component } from 'react'
import moment from 'jalali-moment'
import logo from '../asset/img/logo.png'
import bg1 from '../asset/img/game2.png'
import axiosInstance from '../axios'
import { Link } from 'react-router-dom'
import history from '../history'
import Cookies from 'js-cookie'
import isAuthenticated from '../utils/auth'
import SweetAlert from 'react-bootstrap-sweetalert'
import tick from '../asset/img/tick_icon.svg'
import Check from './../asset/img/check.png'
import lottie from '../asset/loading.json'

import LottieAnimation from './lottie/LottieAnimation'

const options = [
  {
    label: 'فارسی',
    value: 'فارسی',
  },
  {
    // label: "English",
    // value: "english",
  },
]

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      WORS: 'success',
      showSweet: false,
      msgSweet: '',
      isLogin: false,
      curTime: moment(new Date(), 'YY/MM/DD ').locale('fa').format('YY/MM/DD'),
      curH: moment(new Date(), 'h:m').locale('fa').format('h:m'),
      phoneNumber: '',
      password: '',
      passwordError: '',
      phoneNumberError: '',
      redirect: null,
      rememberMe: false,
      warningFlag: false,
      loadingFlag: false,
      successFlag: false,
    }
  }

  componentDidMount() {
    if (isAuthenticated()) {
      history.push('/')
    }

    const phoneNumber = JSON.parse(localStorage.getItem('phoneNumber'))
    // (phoneNumber)
    this.setState({ phoneNumber })
  }

  validateMobile(mobile) {
    const pattern = /(09)[0-9]{9}/
    const result = pattern.test(mobile)
    console.log(result, 'result')
    console.log(mobile, 'mobile')

    if (result) {
      this.setState({
        phoneNumberError: false,
      })
      return true
    } else {
      this.setState({
        phoneNumberError: true,
      })
      return false
    }
  }

  handleSignIn = async (event) => {
    event.preventDefault()
    localStorage.setItem('phoneNumber', JSON.stringify(this.state.phoneNumber))
    if (!this.state.password) {
      this.setState({ WORS: 'warning' })
      this.setState({ msgSweet: 'فیلد خالی رو لطفا پرکنید' })
      this.setState({ showSweet: true })
      this.setState({ passwordError: 'رمز خود را بدرستی وارد کنید' })
      this.setState({ warningFlag: true })
      return
    }

    if (!this.state.phoneNumber) {
      this.setState({ WORS: 'warning' })
      this.setState({ msgSweet: 'فیلد خالی رو لطفا پرکنید' })
      this.setState({ showSweet: true })
      this.setState({ warningFlag: true })
      this.setState({ phoneNumberError: 'شماره تلفن خود را بدرستی وارد کنید' })
      return
    }

    if (!this.validateMobile(this.state.phoneNumber)) {
      this.setState({ WORS: 'warning' })
      this.setState({ warningFlag: true })
      this.setState({ msgSweet: 'شماره تلفن وارد شده اشتباه است' })
      this.setState({ showSweet: true })
      this.setState({ phoneNumberError: 'شماره تلفن وارد شده اشتباه است' })
      return
    }
    const params = {
      phoneNumber: this.state.phoneNumber,
      password: this.state.password,
    }
    this.setState({ loadingFlag: true })

    axiosInstance
      .post(`/auth/login`, params)
      .then((res) => {
        this.setState({ loadingFlag: false, successFlag: true })
        const token = res.data.content.token
        Cookies.set('accessToken', token, { expires: 6 / 24 })
        if (res.data.title !== 'error endpoint') {
          this.setState({ WORS: 'success' })
          let msg = (
            <div>
              <img src={Check} alt="مشکل آپلود" style={{ width: '70px' }} />
              <br /> <br />
              به دونیتو خوش آمدید
            </div>
          )
          this.setState({ msgSweet: msg })
          this.setState({ showSweet: true })
          localStorage.setItem(
            'userPackages',
            JSON.stringify(res.data.content.userPackages),
          )
          // setTimeout(() => {
          //   window.location.replace('/')
          // }, 1000);
        }
        if (this.state.rememberMe) {
          Cookies.set('accessToken', token, { expires: 7 })
        }
      })
      .catch((err) => {
        this.setState({ loadingFlag: false, successFlag: false })
        this.setState({ WORS: 'warning' })
        this.setState({ warningFlag: true })
        this.setState({ msgSweet: 'نام کاربری یا رمز عبور اشتباه است' })
        this.setState({ showSweet: true })
      })
  }

  render() {
    return (
      <React.Fragment>
        <section className="signInSection">
          {this.state.showSweet ? (
            <SweetAlert
              warning={this.state.warningFlag}
              show={this.state.showSweet}
              closeOnClickOutside={false}
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
                  <button
                    onClick={() => {
                      if (this.state.warningFlag) {
                        this.setState({
                          successFlag: false,
                          warningFlag: false,
                          showSweet: false,
                          loadingFlag: false,
                        })
                      }
                      if (this.state.successFlag) {
                        window.location.replace('/')
                      }
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
          ) : (
            <></>
          )}

          {this.state.loadingFlag ? (
            <LottieAnimation lotti={lottie} height={'120vh'} width={'25%'} />
          ) : (
            <div className="container">
              <div className=" signInBody">
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
                  <div className="col-md-7 col-12 text-center place-self-centrer img-game">
                    <img src={bg1} className="img-fluid" alt="" />
                  </div>
                  <div className="col-md-5 col-12 text-center">
                    <div className="form-wrapper">
                      <h1>
                        <img
                          src={logo}
                          className="img-fluid  w-50"
                          alt="logo"
                        />
                      </h1>
                      <form className="mt-2" onSubmit={this.handleSignIn}>
                        <div className="form-item">
                          <div className="select-container">
                            <select className="selectLang">
                              {options.map((option, i) => (
                                <option key={i} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <label htmlFor="tel" />
                          <input
                            type="tel"
                            name="phoneNumber"
                            className={`${
                              this.state.phoneNumberError ? 'error' : ''
                            }`}
                            placeholder={
                              this.state.phoneNumberError ||
                              'شماره تلفن خود را  وارد کنید'
                            }
                            value={this.state.phoneNumber}
                            onChange={(event) =>
                              this.setState({ phoneNumber: event.target.value })
                            }
                          />
                        </div>
                        <div className="form-item">
                          <label htmlFor="password" />
                          <input
                            type="password"
                            name="password"
                            className={`${
                              this.state.passwordError ? 'error' : ''
                            }`}
                            placeholder={
                              this.state.passwordError || 'رمز خود را وارد کنید'
                            }
                            value={this.state.password}
                            onChange={(event) =>
                              this.setState({ password: event.target.value })
                            }
                          />
                        </div>

                        <div className="row mt-2">
                          <div className="form-group">
                            <input
                              id="remember"
                              checked={this.state.rememberMe}
                              onChange={(e) => {
                                this.setState({ rememberMe: e.target.checked })
                              }}
                              type="checkbox"
                            />
                            <label htmlFor="remember" id="rlabel">
                              مرا بخاطر بسپار
                            </label>
                          </div>
                          <p className="forgetP">
                            <Link to="/ForgetPass">
                              رمز خود را فراموش کرده ای ؟
                            </Link>
                          </p>
                        </div>

                        <div className="button-panel">
                          <input
                            type="submit"
                            className="button"
                            title="Sign In"
                            value="ورود"
                            onSubmit={this.handleSignIn}
                          />
                        </div>
                      </form>
                      <div className="form-footer">
                        <p>
                          <Link to="/signup">هنوز ثبت نام نکردی؟</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </React.Fragment>
    )
  }
}

export default SignIn
