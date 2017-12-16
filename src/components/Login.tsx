import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Flex } from 'reflexbox'
// import { Form, Icon, Input, Button, Checkbox } from 'antd'
// import { API_LOGIN_ENDPOINT } from '../constants/api'

interface LoginProps extends RouteComponentProps<{}> { }

interface LoginState {
  email: string,
  password: string
}

export default class Login extends React.Component<LoginProps, LoginState> {
  state = {
    email: '',
    password: ''
  }

  render () {
    return (
      <Flex>
        {/* <Form>

        </Form> */}
      </Flex>
    )
  }
}
