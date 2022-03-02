import React, { Component } from "react";
import "./styles.css";
import intro_mobile from "./assets/img/logo3.png";
import logo from "./assets/img/logo1.png"
import git_logo from "./assets/img/GitHub-Mark-32px.png"
import rpi_logo from "./assets/img/rpi_logo.png"
import {Helmet} from "react-helmet";

class landing extends Component {
  render() {
    return (
      <div>
        <Helmet>
                <meta charSet="utf-8" />
                <title>TutorBase</title>
        </Helmet>

        <header id="header-wrap">
          {/* Navbar Start */}
          <nav className="navbar navbar-expand-md bg-inverse fixed-top scrolling-navbar">
            <div className="container navbar-style">
              {/* Brand and toggle get grouped for better mobile display */}
              <a href="index.html" className="navbar-brand">
                <img src={logo} alt />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarCollapse"
                aria-controls="navbarCollapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="lni-menu" />
              </button>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto w-100 justify-content-end clearfix">
                  <li className="nav-item active">
                    <a className="nav-link" href="#hero-area">
                      Home
                      </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#services">
                      Services
                      </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#team">
                      Team
                      </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#contact">
                      Contact
                      </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {/* Navbar End */}
          {/* Hero Area Start */}
          <div id="hero-area" className="hero-area-bg">
            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12">
                  <div className="contents">
                    <h2 className="head-title">In-demand RPI tutors.</h2>
                    <h2>On-demand.</h2>
                    <p>Find the help you need with confidence for any offered class on RPI's very first remote, hiring platform for students.</p>
                    <div className="header-button">
                      <a
                        href="/login"
                        className="btn btn-border video-popup"
                      >
                        Log In
                        </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12">
                  <div className="intro-img">
                    <img className="img-fluid" src={intro_mobile} alt />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Hero Area End */}
        </header>
        {/* Services Section Start */}
        <section id="services" className="section-padding">
          <div className="container">
            <div className="section-header text-center">
              <h2
                className="section-title wow fadeInDown"
                data-wow-delay="0.3s"
              >
                Find the help you need in three easy steps.
                </h2>
              <div className="shape wow fadeInDown" data-wow-delay="0.3s" />
            </div>
            <div className="row">
              {/* Services item */}
              <div className="col-md-6 col-lg-4 col-xs-12">
                <div
                  className="services-item wow fadeInRight"
                  data-wow-delay="0.3s"
                >
                  <div className="icon">
                    <i className="lni-cog" />
                  </div>
                  <div className="services-content">
                    <h3>
                      <a href="#">1. Create an account - it's free</a>
                    </h3>
                    <p>
                      Register a TutorBase client account through your RPI email.
                      </p>
                  </div>
                </div>
              </div>
              {/* Services item */}
              <div className="col-md-6 col-lg-4 col-xs-12">
                <div
                  className="services-item wow fadeInRight"
                  data-wow-delay="0.6s"
                >
                  <div className="icon">
                    <i className="lni-stats-up" />
                  </div>
                  <div className="services-content">
                    <h3>
                      <a href="#">2. Use our search tool</a>
                    </h3>
                    <p>
                      Let us know what subject and class you need help in to let us accommodate you! Preferred working location? COVID-19 friendly?
                      </p>
                  </div>
                </div>
              </div>
              {/* Services item */}
              <div className="col-md-6 col-lg-4 col-xs-12">
                <div
                  className="services-item wow fadeInRight"
                  data-wow-delay="0.9s"
                >
                  <div className="icon">
                    <i className="lni-users" />
                  </div>
                  <div className="services-content">
                    <h3>
                      <a href="#">3. Pick your best match</a>
                    </h3>
                    <p>
                      From your given information, we'll generate you a list of available tutors to choose from!
                      </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Services Section End */}
        <div>
          {/* Features Section Start */}
          <section id="features" className="section-padding">
            <div className="container">
              <div className="section-header text-center">
                <h2
                  className="section-title wow fadeInDown"
                  data-wow-delay="0.3s"
                >
                  Application Features
                  </h2>
                <div className="shape wow fadeInDown" data-wow-delay="0.3s" />
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                  <div className="content-left">
                    <div
                      className="box-item wow fadeInLeft"
                      data-wow-delay="0.3s"
                    >
                      <span className="icon">
                        <i className="lni-rocket" />
                      </span>
                      <div className="text">
                        <h4>Verified Tutors</h4>
                        <p>
                          Each tutor is verified by it's department or ALAC. You can ensure each tutor knows their stuff!
                          </p>
                      </div>
                    </div>
                    <div
                      className="box-item wow fadeInLeft"
                      data-wow-delay="0.6s"
                    >
                      <span className="icon">
                        <i className="lni-laptop-phone" />
                      </span>
                      <div className="text">
                        <h4>Full Meeting History</h4>
                        <p>
                          Past, present and current appointments are visible in a easy to read format
                          </p>
                      </div>
                    </div>
                    <div
                      className="box-item wow fadeInLeft"
                      data-wow-delay="0.9s"
                    >
                      <span className="icon">
                        <i className="lni-cog" />
                      </span>
                      <div className="text">
                        <h4>Data Analytics</h4>
                        <p>
                          Visualize your engagements over many unique metrics to evaluate your performance.
                          </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                  <div className="content-right">
                    <div
                      className="box-item wow fadeInRight"
                      data-wow-delay="0.3s"
                    >
                      <span className="icon">
                        <i className="lni-leaf" />
                      </span>
                      <div className="text">
                        <h4>Intuitive Scheduling</h4>
                        <p>
                          Find your needed tutor in under 5 simple steps.
                          </p>
                      </div>
                    </div>
                    <div
                      className="box-item wow fadeInRight"
                      data-wow-delay="0.6s"
                    >
                      <span className="icon">
                        <i className="lni-layers" />
                      </span>
                      <div className="text">
                        <h4>Fast Notifications</h4>
                        <p>
                          Recieve reminders to your email for new and upcoming appointments.
                          </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Features Section End */}
          <section id="team" className="section-padding bg-gray">
            <div className="container">
              <div className="section-header text-center">
                <h2
                  className="section-title wow fadeInDown animated"
                  data-wow-delay="0.3s"
                  style={{
                    visibility: "visible",
                    WebkitAnimationDelay: "0.3s",
                    MozAnimationDelay: "0.3s",
                    animationDelay: "0.3s",
                  }}
                >
                  Meet our team
                  </h2>
                <div
                  className="shape wow fadeInDown animated"
                  data-wow-delay="0.3s"
                  style={{
                    visibility: "visible",
                    WebkitAnimationDelay: "0.3s",
                    MozAnimationDelay: "0.3s",
                    animationDelay: "0.3s",
                  }}
                />
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-12 col-xs-12">
                  <div
                    className="team-item wow fadeInRight animated"
                    data-wow-delay="0.2s"
                    style={{
                      visibility: "visible",
                      WebkitAnimationDelay: "0.2s",
                      MozAnimationDelay: "0.2s",
                      animationDelay: "0.2s",
                    }}
                  >
                    <div className="team-img">
                      <img
                        className="img-fluid"
                        //src="assets/img/team/team-01.png"
                        alt
                      />
                    </div>
                    <div className="contetn">
                      <div className="info-text">
                        <h3>
                          <a href="#">Jason Nguyen</a>
                        </h3>
                        <p>Project Manager</p>
                      </div>
                      <p>
                        Junior / CS
                        </p>
                      <ul className="social-icons">
                        <li>
                          <a href="#">
                            <i
                              className="lni lni-facebook-filled"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i
                              className="lni lni-twitter-filled"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i
                              className="lni lni-instagram-filled"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-xs-12">
                  <div
                    className="team-item wow fadeInRight animated"
                    data-wow-delay="0.4s"
                    style={{
                      visibility: "visible",
                      WebkitAnimationDelay: "0.4s",
                      MozAnimationDelay: "0.4s",
                      animationDelay: "0.4s",
                    }}
                  >
                    <div className="team-img">
                      <img
                        className="img-fluid"
                        //src="assets/img/team/team-02.png"
                        alt
                      />
                    </div>
                    <div className="contetn">
                      <div className="info-text">
                        <h3>
                          <a href="#">Jeremy Weiss</a>
                        </h3>
                        <p>Project Manager</p>
                      </div>
                      <p>
                        Junior / CS
                        </p>
                      <ul className="social-icons">
                        <li>
                          <a href="#">
                            <i
                              className="lni lni-facebook-filled"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i
                              className="lni lni-twitter-filled"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i
                              className="lni lni-instagram-filled"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Section Start */}
          <footer id="footer" className="footer-area section-padding">
            <div className="container">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 col-mb-12">
                    <div className="widget">
                      <h3 className="footer-logo">
                        <a href="https://rpi.edu/">
                          <img src={rpi_logo} alt />
                        </a>
                      </h3>
                      <div className="textwidget">
                        <p>
                          Made it down this far?
                          </p>
                      </div>
                      <div className="social-icon">
                        <a className="facebook" href="#">
                          <i className="lni-facebook-filled" />
                        </a>
                        <a className="twitter" href="#">
                          <i className="lni-twitter-filled" />
                        </a>
                        <a className="instagram" href="#">
                          <i className="lni-instagram-filled" />
                        </a>
                        <a className="linkedin" href="#">
                          <i className="lni-linkedin-filled" />
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                    <h3 className="footer-titel">Products</h3>
                    <ul className="footer-link">
                      <li>
                        <a href="#">Tracking</a>
                      </li>
                      <li>
                        <a href="#">Application</a>
                      </li>
                      <li>
                        <a href="#">Resource Planning</a>
                      </li>
                      <li>
                        <a href="#">Enterprise</a>
                      </li>
                      <li>
                        <a href="#">Employee Management</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                    <h3 className="footer-titel">Resources</h3>
                    <ul className="footer-link">
                      <li>
                        <a href="#">Payment Options</a>
                      </li>
                      <li>
                        <a href="#">Fee Schedule</a>
                      </li>
                      <li>
                        <a href="#">Getting Started</a>
                      </li>
                      <li>
                        <a href="#">Identity Verification</a>
                      </li>
                      <li>
                        <a href="#">Card Verification</a>
                      </li>
                    </ul>
                  </div> */}
                  <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                    <h3 className="footer-titel">Contact</h3>
                    <ul className="address">
                      <li>
                        <a href="#">
                          <i className="lni-map-marker" /> DCC 308{" "}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="lni-phone-handset" /> P: +1 111 111-1111
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="lni-envelope" /> E: tutorbaserpi@gmail.com
                        </a>
                      </li>
                      <li>
                        <a href="https://github.com/DangItJason/TutorBase">
                          <img src={git_logo} style={{maxWidth: "10%"}} alt="GitHub"/>
                        </a>
                        &nbsp; An
                        <a href="https://rcos.io/">
                          &nbsp;RCOS&nbsp;
                        </a>
                        project
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div id="copyright">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="copyright-content"></div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
            ;
          </div>
          ;
      </div>
    );
  }
}

export default landing;
