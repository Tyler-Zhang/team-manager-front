import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Flex } from 'reflexbox'
import { Form, Icon, Input, Button } from 'antd'
import { API_LOGIN_ENDPOINT } from '../constants/api'
import axios from '../utils/axios'
import { FormComponentProps } from 'antd/lib/form/Form';

interface LoginProps extends RouteComponentProps<{}>, FormComponentProps { }

interface LoginState {
  email: string,
  password: string
}

class Login extends React.Component<LoginProps, LoginState> {
  async onSubmit (data: any) {
    console.log(data)

    await axios.post(API_LOGIN_ENDPOINT, data)
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Flex>
        <Form onSubmit={this.onSubmit}>
          <Form.Item>
            {
              getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input username'}]
              })(
                <Input prefix={<Icon type="email"/>} placeholder="Email" />
              )
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input password'}]
              })(
                <Input prefix={<Icon type="lock"/>} placeholder="Password" />
              )
            }
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
            >Login
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    )
  }
}

export default Form.create()(Login)
