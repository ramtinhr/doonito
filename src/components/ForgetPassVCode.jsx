import React, { Component } from 'react';
import moment from 'jalali-moment';
import logo from '../asset/img/logo.png';
import axios from 'axios';
import ReactCodesInput from 'react-codes-input';
import 'react-codes-input/lib/react-codes-input.min.css';

class ForgetPassVCode extends Component {
  state = {
    curTime: moment(new Date(), 'YY/MM/DD ').locale('fa').format('YY/MM/DD'),
    curH: moment(new Date(), 'h:m').locale('fa').format('h:m'),
    isButtonDisabled: true,
    Vcode: '',
  };

  setCode = (e) => {
    console.log(e);
    if (e.toString().length === 5) {
      setTimeout(() => this.setState({ isButtonDisabled: false }), 30000);
      axios
        .post('auth/verifyCode')
        .then((res) => {
          if (res.status === 201) {
            // history.push("/");
          }
          console.log(res);
          console.log(res.data);
        })
        .catch((res) => {
          alert('کد وارد شده صحیح نیست');
          console.log(res);
        });
    }
  };

  resendCodehandler = () => {
    axios
      .post('auth/verifyCode')
      .then((res) => {
        if (res.status === 200) {
          // history.push("/");
          alert('کد ارسال شد ');
        }
        console.log(res);
        console.log(res.data);
      })
      .catch((res) => {
        alert('کد وارد شده صحیح نیست');
        console.log(res);
      });
  };

  render() {
    return (
      <React.Fragment>
        <section className="forgetPassVCodeSection">
          <div className="container">
            <div className="forgetPassVCodeBody">
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
                    <p className="notifMessage">
                      شماره موبایل شما{' '}
                      <span className="phoneNumber">09121218176</span>
                    </p>
                  </div>
                  <div className="col-md-12">
                    <p className="enterCodeTxt">کد را وارد کنید</p>
                  </div>
                  <div className="col-md-8 m-auto">
                    <div className="row vCodeBox">
                      <ReactCodesInput
                        initialFocus={false}
                        codeLength={5}
                        type="number"
                        hide={false}
                        placeholder=""
                        onChange={(e) => {
                          this.setCode(e);
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
                      disabled={this.state.isButtonDisabled}
                      type="button"
                      value="ارسال مجدد کد ثبت نام"
                      onClick={this.resendCodehandler}
                      className={
                        this.state.isButtonDisabled
                          ? 'opocity5 sendCodeBtn'
                          : ' sendCodeBtn'
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default ForgetPassVCode;
