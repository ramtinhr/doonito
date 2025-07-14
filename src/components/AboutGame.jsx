import React, { Component } from 'react';
import Qlogo from '../asset/img/Qlogo1.png';
import img3 from '../asset/img/img3.jpg';
// import banner from '../asset/img/banner.png';
import TopBar from './TopBar';
// import border from "../asset/img/border.png";
// import play from "../asset/img/play.svg";

class AboutGame extends Component {
  constructor(props) {
    super(props);
    // this.state = {fade: false}
  }

  render() {
    return (
      <div>
        <section className="aboutGSection">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <TopBar />
              </div>
              <div className="col-md-12 col-12 colContent">
                <div className="row rowContent">
                  <div className="col-md-12 mt-5">
                    <div className="row">
                      <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12 align-text-center">
                        <h1>بازی دونیتو</h1>
                        <hr className="lineS" />
                        <p className="pContent">
                          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                          چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                          بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و
                          برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع
                          با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
                          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه
                          و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری
                          را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و
                          فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می
                          توان امید داشت که تمام و دشواری موجود در ارائه
                          راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد
                          نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                          پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار
                          گیرد.
                        </p>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                        <div className="aboutImg1">
                          <img src={Qlogo} alt="img1" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 text-left my-4">
                    <div className="row">
                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                        <div className="aboutImg2">
                          <img src={img3} alt="img1" />
                        </div>
                      </div>
                      <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12 align-text-center">
                        <h1 className="NahveTitle">نحوه بازی</h1>
                        <hr className="lineS" />
                        <p className="pContent">
                          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                          چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                          بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و
                          برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع
                          با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
                          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه
                          و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری
                          را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و
                          فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می
                          توان امید داشت که تمام و دشواری موجود در ارائه
                          راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد
                          نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                          پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار
                          گیرد.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="row bggray p-0">
                                    <div
                                        className="col-md-12 text-left mt-4 p-0">
                                        <div className="row m-auto text-center">
                                            <h1 className='teachTitle'>ویدیو
                                                آموزشی</h1>
                                        </div>
                                        <div className="col-md-12 col-12 p-0">
                                            <div className="videoBox">
                                                <img src={banner} alt=" "
                                                     className="img-fluid teachVideo "/>
                                                <div className="playBox">
                                                    <div
                                                        onMouseEnter={() => this.setState({fade: true})}
                                                        onMouseLeave={() => this.setState({fade: false})}

                                                        // onClick={() => this.setState({ fade: true })}
                                                        // onAnimationEnd={() => this.setState({ fade: false })}
                                                        className={fade ? 'fade borderVideo' : 'fade-in borderVideo'}>
                                                        <img src={border} alt=""
                                                             className="img-fluid borderImg"/>

                                                        <img src={play}
                                                             className=' playIcon img-fluid'
                                                             alt=""/>

                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div> */}
              </div>
              {/* <div className="col-md-12 col-12">
                                <div className="row">
                                    <div
                                        className="col-md-4 col-12 text-center">
                                        <div className="card cardAbout">
                                            <div className="card-body">
                                                <div className="card-img"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="col-md-4 col-12 text-center">
                                        <div className="card cardAbout">
                                            <div className="card-body">
                                                <div className="card-img"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="col-md-4 col-12 text-center">
                                        <div className="card cardAbout">
                                            <div className="card-body">
                                                <div className="card-img"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default AboutGame;
