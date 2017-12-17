import * as React from 'react'
import { Layout, Row, Col } from 'antd'
import UsersTable from './UsersTable'

const { Header, Footer, Sider, Content } = Layout

export class UsersPage extends React.Component {
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
