import * as React from 'react'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import { loadTeamPreview } from '../../store/teams'
import { loadUserPreview } from '../../store/users'
import { loadAccountInfo } from '../../store/account'
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout

interface NavigationProps extends RouteComponentProps<{}> {
  loadAccountInfo: () => void,
  loadTeamPreview: () => void,
  loadUserPreview: () => void
}

interface NavigationState {
  collapsed: boolean
}

class Navigation extends React.Component<NavigationProps, NavigationState> {
  state = {
    collapsed: false
  }

  componentDidMount () {
    this.props.loadAccountInfo()
    this.props.loadTeamPreview()
    this.props.loadUserPreview()
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
          <Menu.Item key="3">
            <Link to="/connections">
            <Icon type="link" />
              <span>Connections</span>
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
const mapDispatchToProps = (dispatch: Dispatch<{}>) => (
  bindActionCreators({ loadAccountInfo, loadTeamPreview, loadUserPreview }, dispatch)
)

// Weird typescript error occuring with the as any
export default withRouter(connect<NavigationProps>(null, mapDispatchToProps)(Navigation)) as any
