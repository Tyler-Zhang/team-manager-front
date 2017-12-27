import * as React from 'react'
import { Layout, Button } from 'antd'
import { bindActionCreators } from 'redux'
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import { loadUsers } from '../../store/users'

import UsersTable from './UsersTable'
import AddUserModal from './AddUserModal'
import { Flex } from 'reflexbox';

const { Header, Footer, Sider, Content } = Layout

interface UsersPageProps {
  loadUsers: () => any
}

class UsersPage extends React.Component<UsersPageProps, {}> {
  componentDidMount () {
    this.props.loadUsers()
  }
  
  render () {
    return (
      <div>
        <Header style={{ background: '#fff'}}>
          <Flex justify="space-between">
            <h3> Users Page </h3>
            <Flex align="center" justify="space-between">
              <Button type="dashed" icon="reload" onClick={this.props.loadUsers}/>
              <div style={{width: 10}}/>
              <AddUserModal/>
            </Flex>
          </Flex>
        </Header>
        <Content>
          <UsersTable/>
        </Content>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<{}>) => bindActionCreators(
  {
    loadUsers
  }, 
  dispatch)

export default connect(null, mapDispatchToProps)(UsersPage)
