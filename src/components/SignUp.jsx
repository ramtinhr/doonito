import React, { Component } from 'react'
import logo from '../asset/img/logo.png'
import bg1 from '../asset/img/game2.png'
import moment from 'jalali-moment'
import axiosInstance from '../axios'
import { Link } from 'react-router-dom'
import history from '../history'
import ReactFormValidation from 'react-form-input-validation'
import SweetAlert from 'react-bootstrap-sweetalert'
import lottie from '../asset/loading.json'
import Check from './../asset/img/check.png'

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

class SignUp extends Component {
  constructor(props) {
    super(props)
    // console.log(this.props.url);
    this.state = {
      WORS: 'success',
      showSweet: false,
      successFlag: false,
      warningFlag: false,
      loadingFlag: false,
      msgSweet: '',
      curTime: moment(new Date(), 'YY/MM/DD ').locale('fa').format('YY/MM/DD'),
      curH: moment(new Date(), 'h:m').locale('fa').format('h:m'),
      fields: {
        username: '',
        password: '',
        phoneNumber: '',
      },
      errors: {},
    }

    this.form = new ReactFormValidation(this, { locale: 'fa' })
    this.form.useRules({
      username: 'required|username_available',
      phoneNumber: 'required|numeric|digits:11',
      password: 'required|max:8|min:4',
    })

    this.form.onformsubmit = async (fields) => {
      fields.preventDefault()
      this.setState({ loadingFlag: true })
      const params = {
        username: this.state.fields.username,
        password: this.state.fields.password,
        phoneNumber: this.state.fields.phoneNumber,
      }

      axiosInstance
        .post(`/auth/register`, params)
        .then((response) => {
          this.setState({ loadingFlag: false })
          if (response.data.status === 200 || response.data.status === 201) {
            this.setState({ WORS: 'success' })
            this.setState({ successFlag: true })
            let msg = (
              <div>
                <img src={Check} alt="مشکل آپلود" style={{ width: '70px' }} />
                <br /> <br />
                <div>
                  ثبت نام با موفقیت انجام شد <br /> کد ورود شما: <br />{' '}
                  {response.data.content.code}{' '}
                </div>
              </div>
            )
            this.setState({ msgSweet: msg })
            this.setState({ showSweet: true })
          } else {
            this.setState({ WORS: 'warning' })
            this.setState({ warningFlag: true })
            this.setState({ msgSweet: 'مشکلی پیش آمده است' })
            this.setState({ showSweet: true })
            // console.log(response.data);
          }
        })
        .catch((e) => {
          this.setState({ loadingFlag: false })

          this.setState({ WORS: 'warning' })
          this.setState({ warningFlag: true })
          this.setState({ msgSweet: 'شما قبلا ثبت نام کرده اید' })
          this.setState({ showSweet: true })
        })
    }

    // another bug here
    ReactFormValidation.registerAsync(
      'username_available',
      function (username, attribute, req, passes) {
        setTimeout(() => {
          if (username === 'foo') passes(false, 'نام کاربری تکراری است')
          // if username is not available
          else passes()
        }, 1000)
      },
    )
  }

  render() {
    return (
      <div>
        <section className="signUpSection">
          {this.state.showSweet ? (
            <SweetAlert
              warning={this.state.warningFlag}
              show={this.state.showSweet}
              closeOnClickOutside={false}
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
                  <button
                    onClick={() => {
                      if (this.state.WORS === 'success') {
                        history.replace({
                          pathname: '/verificationcode',
                          state: {
                            routedViaLink: true,
                            originForUrl: 'signup',
                          },
                        })
                      }
                      this.setState({
                        warningFlag: false,
                        successFlag: false,
                        showSweet: false,
                      })
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
            <LottieAnimation lotti={lottie} height={'90vh'} width={'25%'} />
          ) : (
            <div className="container">
              <div className=" signUpBody rtl">
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
                        <img src={logo} className="img-fluid w-50" alt="logo" />
                      </h1>

                      <form
                        noValidate
                        autoComplete="off"
                        onSubmit={this.form.onformsubmit}
                      >
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

                          <input
                            type="text"
                            name="username"
                            onBlur={this.form.handleBlurEvent}
                            onChange={this.form.handleChangeEvent}
                            value={this.state.fields.username}
                            // To override the attribute name
                            data-attribute-name="username"
                            // data-async
                            placeholder="نام کاربری"
                          />
                          <label className="error">
                            {this.state.errors.username
                              ? this.state.errors.username
                              : ''}
                          </label>
                        </div>

                        <div className="form-item">
                          <input
                            type="tel"
                            name="phoneNumber"
                            onBlur={this.form.handleBlurEvent}
                            onChange={this.form.handleChangeEvent}
                            value={this.state.fields.phoneNumber}
                            placeholder="شماره تلفن"
                          />
                          <label className="error">
                            {this.state.errors.phoneNumber
                              ? this.state.errors.phoneNumber
                              : ''}
                          </label>
                        </div>
                        <div className="form-item">
                          <input
                            type="password"
                            name="password"
                            minLength="4"
                            maxLength="8"
                            value={this.state.fields.password}
                            onChange={this.form.handleChangeEvent}
                            onBlur={this.form.handleBlurEvent}
                            autoComplete="okay"
                            placeholder="رمز عبور"
                          />
                        </div>
                        <label className="error">
                          {this.state.errors.password
                            ? this.state.errors.password
                            : ''}
                        </label>

                        <div className="button-panel">
                          <input
                            type="submit"
                            className="button"
                            title="submit"
                            value="ثبت نام"
                          />
                        </div>
                      </form>
                      {/* </ValidationForm> */}
                      <div className="form-footer">
                        <p>
                          <Link to="/signin">حساب کاربری دارید؟</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    )
  }
}

export default SignUp
