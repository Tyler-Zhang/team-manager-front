import * as React from 'react'
import { Button, Form, Input, Row, Radio, message, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { API_POST_USERS } from '../../../constants/api'
import axios from '../../../utils/axios'
import { Authority, TeamPreview } from '../../../types'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

interface AddUserFormProps extends FormComponentProps {
  teams: TeamPreview[]
}

class AddUserForm extends React.Component<AddUserFormProps , {}> {
  handleSubmit = (event: any) => {
    event.preventDefault()
    this.props.form.validateFields(async (errors, values) => {
      if (errors) { return } 
      
      try {
        await axios.post(API_POST_USERS, values)
        message.success(`Created user for ${values.firstName} ${values.lastName}`)
        this.props.form.resetFields()
        
      } catch (e) {
        message.error(`${e.message}: ${e.response.data.message}`, 10000)
      }

    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="Email">
          {
            getFieldDecorator('email', { 
              rules: [
                { type: 'email', message: 'Input is not a valid email' },
                { required: true, message: 'Input a email' }
            ]})(<Input />)
          }
        </FormItem>
        <FormItem {...formItemLayout} label="Password">
          {
            getFieldDecorator('password', { 
              rules: [
                { required: true, message: 'Input a password' }
              ], 
              initialValue: '1234'
            })(<Input />)
          }
        </FormItem>
        <FormItem {...formItemLayout} label="First Name">
          {
            getFieldDecorator('firstName', { 
              rules: [{ required: true, message: 'Input a first name' }]
            })(<Input />)
          }
        </FormItem>
        <FormItem {...formItemLayout} label="Last Name">
          {
            getFieldDecorator('lastName', { 
              rules: [{ required: true, message: 'Input a last name' }]
            })(<Input />)
          }
        </FormItem>
        <FormItem {...formItemLayout} label="Address">
          {
            getFieldDecorator('address')(<Input />)
          }
        </FormItem>
        <FormItem {...formItemLayout} label="Phone number">
          {
            getFieldDecorator('phoneNumber')(<Input />)
          }
        </FormItem>
        <FormItem {...formItemLayout} label="Authority">
          {
            getFieldDecorator('authority', {
              rules: [{ required: true, message: 'Please specifiy authority' }],
              initialValue: Authority.member
            })(
              <Radio.Group>
                {
                  Object.keys(Authority).map(v => (
                    <Radio.Button value={v} key={v}>{v}</Radio.Button>
                  ))
                }
              </Radio.Group>
            )
          }
        </FormItem>
        <FormItem {...formItemLayout} label="Teams">
          {
            getFieldDecorator('teams')(
              <Select
                mode="multiple"
                tokenSeparators={[',']}
                filterOption={(input, option) => (option.props.children as string).indexOf(input) !== -1}
              >
                {
                  this.props.teams.map(team => (
                    <Select.Option key={team.id} value={team.id + ''}>{team.name}</Select.Option>
                  ))
                }
              </Select>
            )
          }
        </FormItem>
        <FormItem {...formItemLayout}>
          <Button 
            type="primary"
            htmlType="submit"
          >Submit
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(AddUserForm)
