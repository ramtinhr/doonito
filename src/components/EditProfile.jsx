import React, { useEffect, useState } from 'react'
import user from '../asset/img/user.svg'
import plus from '../asset/img/plus.svg'
import { useForm, Controller } from 'react-hook-form'
import TopBar from './TopBar'
import ImageUploader from 'react-images-upload'
import SweetAlert from 'sweetalert-react'
import CheckLogin from './CheckLogin'
import Cookies from 'js-cookie'
import axiosInstance from '../axios'
import tick from '../asset/img/tick_icon.svg'
import { subscriptionImage } from './../utils/images'
import lottie from '../asset/loading.json'
import Check from './../asset/img/check.png'
import EditPassword from './EditPassword'
import LottieAnimation from './lottie/LottieAnimation'
import axios from 'axios'
import { json } from 'body-parser'

const EditProfile = () => {
  const [WORS, setWORS] = useState('success')
  const [showSweet, setShowSweet] = useState(false)
  const [successFlag, setSuccessFlag] = useState(false)
  const [passFlag, setPassFlag] = useState(false)
  const [warningFlag, setWarningFlag] = useState(false)
  const [msgSweet, setMsgSweet] = useState('')
  const [profileImg, setProfileImg] = useState(null)
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [mobile, setMobile] = useState('')
  const [loadingFlag, setLoadingFlag] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })
  const [hiddenView, setHiddenView] = useState(false)
  useEffect(() => {
    setLoadingFlag(true)
    const phoneNumberUser = JSON.parse(localStorage.getItem('phoneNumber'))
    console.log(phoneNumberUser, 'phoneNumberUser')
    axiosInstance
      .get('/client/profile/get/' + phoneNumberUser + '/')
      .then((res) => {
        setLoadingFlag(false)
        console.log(res)
        let user = res.data.content.user
        setProfileImg(subscriptionImage(user.image))

        setSuccessFlag(true)
        setValue('lastName', user.lastName)
        setValue('username', user.username)
        setValue('firstName', user.firstName)
        setValue('age', user.age)
        setValue('city', user.city)
        setValue('phoneNumber', user.phoneNumber)
        setValue('fatherName', user.fatherName)
        setValue('gender', user.gender)
        setValue('nationalCode', user.nationalCode)
        setValue('email', user.email)
        setValue('address', user.address)
        setValue('cardNumber', user.cardNumber)
        setValue('bankAccountNumber', user.bankAccountNumber)
        setValue('shabaNumber', user.shabaNumber)
        setValue('wallet', user.wallet)
      })
      .then(() => {
      })
      .catch(() => {
        setWarningFlag(true)
        setLoadingFlag(false)
      })
  }, [])

  const onSubmit = async (data) => {
    setLoadingFlag(true)
    const phoneNumberUser = JSON.parse(localStorage.getItem('phoneNumber'))
    let formData = new FormData()
    Object.keys(data).forEach((item) => {
      if (item == 'image') {
        console.log(data[item][0], '444444')
        formData.append(item, data[item][0])
      } else {
        formData.append(item, data[item])
      }
    })
    
    axiosInstance
      .post('/client/profile/update/' + phoneNumberUser, formData)
      .then((res) => {
        setLoadingFlag(false)
        setWORS('success')
        let msg = (
          <div>
            <img src={Check} alt="مشکل آپلود" style={{ width: '70px' }} />
            <br /> <br /> ثبت ویرایش با موفقیت انجام شد
          </div>
        )
        setMsgSweet(msg)
        setShowSweet(true)
      })
      .catch((e) => {
        setLoadingFlag(false)
        setWORS('warning')
        setMsgSweet('عملیات با خطا مواجه شده')
        setShowSweet(true)
      })
  }

  const sendPass = (prePass, newPass, newPass2) => {
    setLoadingFlag(true)
    console.log(prePass, newPass, newPass2, 'prePass , newPass , newPass2')
    const phoneNumberUser = JSON.parse(localStorage.getItem('phoneNumberUser'))
    axiosInstance
      .post('/client/profile/passss/' + phoneNumberUser + '/', {})
      .then((res) => {
        setLoadingFlag(false)

        console.log(res, 'res update')
        setWORS('success')
        let msg = (
          <div>
            <img src={Check} alt="مشکل آپلود" style={{ width: '70px' }} />
            <br /> <br /> ثبت ویرایش با موفقیت انجام شد
          </div>
        )
        setMsgSweet(msg)
        setShowSweet(true)
      })
      .catch((e) => {
        setLoadingFlag(false)
        console.log(e, 'E')
        setWORS('warning')
        setMsgSweet('عملیات با خطا مواجه شده')
        setShowSweet(true)
      })
  }

  const handleImage = (input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader()
      reader.onload = function (e) {
        setProfileImg(e.target.result)
      }
      reader.readAsDataURL(input.files[0])
    }
  }
  return (
    <React.Fragment>
      {hiddenView == false ? (
        <section className="profileSection">
          <CheckLogin setHiddenview={setHiddenView} />
          {showSweet ? (
            <SweetAlert
              warning={warningFlag}
              show={showSweet}
              style={{
                color: '#fff',
                backgroundColor: ' rgb(182 178 178 / 52%)',
                borderRadius: '30px',
              }}
              title={msgSweet}
              onConfirm={() => setShowSweet(false)}
              onCancel={() => setShowSweet(false)}
              customButtons={
                <React.Fragment>
                  <button
                    onClick={() => {
                      if (WORS === 'success') {
                      }
                      setShowSweet(false)
                      setWarningFlag(false)
                      setSuccessFlag(false)
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

          {loadingFlag ? (
            <LottieAnimation lotti={lottie} height={'70vh'} width={'25%'} />
          ) : (
            <>
              <div className="container">
                <div className="row  text-right">
                  <div className="col-md-12 col-12">
                    <div className="row ltr">
                      <TopBar />
                    </div>
                    <p>ویرایش اطلاعات شخصی</p>
                  </div>
                  <div className="col-md-12">
                    <form
                      className="EditFrom"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="row">
                        <div className="col-md-8 col-12 m-auto ">
                          <div className="row">
                            <div className="col-md-5">
                              <div className="imgProfileDiv">
                                <div>
                                  <img
                                    src={profileImg}
                                    className="img"
                                    style={{ borderRadius: '50%' }}
                                    alt="user"
                                  />
                                  <div
                                    style={{
                                      position: 'absolute',
                                      right: '60%',
                                      top: '70%',
                                    }}
                                    onChange={(e) => handleImage(e.target)}
                                  >
                                    <label
                                      style={{
                                        width: '50px',
                                        cursor: 'pointer',
                                      }}
                                      htmlFor="image"
                                    >
                                      <img src={plus} alt="" />
                                    </label>
                                    <input
                                      style={{ display: 'none' }}
                                      type="file"
                                      id="image"
                                      name="image"
                                      {...register('image')}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-7 text-right align-self-center">
                              <input
                                type="text"
                                placeholder="نام کاربری"
                                className="inputsform"
                                name="username"
                                id="username"
                                {...register('username', {
                                  required: 'لطفا نام کاربری را وارد کنید.',
                                  minLength: {
                                    value: 5,
                                    message: 'لطفا حداقل 5 کارکتر وارد کنید',
                                  },
                                  maxLength: {
                                    value: 20,
                                    message: 'لطفا حداکثر 20 کارکتر وارد کنید',
                                  },
                                })}
                              />
                              {errors.username && (
                                <p style={{ color: 'red' }}>
                                  {errors.username.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12 text-right">
                          <input
                            type="text"
                            placeholder="نام"
                            className="inputsform"
                            name="NameUser"
                            id="firstName"
                            {...register('firstName', {
                              required: 'نام را وارد کنید',
                              pattern: {
                                value: /^[\u0600-\u06FF\s]+$/,
                                message: 'لطفا حروف وارد کنید',
                              },
                            })}
                          />
                          {errors.firstName && (
                            <p style={{ color: 'red' }}>
                              {errors.firstName.message}
                            </p>
                          )}
                        </div>
                        <div className="col-md-6 col-12 text-right">
                          <input
                            type="text"
                            placeholder="نام خانوادگی"
                            className="inputsform"
                            name="lastName"
                            id="lastName"
                            {...register('lastName', {
                              required: 'نام خانوادگی را وارد کنید',
                              pattern: {
                                value: /^[\u0600-\u06FF\s]+$/,
                                message: 'لطفا حروف وارد کنید',
                              },
                            })}
                          />
                          {errors.lastName && (
                            <p style={{ color: 'red' }}>
                              {errors.lastName.message}
                            </p>
                          )}
                        </div>
                        <div className="col-md-4 col-12">
                          <div className="SelectBox">
                            <select {...register('gender')}>
                              <option value="male">آقا</option>
                              <option value="female">خانوم</option>
                              <option value="other"> نامعلوم</option>
                            </select>
                            <div className="chevron">جنسیت</div>
                          </div>
                        </div>

                        <div className="col-md-4 col-12 ">
                          <div className="SelectBox">
                            <select {...register('age')}>
                              <option value="10-20">10-20</option>
                              <option value="20-30">20-30</option>
                              <option value="30-40">30-40</option>
                              <option value="40-50">40-50</option>
                              <option value="50-60">50-60</option>
                              <option value="60-70">60-70</option>
                            </select>
                            <div className="chevron">سن</div>
                          </div>
                        </div>

                        <div className="col-md-4 col-12">
                          <div className="SelectBox">
                            <select {...register('city')}>
                              <option value="تهران">تهران</option>
                              <option value="مازندران">مازندران</option>
                              <option value="اصفهان">اصفهان</option>
                              <option value="خراسان">خراسان رضوی</option>
                            </select>
                            <div className="chevron">شهر</div>
                          </div>
                        </div>
                        <div className="col-md-4 col-12 text-right">
                          <input
                            type="tel"
                            className="inputsform"
                            placeholder="شماره موبایل"
                            maxLength="11"
                            name="phoneNumber"
                            id="phoneNumber"
                            {...register('phoneNumber', {
                              required: 'لطفا شماره موبایل را وارد کنید',
                              pattern: {
                                value: /^\d+$/,
                                message: 'لطفا فقط عدد وارد کنید',
                              },
                              minLength: {
                                value: 10,
                                message: 'کمتر از 10 کاراکتر وارده کرده اید',
                              },
                            })}
                          />
                          {errors.phoneNumber && (
                            <p style={{ color: 'red' }}>
                              {errors.phoneNumber.message}
                            </p>
                          )}
                        </div>
                        <div className="col-md-4 col-12 text-right">
                          <input
                            type="tel"
                            maxLength="10"
                            className="inputsform"
                            placeholder="کد ملی"
                            name="nationalCode"
                            id="nationalCode"
                            {...register('nationalCode', {
                              required: 'لطفا کد ملی را وارد کنید',
                              pattern: {
                                value: /^\d+$/,
                                message: 'لطفا فقط عدد وارد کنید',
                              },
                              minLength: {
                                value: 10,
                                message: 'کمتر از 10 کاراکتر وارده کرده اید',
                              },
                            })}
                          />
                          {errors.nationalCode && (
                            <p style={{ color: 'red' }}>
                              {errors.nationalCode.message}
                            </p>
                          )}
                        </div>
                        <div className="col-md-4 col-12 text-right">
                          <input
                            className="inputsform"
                            placeholder="نام پدر"
                            name="fatherName"
                            id="fatherName"
                            {...register('fatherName', {
                              required: 'لطفا نام پدر را وارد کنید',
                            })}
                          />
                          {errors.fatherName && (
                            <p style={{ color: 'red' }}>
                              {errors.fatherName.message}
                            </p>
                          )}
                        </div>

                        <div className="col-md-8 m-auto">
                          <div className="row">
                            <div className="col-md-12 col-12 text-right">
                              <input
                                type="number"
                                placeholder="شماره کارت بانکی"
                                className="inputsform"
                                name="cardNumber"
                                id="cardNumber"
                                {...register('cardNumber', {
                                  required: 'لطفا شماره کارت را وارد کنید.',
                                  minLength: {
                                    value: 16,
                                    message: 'لطفا حداقل 16 کارکتر وارد کنید',
                                  },
                                  pattern: {
                                    value: /^.{16}$/,
                                    message: 'لطفا حداکثر 16 کارکتر وارد کنید',
                                  },
                                })}
                              />
                              {errors.cardNumber && (
                                <p style={{ color: 'red' }}>
                                  {errors.cardNumber.message}
                                </p>
                              )}
                            </div>
                            <div className="col-md-12 col-12 text-right">
                              <input
                                type="number"
                                placeholder="شماره حساب بانکی"
                                className="inputsform"
                                name="bankAccountNumber"
                                id="bankAccountNumber"
                                {...register('bankAccountNumber', {
                                  required: 'لطفا شماره حساب را وارد کنید.',
                                  minLength: {
                                    value: 13,
                                    message: 'لطفا حداقل 13 کارکتر وارد کنید',
                                  },
                                  pattern: {
                                    value: /^.{13}$/,
                                    message: 'لطفا حداکثر 13 کارکتر وارد کنید',
                                  },
                                })}
                              />
                              {errors.bankAccountNumber && (
                                <p style={{ color: 'red' }}>
                                  {errors.bankAccountNumber.message}
                                </p>
                              )}
                            </div>
                            <div className="col-md-12 col-12 text-right">
                              <input
                                type="text"
                                placeholder="شماره شبا"
                                className="inputsform"
                                name="shabaNumber"
                                id="shabaNumber"
                                {...register('shabaNumber', {
                                  required: 'لطفا شماره شبا را وارد کنید.',
                                  minLength: {
                                    value: 24,
                                    message: 'لطفا حداقل 24 کارکتر وارد کنید',
                                  },
                                  pattern: {
                                    value: /^.{24}$/,
                                    message: 'لطفا حداکثر 24 کارکتر وارد کنید',
                                  },
                                })}
                              />
                              {errors.shabaNumber && (
                                <p style={{ color: 'red' }}>
                                  {errors.shabaNumber.message}
                                </p>
                              )}
                            </div>
                            <div className="col-md-12 col-12 text-right">
                              <textarea
                                rows="5"
                                placeholder="آدرس محل سکونت"
                                className="inputsform"
                                {...register('address', {
                                  required: 'لطفا آدرس محل سکونت را وارد کنید.',
                                })}
                              />
                              {errors.address && (
                                <p style={{ color: 'red' }}>
                                  {errors.address.message}
                                </p>
                              )}
                            </div>
                            <div className="col-md-12 col-12 text-right">
                              <input
                                type="email"
                                placeholder="پست الکترونیکی"
                                name="EmailUser"
                                className="inputsform"
                                id="EmailUser"
                                {...register('email', {
                                  required: 'لطفا ایمیل را وارد کنید.',
                                  pattern: {
                                    value: /^(([^<>()[\].,;:\s@]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                                    message: 'ایمیل وارد شده نامعتبر است',
                                  },
                                })}
                              />
                              {errors.email && (
                                <p style={{ color: 'red' }}>
                                  {errors.email.message}
                                </p>
                              )}
                            </div>
                            <div className="col-md-12 col-12 text-center">
                              <input
                                type="submit"
                                className="Submitbtn"
                                value="ثبت ویرایش"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      ) : (
        <></>
      )}
    </React.Fragment>
  )
}

export default EditProfile
