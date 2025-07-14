import React, { Component } from 'react'
import QUESTION from '../asset/img/QUESTION.svg'
import OPTIONS from '../asset/img/OPTIONS.svg'
import twitter from '../asset/img/twitter.svg'
import whatsapp from '../asset/img/whatsapp.svg'
import instagram from '../asset/img/instagram.svg'
import footerE from '../asset/img/footer-1e5dab5a.png'
import footerE2 from '../asset/img/footer-1114.png'
import c from '../asset/img/c.svg'
import facebook from '../asset/img/facebook.svg'
import { Link } from 'react-router-dom'
import isAuth from '../utils/auth.js'

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <footer className="page-footer font-small teal pt-4">
          <div className="container text-center text-md-left">
            <div className="row">
              <div className="col-md-3 col-6 mt-md-0 mt-3">
                <div className="row questionBox">
                  <img src={QUESTION} alt="" />
                  <Link to={isAuth() ? '/Ticket' : '#'}>
                    <p>سوالی دارید؟</p>
                  </Link>
                </div>
                <div className="row">
                  <div className="col-md-6 col-6 links-footer">
                    <img src={OPTIONS} alt="" />
                    <a href="/">نحوه بازی</a>
                  </div>
                  <div className="col-md-6 col-6 links-footer">
                    <img src={OPTIONS} alt="" />
                    <a href="/"> نفرات برتر</a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-6 mt-md-0 mt-4">
                <div className="row text-center">
                  <h4 className="text-uppercase font-weight-bold text-center m-auto h4-title ">
                    دونیتو را دنبال کنید در{' '}
                  </h4>
                  <div className="col-md-12 py-4">
                    <div className="mb-5 flex-center text-center">
                      <a className="tw-ic" href="/">
                        <span className="mr-md-1 mr-1">
                          <img
                            src={twitter}
                            alt=""
                            className="img-fluid imgSocial"
                          />
                        </span>
                      </a>
                      <a className="gplus-ic" href="/">
                        <span className="mr-md-1 mr-1">
                          <img src={c} alt="" className="img-fluid imgSocial" />
                        </span>
                      </a>
                      <a className="li-ic" href="/">
                        <span className="mr-md-1 mr-1">
                          <img
                            src={whatsapp}
                            alt=""
                            className="img-fluid imgSocial"
                          />
                        </span>
                      </a>
                      <a className="ins-ic" href="/">
                        <span className="mr-md-1 mr-1">
                          <img
                            src={instagram}
                            alt=""
                            className="img-fluid imgSocial"
                          />
                        </span>
                      </a>
                      <a className="fb-ic" href="/">
                        <span className="mr-md-1 mr-1">
                          <img
                            src={facebook}
                            alt=""
                            className="img-fluid imgSocial"
                          />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="clearfix w-100 d-md-none d-none pb-3" />
              <div className="col-md-3 mb-md-0 mb-3">
                <div className="row">
                  <div className="col-md-6 col-6 ">
                    <div className="linkE">
                      <a href="/">
                        <img src={footerE} className="img-fluid" alt="" />
                      </a>
                    </div>
                  </div>
                  <div className="col-md-6 col-6 ">
                    <div className="linkE">
                      <a href="/">
                        <img src={footerE2} className="img-fluid" alt="" />
                      </a>
                    </div>
                  </div>
                  <p className="my-3 mr-auto ml-auto legalP">
                    تمامی حقوق متعلق به دونیتو می باشد
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="footer-copyright text-center py-3">© 2020 Copyright:
            <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
        </div> */}
        </footer>
      </React.Fragment>
    )
  }
}

export default Footer
