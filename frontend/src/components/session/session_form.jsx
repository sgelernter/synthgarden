import React from 'react';
import { withRouter } from 'react-router-dom';
import { closeModal } from '../../actions/modal_actions';
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
    // console.log(Object.values(this.props.errors).length)
    return Object.values(this.props.errors).length === 0
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.removeSessionErrors();
    const user = Object.assign({}, this.state);
    // const noErrors = (Object.values(this.props.errors).length < 1)
    this.props.processForm(user)
      // .then(() => this.noErrors() ? this.closeModal() : console.log('IT WORKS'))
      .then(() => this.noErrors() ? this.props.closeModal() : e.stopPropagation())
    // const response = async (user) => this.props.processForm(user)
  }

  componentWillUnmount() {
    this.props.removeSessionErrors();
  }
  
  render() {
    if (Object.values(this.props.errors).length > 0) {
      this.errors = Object.values(this.props.errors).map((err, idx) => (
          <p key={idx}>{err}</p>
      ))
    }

    let demoUserButton;
    if (this.props.formType === 'login') {
        demoUserButton = <button className="demo-user-btn" onClick={this.handleDemoUser}>login as a guest</button>
    }

    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          SynthGarden
          <br/>
          {this.props.formType} or {this.props.otherForm}
          <div onClick={this.props.closeModal} className="close-x">x</div>
          <div className="login-form">
            <br/>
            <label>Username:
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="login-input"
              />
            </label><br/>
            <label>Email:
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className="login-input"
              />
            </label>
            <br/>
            <label>Password:
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
              />
            </label>
            <br/>
            <div className="errors">{this.errors}</div>
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
