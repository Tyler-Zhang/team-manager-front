import * as React from 'react'
import { Layout, Button, Input, Row, Col } from 'antd'
import { bindActionCreators } from 'redux'
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import { loadUsers, changeQuery } from '../../store/users'

import UsersTable from './UsersTable'
import AddUserModal from './AddUserModal'
import { Flex } from 'reflexbox';
import { ApiFindQuery, User } from '../../types/index';

const { Header, Footer, Sider, Content } = Layout

interface UsersPageProps {
  loadUsers: () => any
  changeQuery: (query: Partial<ApiFindQuery<User>>) => any
}

class UsersPage extends React.Component<UsersPageProps, {}> {
  componentDidMount () {
    this.props.loadUsers()
  }

  onSearch = (q: string) => {
    this.props.changeQuery({ q })
    this.props.loadUsers()
  }
  
  render () {
    return (
      <Layout>
        <Header style={{ background: '#fff'}}>
          <Row>
            <Col span={4}><h3> Users Page </h3></Col>
            <Col span={8}>
              <Input.Search
                  placeholder="Search here"
                  onSearch={this.onSearch}
                  enterButton={true}
              />
            </Col>
            <Col span={4} offset={8}>
              <Flex align="center" justify="flex-end">
                <Button type="dashed" icon="reload" onClick={this.props.loadUsers}/>
                <div style={{width: 10}}/>
                <AddUserModal/>
              </Flex>
            </Col>
          </Row>
        </Header>
        <Content>
          <UsersTable/>
        </Content>
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<{}>) => bindActionCreators(
  {
    loadUsers,
    changeQuery
  }, 
  dispatch)

export default connect(null, mapDispatchToProps)(UsersPage)
