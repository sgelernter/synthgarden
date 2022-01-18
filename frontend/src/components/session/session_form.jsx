import React from 'react';
import { withRouter } from 'react-router-dom';

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
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(res => console.log(res))
  }

  componentWillUnmount() {
    this.props.removeSessionErrors();
  }

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
          {/* {this.renderErrors()} */}
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
