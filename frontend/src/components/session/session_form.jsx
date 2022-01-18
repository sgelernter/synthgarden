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
    // console.log(this.props.errors)
    this.handleErrors = this.handleErrors.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleErrors() {
    return Object.values(this.props.errors).length < 1
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    // const noErrors = (Object.values(this.props.errors).length < 1)
    console.log(Object.values(this.props.errors).length < 1)
    this.props.processForm(user)
      .then(this.handleErrors ? this.props.closeModal : () => e.stopPropogation())
  }

  // componentWillUnmount() {
  //   this.props.removeSessionErrors();
  // }

  // renderErrors() {
  //   return(
  //     <ul>
  //       {this.props.errors.map((error, i) => (
  //         <li key={`error-${i}`}>
  //           {error}
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // }

  render() {
    // console.log(Object.values(this.props.errors))
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
