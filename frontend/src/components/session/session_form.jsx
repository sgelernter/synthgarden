import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../assets/stylesheets/session_form.scss';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.noErrors = this.noErrors.bind(this);
    this.handleDemoUser = this.handleDemoUser.bind(this)
    this.submitDemoUser = this.submitDemoUser.bind(this)
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleDemoUser(e) {
      this.setState({
          username: "demouser",
          email: "demo@demo.com",
          password: "password"
      })
      setTimeout(() => {
          this.submitDemoUser(e)
          this.props.closeModal()
      }, 1000)
  }

  submitDemoUser(e) {
      e.preventDefault();
      const demouser = Object.assign({}, this.state)
      this.props.processForm(demouser)
  }

  noErrors() {
    return Object.values(this.props.errors).length === 0
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user)
      .then(() => this.noErrors() ? this.props.closeModal() : e.stopPropagation())
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  renderErrors() {
    return(
        <ul className="errors">
          {Object.values(this.props.errors).map((error, i) => (
            <li key={`error-${i}`}>
              {error}
            </li>
          ))}
        </ul>
      );
  }
  
  render() {

    let demoUserButton;
    if (this.props.formType === 'login') {
        demoUserButton = <button className="demo-user-btn" onClick={this.handleDemoUser}>login as a guest</button>
    }

    const usernameField = (this.props.formType === 'signup' ? (
      <input type="text"
        value={this.state.username}
        onChange={this.update('username')}
        className="login-input"
        placeholder="Username"
      />
    ) : "" )

    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <h1>SynthGarden</h1>
          <br/>
          {/* {this.props.formType} or {this.props.otherForm} */}
          <div onClick={this.props.closeModal} className="close-x">x</div>
          <div className="login-form">
            <div className="inputFields">
              { usernameField }
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className="login-input"
                placeholder='Email'
              />
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
                placeholder='Password'
              />
            </div>
            {this.renderErrors()}
            <br/>
            <input className="session-submit" type="submit" value={this.props.formType} />
            <br/>
            {demoUserButton}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);
