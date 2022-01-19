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
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
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
      .then(() => this.noErrors() ? closeModal() : e.stopPropagation())
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
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);
