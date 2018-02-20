import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Box, Button, Heading, Input, Label, Message } from 'rebass';

import { login } from '../actions/auth';

class Login extends Component {
  state = { username: '', password: '' };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.login(username, password);
  };

  render() {
    const { authenticated, error, fetching, location } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };
    const { username, password } = this.state;

    if (authenticated) {
      return <Redirect to={from} />;
    }

    return (
      <Box py={4}>
        <Heading mb={3}>Please log in.</Heading>
        <Box mb={3} w={[1, 1 / 2, 1 / 3]}>
          {error && (
            <Message mb={2} bg="gray">
              {error}
            </Message>
          )}
          <form onSubmit={this.handleSubmit}>
            <Box mb={3}>
              <Label>Email</Label>
              <Input
                name="username"
                value={username}
                onChange={this.handleChange}
              />
            </Box>
            <Box mb={3}>
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                value={password}
                onChange={this.handleChange}
              />
            </Box>
            <Button type="submit" disabled={fetching}>
              {fetching ? 'Submitting' : 'Submit'}
            </Button>
          </form>
        </Box>
      </Box>
    );
  }
}

Login.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth: { authenticated, error, fetching } }) => ({
  authenticated,
  error,
  fetching
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);