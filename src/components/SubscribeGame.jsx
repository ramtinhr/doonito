/* eslint-disable no-dupe-class-members */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import banner from '../asset/img/banner.png'
import TopBar from './TopBar'
import border from '../asset/img/border.png'
import play from '../asset/img/play.svg'
import axiosInstance from '../axios'
import FadeIn from 'react-lazyload-fadein'
import { subscriptionImage } from '../utils/images'
import placeholder from '../asset/img/placeholder.jpg'
import { numberFormat } from '../utils/number'
import SweetAlert from 'react-bootstrap-sweetalert'
import LottieAnimation from './lottie/LottieAnimation'
import lottie from '../asset/loading.json'
import Check from './../asset/img/check.png'
import isAuthenticated from '../utils/auth'
import Popup from './PopUp'
import Box from '@material-ui/core/Box'

class SubscribeGame extends Component {
  state = {
    WORS: 'success',
    showSweet: false,
    msgSweet: '',
    packages: [],
    isVipMember: false,
    contest: null,
    loaded: false,
    isOpen: false,
    isLoading: false,
    loadingFlag: false,
    dataId: '',
    strPackages: {
      '1year': '1 ساله',
      '1months': '1 ماهه',
      '3months': '3 ماهه',
      '6months': '6 ماهه',
      noner: '',
      warningFlag: false,
      alertFlag: false,
      confirmBuy: false,
    },
  }
  onClose() {
    this.setState({ alertFlag: false })
  }
  checkImage(image, onLoad) {
    return image && image !== '' ? (
      <img
        src={subscriptionImage(image)}
        onLoad={onLoad}
        alt="img1"
        className="img-fluid"
      />
    ) : (
      <img src={placeholder} onLoad={onLoad} alt="img1" className="img-fluid" />
    )
  }
  checkLogin(id) {
    if (!isAuthenticated()) {
      this.setState({ alertFlag: true })
    } else {
      //
      this.setState({
        confirmBuy: true,
        showSweet: true,
      })
    }
  }
  getStrPackages = (key) => {
    return this.state.strPackages[key]
  }
  handleBuyPackage(id) {
    this.setState({ loadingFlag: true })

    axiosInstance
      .get('/client/package/buy/' + id)
      .then((res) => {
        this.setState({ loadingFlag: false })

        if (res.data.error) {
          this.setState({ 
            WORS: 'warning',
            warningFlag: true,
            msgSweet: 'مشکلی موقع ثبت خرید بوجود آمد',
            showSweet: true
          })
        }
        this.setState({ 
          WORS: 'success',
          warningFlag: false
        })
        let msg = (
          <div>
            <img src={Check} alt="مشکل آپلود" style={{ width: '70px' }} />
            <br /> <br />
            اشتراک با موفقیت خریداری شد
          </div>
        )
        this.setState({ 
          msgSweet: msg,
          showSweet: true
        })
      })
      .catch(() => {
        this.setState({ 
          loadingFlag: false,
          WORS: 'warning',
          warningFlag: true,
          msgSweet: 'این اشتراک قبلا خریداری شده',
          showSweet: true
        })
      })
  }
  async fetchLastContest() {
    await axiosInstance.get(`/client/contest/last`).then((res) => {
      const contest = res.data.content.contest
      this.setState({ contest })
      this.setState({ isLoading: false })
    })
  }
  async fetchPackagesList() {
    await axiosInstance.get(`/client/package/list`).then((res) => {
      this.setState({ packages: res.data.content.packages })
    })
  }
  async fetchBoughtPackages() {
    if (isAuthenticated()) {
      await axiosInstance.get('/client/package/bought').then((resp) => {
        resp.data.content.userPackages.length
          ? this.setState({ isVipMember: true })
          : this.setState({ isOpen: true })
      })
    }
  }
  async componentDidMount() {
    this.setState({ isLoading: true })
    await this.fetchPackagesList()
    await this.fetchLastContest()
    await this.fetchBoughtPackages()
  }
  onLoad = () => this.setState({ loaded: true })
  render() {
    return (
      <React.Fragment>
        <SweetAlert
          show={this.state.isOpen}
          style={{
            color: '#fff',
            backgroundColor: ' rgb(182 178 178 / 52%)',
            borderRadius: '30px',
          }}
          title={
            !this.state.isVipMember && isAuthenticated()
              ? 'شما اشتراکی ندارید نسبت به خرید آن اقدام کنید' :
              !isAuthenticated() ?
                'در صورت تمایل برای شرکت در مسابقه اول وارد شوید'
                : 'بازی تمام شده است'
          }
          customButtons={
            <React.Fragment>
              <button
                onClick={() => this.setState({ isOpen: false })}
                className="alertBtn"
              >
                باشه
              </button>
            </React.Fragment>
          }
          openAnim={{ name: 'showSweetAlert', duration: 2000 }}
          closeAnim={{ name: 'hideSweetAlert', duration: 2000 }}
        />
        {this.state.alertFlag ? (
          <Popup onClose={this.onClose.bind(this)} />
        ) : (
          <> </>
        )}
        <section className="subscribeSection">
          {this.state.showSweet ? (
            <SweetAlert
              warning={this.state.warningFlag}
              show={this.state.showSweet}
              showCloseButton={this.state.closeFlag}
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
                  {this.state.confirmBuy ? (
                    <>
                      <div style={{ margin: '20px', fontSize: '30px' }}>
                        روش پرداخت
                      </div>
                      <div>
                        <Box display="flex" justifyContent="center" m={1} p={1}>
                          <button
                            onClick={() => {
                              this.handleBuyPackage(this.state.dataId)
                              this.setState({ confirmBuy: false })
                            }}
                            className="okBtn w-100 pr-3 pl-3 pt-2 pb-2"
                            style={{ margin: '10px' }}
                          >
                            خرید با کیف پول
                          </button>
                          <button
                            onClick={() => {
                              this.handleBuyPackage(this.state.dataId)
                              this.setState({ confirmBuy: false })
                            }}
                            className="okBtn w-100 pr-3 pl-3 pt-2 pb-2"
                            style={{ margin: '10px' }}
                          >
                            خرید از طریق درگاه
                          </button>
                        </Box>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() =>
                        this.setState({ showSweet: false, msgSweet: '' })
                      }
                      className="alertBtn"
                    >
                      باشه
                    </button>
                  )}
                </React.Fragment>
              }
              openAnim={{ name: 'showSweetAlert', duration: 2000 }}
              closeAnim={{ name: 'hideSweetAlert', duration: 2000 }}
            />
          ) : (
            <></>
          )}
          {this.state.loadingFlag ? (
            <>
              <LottieAnimation lotti={lottie} height="100vh" width="200px" />
            </>
          ) : (
            <>
              <div className="container">
                <div className="row">
                  <TopBar />
                  <div className="col-md-12 col-12">
                    <div className="row">
                      <p className="startMovie">
                      </p>
                    </div>
                    <div
                      onClick={() =>
                        this.state.contest?.length && !this.state.isLoading && !this.state.contest.isFinished
                          ? this.checkLogin()
                          : this.setState({ isOpen: true })
                      }
                    >
                      <Link
                        to={
                          this.state.contest &&
                            isAuthenticated() &&
                            !this.state.isLoading &&
                            !this.state.contest?.isFinished
                            ? `/ActiveGame/${this.state.contest?.id}`
                            : ''
                        }
                      >
                        <div className="videoBox">
                          <FadeIn>
                            {(onload) =>
                              this.state.contest?.cover ? (
                                <img
                                  src={subscriptionImage(this.state.contest.cover)}
                                  onLoad={onload}
                                  alt=""
                                  className="img-fluid"
                                />
                              ) : (
                                <img
                                  src={banner}
                                  onLoad={onload}
                                  alt=""
                                  className="img-fluid"
                                />
                              )
                            }
                          </FadeIn>
                          <div className="playBox">
                            {!this.state.isLoading ? (
                              <div className="borderVideo">
                                <img
                                  src={border}
                                  alt=""
                                  className="img-fluid"
                                />

                                <img src={play} className="playIcon" alt="" />
                              </div>
                            ) : (
                              <LottieAnimation
                                lotti={lottie}
                                height={380}
                                width={'15%'}
                              />
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-12 col-12 text-center">
                    <div className="subscribeLink">
                      <Link
                        to={
                          !isAuthenticated()
                            ? '/signin'
                            : '/purchaseSubscription'
                        }
                        className="text-white "
                        style={{ cursor: 'pointer' }}
                      >
                        هنوز برای خرید اشتراک اقدام نکردی؟
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-12 col-12">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="card subscriptionCard">
                          {this.state.packages[0] ? (
                            <div className="row">
                              <div className="col-md-12 col-12 title">
                                <h2>{this.state.packages[0].title}</h2>
                              </div>
                              <div className="col-md-12 img-card">
                                {
                                  <FadeIn>
                                    {(onLoad) =>
                                      this.checkImage(
                                        this.state.packages[0].image,
                                        onLoad,
                                      )
                                    }
                                  </FadeIn>
                                }
                              </div>
                              <div className="col-md-12 card-body">
                                <p>
                                  <span className="startDate">
                                    {this.getStrPackages(
                                      this.state.packages[0].plan,
                                    )}
                                  </span>
                                </p>
                              </div>
                              <div className="col-md-12">
                                <div className="subscribeBtn">
                                  <p className="price">
                                    {' '}
                                    {numberFormat(this.state.packages[0].price)}
                                  </p>
                                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                  <a
                                    onClick={() =>
                                      this.setState({
                                        dataId: this.state.packages[0]._id,
                                        closeFlag: false,
                                        confirmBuy: true,
                                        showSweet: true,
                                        warningFlag: false 
                                      })
                                    }
                                  >
                                    {' '}
                                    خرید اشتراک
                                  </a>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <LottieAnimation
                              lotti={lottie}
                              height={380}
                              width={'15%'}
                            />
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-12 mb-2">
                            <div className="card subscriptionCard-sm">
                              {this.state.packages[1] ? (
                                <div className="row">
                                  <div className="col-md-6 img-card">
                                    {
                                      <FadeIn>
                                        {(onLoad) =>
                                          this.checkImage(
                                            this.state.packages[1].image,
                                            onLoad,
                                          )
                                        }
                                      </FadeIn>
                                    }
                                  </div>
                                  <div className="col-md-6 card-body">
                                    <h2>{this.state.packages[1].title}</h2>
                                    <p>
                                      <span className="startDate">
                                        {this.getStrPackages(
                                          this.state.packages[1].plan,
                                        )}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="subscribeBtn">
                                      <p className="price">
                                        {' '}
                                        {numberFormat(
                                          this.state.packages[1].price,
                                        )}
                                      </p>
                                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                      <a
                                        onClick={() =>
                                          this.setState({
                                            dataId: this.state.packages[1]._id,
                                            closeFlag: false,
                                            confirmBuy: true,
                                            showSweet: true,
                                            warningFlag: false 
                                          })
                                        }
                                      >
                                        {' '}
                                        خرید اشتراک
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <LottieAnimation
                                  lotti={lottie}
                                  height={145}
                                  width={'15%'}
                                />
                              )}
                            </div>
                          </div>
                          {this.state.packages[2] ? (
                            <div className="col-md-12 mt-4">
                              <div className="card subscriptionCard-sm">
                                <div className="row">
                                  <div className="col-md-6 img-card">
                                    {
                                      <FadeIn>
                                        {(onLoad) =>
                                          this.checkImage(
                                            this.state.packages[2].image,
                                            onLoad,
                                          )
                                        }
                                      </FadeIn>
                                    }
                                  </div>
                                  <div className="col-md-6 card-body">
                                    <h2>{this.state.packages[2].title}</h2>
                                    <p>
                                      <span className="startDate">
                                        {this.getStrPackages(
                                          this.state.packages[2].plan,
                                        )}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="subscribeBtn">
                                      <p className="price">
                                        {numberFormat(
                                          this.state.packages[2].price,
                                        )}
                                      </p>
                                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                      <a
                                        onClick={() =>
                                          this.setState({
                                            dataId: this.state.packages[2]._id,
                                            closeFlag: false,
                                            confirmBuy: true,
                                            showSweet: true,
                                            warningFlag: false 
                                          })
                                        }
                                      >
                                        {' '}
                                        خرید اشتراک
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </React.Fragment>
    )
  }
}

export default SubscribeGame
