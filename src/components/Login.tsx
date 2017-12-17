import * as React from 'react'
import { Flex } from 'reflexbox'
import { Form, Icon, Input, Button } from 'antd'
import { API_LOGIN } from '../constants/api'
import axios from '../utils/axios'
import { FormComponentProps } from 'antd/lib/form/Form';

interface LoginProps extends FormComponentProps { }

interface LoginState {
  email: string,
  password: string
}

class Login extends React.Component<LoginProps, LoginState> {
  onSubmit = (e: any) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      axios.post(API_LOGIN, values)
    })
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
