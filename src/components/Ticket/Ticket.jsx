/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import moment from 'jalali-moment'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import SearchIcon from '@material-ui/icons/Search'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { Form, Row, Col, Button } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'draft-js/dist/Draft.css'
import { Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'
import axios from '../../axios'

import jmoment from 'moment-jalaali'
import { Markup } from 'interweave'

const closeIcon = (
  <svg fill="#2FB983" viewBox="0 0 512 511.99" width={18} height={18}>
    <path
      d="M302.91,256.42,502.27,57.05a33.16,33.16,0,1,0-46.9-46.9L256,209.52,56.63,10.15a33.16,33.16,0,0,0-46.9,46.9L209.09,256.42,9.73,455.79a33.16,33.16,0,1,0,46.9,46.9L256,303.32,455.37,502.69a33.16,33.16,0,0,0,46.9-46.9Z"
      transform="translate(0 -0.42)"
    ></path>
  </svg>
)
jmoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true })
export class Ticket extends Component {
  constructor(props) {
    super(props)
    const cookie = document.cookie
      .split(';')
      .find((item) => item.includes('accessToken'))
    this.baseUrl = 'http://45.147.77.110:5000/api'
    // this.baseUrl = 'http://192.168.86.4:5000/api'
    this.quillRef = null // Quill instance
    this.reactQuillRef = null
    this.user = null

    this.state = {
      searching: false,
      searchText: '',
      quill: null,
      file: null,
      quillRef: null,
      rooms: [],
      user: {},
      value: '',
      Search: '',
      open: false,
      curTime: moment(new Date(), 'YY/MM/DD ')
        .locale('fa')
        .format('YYYY/MM/DD'),
      curH: moment(new Date(), 'h:m').locale('fa').format('hh:mm'),
      user: {
        phoneNumber: '',
      },
      body: {
        form: {
          body: '',
          subject: '',
          priority: '',
          category: '',
        },
      },
      header: {
        authorization: `barer ${(cookie && cookie.split('=')[1]) || ''}`,
      },
    }
  }
  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: 'right' }],
      [{ direction: 'rtl' }],
      [{ color: [] }, { background: [] }],
    ],
  }

  formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'align',
    'indent',
    'direction',
    'color',
  ]
  async updateRooms() {
    let { data: log } = await axios.get('/client/ticket/get/rooms')
    let rooms = log.data
    console.log(log)
    this.setState({ rooms })
  }
  attachQuillRefs() {
    if (!this.reactQuillRef || this?.reactQuillRef?.getEditor !== 'function')
      return

    if (this.quillRef != null) return

    this.quillRef = this.reactQuillRef.getEditor()
    this.quillRef.insertText(0, 'Hello, World!')

    this.quillRef.formatText(0, this.quillRef.getLength(), 'align', 'rtl')
  }
  async componentDidMount() {
    try {
      // this.attachQuillRefs()
      let { data: data2 } = await axios.get('/client/profile/get')
      let user = data2.content.user
      this.setState({ user })
      // let { data } = await axios.get('/client/profile/get')
      // const user = data.content
      await this.updateRooms()
    } catch (ex) {
      console.log(ex)
    }
  }
  async componentDidUpdate() {
    // this.attachQuillRefs()
  }
  async search() {
    let search = this.state.Search
    if (search == '') {
      this.setState({ searching: false })
      await this.updateRooms()
      return
    }

    let rooms = this.state.rooms
    let regx = new RegExp(search)
    let found = []
    for (let room of rooms) {
      for (let chat of room.chats) {
        if (
          regx.test(chat.body) ||
          regx.test(room.subject) ||
          regx.test(room.category)
        ) {
          let tempRoom = { ...room }
          tempRoom.chats = [chat]
          found.push(tempRoom)
        }
      }
    }
    console.log(found.length)
    this.setState({ rooms: found, Search: '', searching: true })
  }
  handleClose() {
    this.setState({ open: false })
    console.log(this.state.value)
  }
  async submit() {
    let { subject, category, priority } = this.state.body.form
    let form = { subject, category, body: this.state.value, priority }
    if (!form.subject || !form.category || !form.body || !form.priority) {
      alert('مقادیر را به درستی  وارد کنید')
    } else {
      try {
        if (this.state.file) {
          if (this.state.file) {
            const sendBody = new FormData()
            sendBody.append('file', this.state.file, this.state.file.name)
            sendBody.append('body', form.body)
            sendBody.append('category', form.category)
            sendBody.append('subject', form.subject)
            sendBody.append('priority', form.priority)
            form = sendBody
          }
        }
        let { data: res } = await axios.post('/client/ticket/create', form)
        let status = res.status
        if (status == 201) {
          this.handleClose()
          await this.updateRooms()
        }
      } catch (ex) {
        console.log(ex)
      }
    }
    this.handleClose()
  }
  onchange(value) {
    this.setState({ value })
    return value.toString('html')
  }
  render() {
    let self = this
    return (
      <React.Fragment>
        <section className="TicketSection">
          <div className="container">
            <div className="TicketBody">
              <div className="row m-0 mt-5 rowTitle">
                <div className="col-md-6 col-6 text-right text-light">
                  <h6> پیام‌ها</h6>
                </div>
                <div className="col-md-6 col-6">
                  <p className="text-light p-time">
                    <span style={{ marginLeft: '1em' }}>
                      {jmoment(Date.now()).format('hh:mm')}
                    </span>
                    <span>
                      {jmoment(Date.now()).format('dddd jDD jMMMM jYYYY')}
                    </span>
                  </p>
                </div>
              </div>
              <div className="row m-0 mt-3 AddMessage">
                <div className="col-md-6 col-sm-12 text-right mt-2 text-light">
                  <a
                    href="#"
                    onClick={() => {
                      this.setState({ open: true })
                    }}
                  >
                    <div className="row AddCircle">
                      <AddCircleIcon style={{ fontSize: 35, marginLeft: 15 }} />
                      <p>پیام جدید</p>
                    </div>
                  </a>
                </div>
                <div className="col-md-6 col-sm-12 text-right text-light">
                  <div className="row Search">
                    <div className="col-md-4 col-sm-1"></div>
                    <div className="col-m-11 col-8 ">
                      <div className="row SearchBox">
                        <a
                          className="col-md-1 col-sm-auto SearchIcon"
                          onClick={this.search.bind(self)}
                        >
                          <SearchIcon
                            style={{
                              fontSize: 35,
                              color: '#00ff95',
                            }}
                          />
                        </a>
                        <div className="col-md-10 col-sm-auto">
                          <div className="form-item">
                            <input
                              className="SearchInput"
                              placeholder="جستجو"
                              value={this.state.Search}
                              onChange={(event) => {
                                this.setState({ Search: event.target.value })
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{ height: !self.state.rooms?.length ? '8rem' : 'auto' }}
              >
                {self?.state?.rooms?.map((item) => (
                  <Link
                    to={`/Massage`}
                    onClick={(event) => {
                      localStorage.setItem('room', item._id)
                    }}
                  >
                    <div className="row m-0 mt-5 Message">
                      <div className="col-12">
                        <div className="row rowTitle">
                          <div className="col-1"></div>
                          <div className="col-2"></div>
                          <div className="col-5"></div>
                          <div className="col-4">
                            <p className="text-light p-time">
                              <span>
                                {jmoment(item.created_at).format('hh:mm')}
                              </span>
                              <span>
                                {jmoment(item.created_at).format(
                                  'dddd jDD jMMMM jYYYY',
                                )}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 text-right text-ligh massageBar">
                        <div className="row">
                          <div className="col-11">
                            <h3>{item.category || 'بدون دسته بندی'}</h3>
                            <h5>{item.subject || 'بدون موضوع'}</h5>
                            <h5 style={{ color: '#2FB983' }}>
                              <Markup
                                content={
                                  item.chats[0].body.substring(0, 50) + '...'
                                }
                              />
                            </h5>
                          </div>
                          <div className="col-1 badgeBox">
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
                  </Link>
                ))}
              </div>

              {
                <Modal
                  open={this.state.open}
                  onClose={this.handleClose.bind(this)}
                  center
                  styles={{
                    modal: {
                      'background-color': '#151e25',
                      position: 'relative',
                      'max-width': ' 900px',
                      width: '100%',
                      color: 'white',
                      borderRadius: '1.2rem',
                    },
                    closeButton: {
                      top: '2em',
                      bottom: 'auto',
                      left: '3em',
                      position: 'absolute',
                      right: 'auto',
                    },
                  }}
                  closeIcon={closeIcon}
                  classNames={{
                    overlay: 'customOverlay',
                    modal: 'customModal',
                  }}
                >
                  <div className="row text-right mt-5">
                    <div className="col-12">
                      <Form encType={'form-data'}>
                        <Row className="mb-3 text-right rtl Form">
                          <Form.Group
                            className="rtl justify-content-start text-right"
                            as={Col}
                          >
                            <Form.Label>موضوع:</Form.Label>
                            <Form.Control
                              as="select"
                              onChange={(event) =>
                                self.setState({
                                  body: {
                                    form: { category: event.target.value },
                                  },
                                })
                              }
                            >
                              <option value={''}>انتخاب کنید</option>
                              <option value={'دپارتمان مالی'}>
                                دپارتمان مالی
                              </option>
                              <option value={'بخش پشتیبانی'}>
                                بخش پشتیبانی
                              </option>
                              <option value={'واحد شکایات'}>واحد شکایت</option>
                            </Form.Control>
                          </Form.Group>
                          <Col
                            className="rtl justify-content-start text-right"
                            xs={3}
                          >
                            <Form.Label>رده:</Form.Label>
                            <Form.Control
                              as="select"
                              onChange={(event) =>
                                self.setState({
                                  body: {
                                    form: {
                                      ...self.state.body.form,
                                      priority: event.target.value,
                                    },
                                  },
                                })
                              }
                            >
                              <option value={''}>انتخاب کنید</option>
                              <option value={'normal'}>پایین</option>
                              <option value={'important'}>متوسط</option>
                              <option value={'instant'}>زیاد</option>
                            </Form.Control>
                          </Col>
                          <Col
                            xs={4}
                            className="rtl justify-content-start text-right"
                          >
                            <Form.Label>عنوان:</Form.Label>
                            <Form.Control
                              placeholder=""
                              onChange={(event) =>
                                self.setState({
                                  body: {
                                    form: {
                                      ...self.state.body.form,
                                      subject: event.target.value,
                                    },
                                  },
                                })
                              }
                            />
                          </Col>
                          <Col
                            xs={1}
                            className="rtl mt-3 d-flex justify-content-center align-items-center"
                          >
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
                          </Col>
                        </Row>
                        <Row
                          className="pr-3 pb-2"
                          style={{
                            backgroundColor: '#c5c5c5',
                            margin: '-1.1em',
                            borderRadius: '10px',
                          }}
                        >
                          <Col xs={12}>
                            <Row>
                              <Col
                                xs={12}
                                style={{
                                  width: '100%',
                                  height: '20rem',
                                  backgroundColor: '#c5c5c5',
                                  borderRadius: 5,
                                }}
                              >
                                <ReactQuill
                                  ref={(el) => {}}
                                  // ref={self.reactQuillRef}
                                  placeholder={'چیزی بنویسید...'}
                                  theme={'snow'}
                                  style={{
                                    height: '15rem',
                                    backgroundColor: '#c5c5c5',
                                    color: '#151e53',
                                    margin: '1em',
                                  }}
                                  modules={self.modules}
                                  formats={self.formats}
                                  value={self.state.value}
                                  onChange={(value) =>
                                    self.setState({
                                      value,
                                    })
                                  }
                                />
                              </Col>
                            </Row>
                            <Row className="mt-1">
                              <Button
                                size="lg"
                                variant="success"
                                onClick={self.submit.bind(self)}
                              >
                                ثبت و ارسال
                              </Button>
                            </Row>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </div>
                </Modal>
              }
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

export default Ticket
