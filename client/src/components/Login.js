import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

class Login extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    login: null,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleAuthentication = (event) => {
    event.preventDefault();

    //Assigns {result: true} or {result: false} to state.login
    fetch("http://localhost:9000/login/login", {
      method: "post",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState(
          {
            login: data,
          },
          () => {
            //Callback function after states been updated.
            if (this.state.login.result === true) {
              console.log("Sucessful login");
              this.props.history.push({
                pathname: "/home",
                name: this.state.name,
                email: this.state.email,
              });
            } else if (this.state.login.result === false) {
              console.log("Incorrect credentials");
            }
          }
        )
      );
  };

  render() {
    return (
      <div>
        <div className="sidenav">
          <div className="login-main-text">
            <h2>Login</h2>
            <p>Enter your email and password to continue.</p>
          </div>
        </div>
        <div className="main">
          <div className="col-md-4 col-sm-12">
            <div className="login-form">
              <form onSubmit={this.handleAuthentication}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={this.state.password}
                    name="password"
                    onChange={this.handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-black">
                  Login
                </button>
                <Link to="/signup">
                  <button type="submit" className="btn btn-secondary">
                    Register
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
