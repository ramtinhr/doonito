import React, { Component } from 'react'
import moment from 'jalali-moment'
import logo from '../asset/img/logo.png'
import 'react-codes-input/lib/react-codes-input.min.css'

class NewPass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curTime: moment(new Date(), 'YY/MM/DD ').locale('fa').format('YY/MM/DD'),
      curH: moment(new Date(), 'h:m').locale('fa').format('h:m'),
      isButtonDisabled: true,
      Vcode: '',
    }
  }

  render() {
    return (
      <React.Fragment>
        <section className="newPassSection">
          <div className="container">
            <div className="newPassBody">
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
                  <div className="col-md-8 m-auto">
                    <div className="row passbox">
                      <input
                        type="password"
                        name="password"
                        placeholder="رمز جدید"
                        id=""
                      />
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="تکرار رمز جدید"
                        id=""
                      />
                    </div>
                  </div>
                  <div className="col-md-12 col mt-5">
                    <input
                      className="sendCodeBtn "
                      type="button"
                      value=" ثبت"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

export default NewPass
