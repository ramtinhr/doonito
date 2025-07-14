/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import moment from 'jalali-moment'
import axios from '../../axios'
import { Markup } from 'interweave'
import jmoment from 'moment-jalaali'
import { Link } from 'react-router-dom'
import { ChatBox } from 'react-chatbox-component'
import { ChatFeed, Message } from 'react-chat-ui'
import { SettingsSystemDaydreamRounded } from '@material-ui/icons'
import Cookies from 'js-cookie'
import lottie from '../../asset/loading.json'
import LottieAnimation from '../lottie/LottieAnimation'

jmoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true })
class Massages extends Component {
  constructor(props) {
    super(props)
    const params = new URLSearchParams(window.location.search)
    let id = params.get('id')
    this.chatsRef = React.createRef()
    this.formData = new FormData()
    this.baseUrl = 'http://45.147.77.110:5000'
    // this.baseUrl = 'http://192.168.86.4:5000'
    this.state = {
      rooms: [],
      loaded: false,
      user: {},
      file: null,
      open: false,
      id,
      room: {},
      // curTime: moment(new Date(), 'YY/MM/DD ')
      //   .locale('fa')
      //   .format('YYYY/MM/DD'),
      // curH: moment(new Date(), 'h:m').locale('fa').format('hh:mm'),
      body: '',
      subject: '',
      priority: '',
      category: '',
    }
  }
  async componentDidMount() {
    try {
      let { data: data2 } = await axios.get('/client/profile/get')
      let user = data2.content.user
      this.setState({ user })
      let id = localStorage.getItem('room')

      if (id) {
        let { data } = await axios.post(`/client/ticket/get/room`, {
          roomId: id,
        })
        let room = data.data

        this.setState({ room })
        console.log(this.state.room.chats)
        await this.updateRooms()
        let chats = this.chatsRef.current
        let height = this.chatsRef.current.scrollHeight
        chats.scrollTo(0, height)
      }
    } catch (ex) {
      console.log(ex)
    }
  }
  async sendTicket() {
    let body = this.state.body
    console.log(body)
    if (!body) {
      return
    }
    let send = {}
    send = {
      body: body,
      room: this.state.room._id,
    }
    if (this.state.file) {
      const sendBody = new FormData()
      sendBody.append('file', this.state.file, this.state.file.name)
      sendBody.append('body', body)
      sendBody.append('room', this.state.room._id)
      send = sendBody
    }
    console.log(body)

    await axios.post('/client/ticket/create', send)

    // await this.updateRooms()
    await this.updateRoom()

    this.setState({ body: '' })
    let chats = this.chatsRef.current
    let height = this.chatsRef.current.scrollHeight
    chats.scrollTo(0, height)
  }
  async updateRooms() {
    this.setState({ loaded: false })
    let { data: log } = await axios.get('/client/ticket/get/rooms')
    let rooms = log.data

    this.setState({ rooms, loaded: true })
  }
  async updateRoom() {
    let id = localStorage.getItem('room')

    if (id) {
      let { data } = await axios.post(`/client/ticket/get/room`, {
        roomId: id,
      })
      let room = data.data
      console.log(room)
      this.setState({ room })
    }
  }
  componentWillUnmount() {
    this.setState({ loaded: false })
  }
  async componentDidUpdate() {
    try {
      // let id = localStorage.getItem('room')
      // if (id) {
      //   let { data } = await axios.post(`/client/ticket/get/room`, {
      //     roomId: id,
      //   })
      //   let room = data.data
      //   this.setState({ room })
      // }
      // await this.updateRoom()
    } catch (ex) {
      console.log(ex)
    }
  }
  render() {
    let self = this
    if (!self.state.loaded) {
      return <LottieAnimation lotti={lottie} height={'90vh'} width={'25%'} />
    }
    return (
      <React.Fragment>
        <div className="TicketSection">
          <div className="container">
            <div className="TicketBody">
              <div className="row m-0 mt-5 rowTitle">
                <div className="col-md-6 col-6 text-right text-light">
                  <h6> پیام‌ها</h6>
                </div>
                <div className="col-md-6 col-6">
                  <p className="text-light p-time">
                    {/* {jmoment(Date.now()).format('jdddd jDD jMMMM jYYYY')}
                    <span>{jmoment(Date.now()).format('hh:mm')}</span> */}
                    <span style={{ marginLeft: '1em' }}>
                      {jmoment(Date.now()).format('hh:mm')}
                    </span>
                    <span>
                      {jmoment(Date.now()).format('dddd jDD jMMMM jYYYY')}
                    </span>
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-4 mt-2 MessagBox BoxShadow" id={'inbox'}>
                  {this.state.rooms.map((item) => (
                    <Link
                      to={`/Massage`}
                      onClick={(event) => {
                        localStorage.setItem('room', item._id)
                        window.location.reload()
                      }}
                    >
                      <div className="row Messages">
                        <div className="col-12">
                          <div className="row rowTitle MassageBox">
                            <div className="col-6 text-right MassageBox">
                              <h4>{item.category}</h4>
                              <p style={{ color: '#00ff95' }}>
                                {item.subject || 'بدون عنوان'}
                              </p>
                            </div>
                            <div className="col-6 text-light MassageBox">
                              <span>
                                {jmoment(item.created_at).format('hh:mm')}
                              </span>
                              <span>
                                {jmoment(item.created_at).format(
                                  ' jDD jMMMM jYYYY',
                                )}
                              </span>
                              {/* <p className="text-light p-time"></p> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 text-right text-ligh MassageBox">
                          <div className="row">
                            <div className="col-9 ">
                              <p>
                                <Markup
                                  content={
                                    item.chats[
                                      item.chats.length - 1
                                    ].body.substring(0, 15) + '...'
                                  }
                                />
                              </p>
                            </div>
                            <div className="col-3 badgeBox">
                              {[0].map(() => {
                                let length = item.chats.filter(
                                  (item) =>
                                    !item.userSeen &&
                                    item.from._id.toString() !=
                                      self.state.user._id.toString(),
                                ).length
                                if (length != 0) {
                                  return (
                                    <div className="Badge">
                                      <span>{length}</span>
                                    </div>
                                  )
                                }
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr style={{ backgroundColor: 'white' }} />
                    </Link>
                  ))}
                </div>
                <div className="col-8 chat boxShadow">
                  <div className="row mb-2" id="chatHeader">
                    <div className="col-3 text-right">
                      <span className="category">
                        {self?.state?.room?.category || 'بدون دسته بندی'}
                      </span>
                    </div>
                    <div className="col-4 text-right">
                      <span className={'title'}>
                        {self?.state?.room?.subject || 'بدون موضوع'}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12" id={'chats'} ref={self.chatsRef}>
                      {self?.state?.room?.chats?.map((chat) => {
                        let userId = self.state.user._id

                        if (chat.from._id.toString() == userId.toString()) {
                          return (
                            <div
                              className="container-fluid mt-2"
                              style={{
                                padding: '0.5em',
                                marginTop: '0.3em',
                                marginBottom: '0.5em',
                                marginRight: 0,
                                marginLeft: 0,
                              }}
                            >
                              <div className="row messageContainer-me ">
                                <div
                                  class="col-1"
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 0,
                                    margin: 0,
                                  }}
                                >
                                  <img
                                    src={(() => {
                                      let url = `${self.baseUrl}/${self.state.room.user.image}`
                                      if (self.state.room.user.image) {
                                        return url
                                      }
                                      return '/images/user.png'
                                    })()}
                                    width={45}
                                    alt="userimage"
                                    className="myProfile"
                                    onError={(err) => console.log(err)}
                                  />
                                </div>
                                <div
                                  class="col-6"
                                  style={{ padding: 0, margin: 0 }}
                                >
                                  <div className="msgBox-me bg-light text-dark">
                                    <Markup content={chat.body} />
                                  </div>
                                </div>
                              </div>
                              {chat.attachment && (
                                <div className="row messageContainer-me">
                                  <div className="col-1"></div>
                                  <div
                                    className="col-4 msgBox-me bg-light downloadMsg"
                                    onClick={async () => {
                                      const AUTH_TOKEN =
                                        Cookies.get('accessToken')
                                      let res = await fetch(
                                        `${
                                          self.baseUrl
                                        }/api/client/ticket/download/file/${chat._id.toString()}`,
                                        {
                                          headers: {
                                            authorization: `Bearer ${AUTH_TOKEN}`,
                                          },
                                        },
                                      )
                                      let b = await res.blob()

                                      const blob = new Blob([b])
                                      const fileDownloadUrl =
                                        URL.createObjectURL(blob)
                                      let a = document.createElement('a')
                                      a.href = fileDownloadUrl
                                      a.setAttribute(
                                        'download',
                                        `sample.${
                                          chat.attachment.split('/')[4]
                                        }`,
                                      )
                                      document.body.appendChild(a)
                                      a.click()
                                      a.parentNode.removeChild(a)
                                    }}
                                  >
                                    <img
                                      src="/images/download.png"
                                      width={40}
                                      alt={'DownloadIcon'}
                                    />
                                    <p>
                                      {chat.attachment
                                        .split('/')[4]
                                        ?.substring(0, 20) + ' ...'}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        } else {
                          return (
                            <div
                              className="container-fluid mt-2"
                              style={{
                                padding: '0.5em',
                                marginTop: '0.3em',
                                marginBottom: '0.5em',
                                marginRight: 0,
                                marginLeft: 0,
                              }}
                            >
                              <div className="row messageContainer-other ">
                                <div
                                  class="col-1"
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 0,
                                    margin: 0,
                                  }}
                                >
                                  <img
                                    src={(() => {
                                      let url = `${self.baseUrl}/${self.state.room.admin.image}`
                                      if (self.state.room.user.image) {
                                        return url
                                      }
                                      return '/images/user.png'
                                    })()}
                                    width={45}
                                    alt="userimage"
                                    className="otherProfile"
                                    onError={(err) => console.log(err)}
                                  />
                                </div>
                                <div
                                  class="col-9"
                                  style={{
                                    padding: 0,
                                    margin: 0,
                                    display: 'flex',
                                  }}
                                >
                                  <div className="msgBox-other bg-light text-dark">
                                    <Markup content={chat.body} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        }
                      })}
                    </div>
                  </div>
                  <div
                    className="row pb-2"
                    id={'message-area'}
                    style={{
                      backgroundColor: '#292f3d',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      className="col-12"
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}
                    >
                      <div className="col-1 mt-1 p-0 pl-2">
                        <div onClick={self.sendTicket.bind(self)}>
                          <img
                            src="/images/send.png"
                            alt="sendMessae"
                            width={30}
                          />
                        </div>
                      </div>
                      <div className="col-10">
                        <Form.Control
                          onKeyPress={async (event) => {
                            if (event.key.toLowerCase() == 'enter') {
                              await self.sendTicket()
                            }
                          }}
                          className="message-box"
                          value={self.state.body}
                          placeholder="چیزی بنویس"
                          style={{
                            backgroundColor: '#D4D7DD',
                            borderRadius: '9px',
                            marginTop: '2px',
                            color: '#151e35',
                          }}
                          onChange={(event) => {
                            self.setState({ body: event.target.value })
                          }}
                        />
                      </div>
                      <div className="col-1 mt-1 p-0 pl-2">
                        <div>
                          <label htmlFor="fileInput">
                            <img
                              src="/images/gallery.png"
                              alt="sendMessae"
                              width={30}
                            />
                          </label>
                          <input
                            id="fileInput"
                            style={{ display: 'none' }}
                            type={'file'}
                            onChange={(event) => {
                              self.setState({
                                file: event.target.files[0],
                              })
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Massages
