import * as React from 'react'
import { Button, Form, Input, Row, Radio, message, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { API_POST_TEAMS } from '../../../constants/api'
import axios from '../../../utils/axios'
import { UserPreview } from '../../../types'

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

interface AddTeamFormProps extends FormComponentProps {
  users: UserPreview[]
}

class AddTeamForm extends React.Component<AddTeamFormProps , {}> {
  handleSubmit = (event: any) => {
    event.preventDefault()
    this.props.form.validateFields(async (errors, values) => {
      if (errors) { return } 
      
      try {
        await axios.post(API_POST_TEAMS, values)
        message.success(`Created team: ${values.name}`)
        this.props.form.resetFields()
        
      } catch (e) {
        message.error(`${e.message}: ${e.response.data.message}`, 3)
      }
    })
  }

  caseInsensitiveSearch (str1: any, str2: any) {
    if (typeof str1 !== 'string' || typeof str2 !== 'string') { return false }
    return str1.toLowerCase().indexOf(str2.toLowerCase()) !== -1
  }

  render () {
    const { getFieldDecorator } = this.props.form
    
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="Name">
          {
            getFieldDecorator('name', { 
              rules: [
                { required: true, message: 'Input a team name' }
            ]})(<Input />)
          }
        </FormItem>
        <FormItem {...formItemLayout} label="Users">
          {
            getFieldDecorator('users')(
              <Select
                mode="multiple"
                tokenSeparators={[',']}
                filterOption={(input, option) => this.caseInsensitiveSearch(option.props.children, input)}
              >
                {
                  this.props.users.map(user => (
                    <Select.Option 
                      key={user.id} 
                      value={user.id + ''}
                    >{`${user.firstName} ${user.lastName}`}
                    </Select.Option>
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

export default Form.create()(AddTeamForm)
