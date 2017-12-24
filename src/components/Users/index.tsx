import * as React from 'react'
import { Layout, Row, Col } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UsersTable from './UsersTable'
import { loadUsers } from '../../store/users'
import { Dispatch } from 'redux';

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
          <h3> Users Page </h3>
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
