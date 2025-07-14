import React, { Component } from 'react'
import TopBar from './TopBar'
import axiosInstance from '../axios'
import history from '../history'
import placeholder from './../asset/img/placeholder.jpg'
import Popup from './PopUp'
import SweetAlert from 'react-bootstrap-sweetalert'
import Box from '@material-ui/core/Box'
import LottieAnimation from './lottie/LottieAnimation'
import { numberFormat } from '../utils/number'
import lottie from '../asset/loading.json'
import { subscriptionImage } from './../utils/images'
import Check from './../asset/img/check.png'

class PurchaseSubscription extends Component {
  constructor(props) {
    super(props)

    this.state = {
      WORS: 'success',
      showSweet: false,
      msgSweet: '',
      packages: [],
      strPackages: {
        '1year': '1 ساله',
        '1months': '1 ماهه',
        '3months': '3 ماهه',
        '6months': '6 ماهه',
        noner: '',
      },
      alertFlag: false,
      successFlag: false,
      warningFlag: false,
      confirmBuy: false,
      closeFlag: false,
      dataId: null,
    }
  }

  getStrPackages = (key) => {
    return this.state.strPackages[key]
  }

  async componentDidMount() {
    axiosInstance
      .get(`/client/package/list`)
      .then((res) => {
        console.log(res, 's')
        if (res.data.error) {
          history.push('/')
        }
        this.setState({ packages: res.data.content.packages })
      })
      .catch((err) => {
        alert(err)
      })
  }
  handleBuyPackage(id) {
    axiosInstance
      .get('/client/package/buy/' + id)
      .then((res) => {
        if (res.data.error) {
          this.setState({ WORS: 'warning' })
          this.setState({ msgSweet: 'مشکلی موقع ثبت خرید بوجود آمد' })
          this.setState({ showSweet: true })
        }
        this.setState({ WORS: 'success' })

        this.setState({
          msgSweet: (
            <div>
              <img src={Check} alt="مشکل آپلود" style={{ width: '70px' }} />
              <br /> <br /> اشتراک با موفقیت خریداری شد
            </div>
          ),
        })
        this.setState({ showSweet: true })
      })
      .catch((err) => {
        this.setState({ WORS: 'warning' })
        this.setState({ msgSweet: 'این اشتراک قبلا خریداری شده' }, () => {
          console.log(this.state)
        })
        this.setState({ showSweet: true })
      })
  }
  render() {
    return (
      <div>
        <section className="purchaseSubSection">
          <Popup />
          {this.state.showSweet ? (
            <SweetAlert
              warning={this.state.warningFlag}
              show={this.state.showSweet}
              // showCancel
              showCloseButton={this.state.closeFlag}
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

          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <TopBar />
              </div>
              <div className="col-md-12 col-12">
                <div className="row">
                  <div className="col-md-12">
                    {this.state.packages.length ? (
                      <div className="row">
                        {this.state.packages.map((data, index) => (
                          <div className="col-md-12 mt-4" key={index}>
                            <div className="card purchaseSubCard-sm">
                              <div className="row">
                                <div className="col-md-3 img-card">
                                  {data.image && data.image !== "" ? (
                                    <img
                                      src={subscriptionImage(data.image)}
                                      className="img-fluid"
                                      alt="این تصویر در دسترس نمی باشد"
                                    />
                                  ) : (
                                    <img
                                      src={placeholder}
                                      alt="placeholder"
                                      className="img-fluid"
                                    />
                                  )}
                                </div>
                                <div className="col-md-3 card-body align-self-center">
                                  <h2>{data.title}</h2>
                                </div>
                                <div className="col-md-3 card-body align-self-center">
                                  <p>{this.getStrPackages(data.plan)}</p>
                                </div>
                                <div className="col-md-3 card-body align-self-center">
                                  <div className="purchaseSubCardBtn">
                                    <p className="price">
                                      {' '}
                                      {numberFormat(data.price)} تومان
                                    </p>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a
                                      onClick={() =>
                                        // console.log("j")
                                        // this.handleBuyPackage(data._id)
                                        this.setState({
                                          dataId: data._id,
                                          closeFlag: false,
                                          confirmBuy: true,
                                          showSweet: true,
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
                        ))}
                      </div>
                    ) : (
                      <LottieAnimation
                        lotti={lottie}
                        height={'60vh'}
                        width={'15%'}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default PurchaseSubscription
