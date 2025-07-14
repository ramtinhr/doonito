import React, { Component } from 'react'
import '../asset/style/style.scss'
import { VscBell } from 'react-icons/vsc'
import logo from '../asset/img/logo.png'
import { Link } from 'react-router-dom'
import Popup from './PopUp'
import history from '../history'
import isAuthenticated from '../utils/auth'
import Cookies from 'js-cookie'
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alertFlag: false,
      loginFlag: false,
    }
  }

  componentDidMount() {
    if (!isAuthenticated()) {
      this.setState({ loginFlag: false })
    } else {
      this.setState({ loginFlag: true })
    }
  }

  onClose() {
    this.setState({ alertFlag: false })
  }

  checkLogin(page) {
    if (!isAuthenticated()) {
      this.setState({ alertFlag: true })
    } else {
      history.push(page)
    }
  }

  closeNavbar() {
    document.getElementById('menu-btn').click()
  }

  render() {
    return (
      <React.Fragment>
        {this.state.alertFlag ? (
          <Popup onClose={this.onClose.bind(this)} />
        ) : (
          <> </>
        )}
        <header className="header">
          <Link onClick={() => this.closeNavbar()} to="/" className="logo">
            <img src={logo} alt="doonito" />
          </Link>
          <input className="menu-btn" type="checkbox" id="menu-btn" />
          <label className="menu-icon" htmlFor="menu-btn">
            <span className="navicon" />
          </label>
          <ul className="menu">
            <li>
              <Link
                to="#"
                onClick={() => {
                  this.closeNavbar()
                  this.checkLogin('/purchaseSubscription')
                }}
              >
                خرید اشتراک
              </Link>
            </li>
            <li>
              {isAuthenticated() ? (
                <Link
                  to="#"
                  onClick={() => {
                    this.closeNavbar()
                    this.checkLogin('/ProfileUser')
                  }}
                >
                  دونیتو من
                </Link>
              ) : null}
            </li>
            <li>
              <Link onClick={() => this.closeNavbar()} to="/AboutGame">
                درباره دونیتو
              </Link>
            </li>
            <li>
              <Link
                to="#"
                onClick={() => {
                  this.closeNavbar()
                  this.checkLogin('/GameInfo')
                }}
              >
                نتایج
              </Link>
            </li>
            {!isAuthenticated() ? (
              <li>
                <Link
                  onClick={() => document.getElementById('menu-btn').click()}
                  to="/signin"
                >
                  ورود
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    this.closeNavbar()
                    Cookies.remove('accessToken')
                  }}
                >
                  خروج
                </Link>
              </li>
            )}
            <li className="alert-li">
              {isAuthenticated() && (
                <Link
                  onClick={() => this.closeNavbar()}
                  to="/Ticket"
                  className="alertIcon text-light"
                >
                  <VscBell />
                </Link>
              )}
            </li>
          </ul>
        </header>
      </React.Fragment>
    )
  }
}

export default Header
