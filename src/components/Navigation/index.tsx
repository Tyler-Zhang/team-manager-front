import * as React from 'react'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout

interface NavigationProps extends RouteComponentProps<any> {}

interface NavigationState {
  collapsed: boolean
}

class Navigation extends React.Component<NavigationProps, NavigationState> {
  state = {
    collapsed: false
  }

  onCollapse = (collapsed: boolean) => this.setState({ collapsed })

  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible={true}
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Link to="/users">
            <Icon type="user" />
              <span>Users</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/teams">
            <Icon type="team" />
              <span>Team</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        {this.props.children}
      </Layout>
    </Layout>
    )
  }
}

export default withRouter<NavigationProps>(Navigation)
