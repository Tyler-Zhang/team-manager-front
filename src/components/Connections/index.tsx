import * as React from 'react'
import { Layout, Row, Col, Card, Icon, Spin, Avatar, Tooltip } from 'antd'
import { bindActionCreators } from 'redux'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RootStore } from '../../store'
import { UserInfo, LoadState } from '../../types/index'
import { API_REDIRECT_GOOGLE } from '../../constants/api'

const { Header, Footer, Sider, Content } = Layout

interface ConnectionPageProps {
  account: UserInfo | null,
  loadState: LoadState
}

class ConnectionPage extends React.Component<ConnectionPageProps, {}> {
  renderGoogleItem () {
    const authed = (this.props.account as UserInfo).googleAuth

    let action

    if (authed) {
      action = (
        <Tooltip title="Disconnect">
          <Icon type="delete"/>
        </Tooltip>
      )
    } else {
      action = (
        <Tooltip title="Connect">
          <a href={API_REDIRECT_GOOGLE}><Icon type="link"/></a>
        </Tooltip>
      )
    }

    return (
      <Card 
        title="Google Drive"
        actions={[ action ]} 
      >
        <Card.Meta
          avatar={<Avatar icon="google"/>}
          description={`Connect to Google drive to upload files to your teams`}
        />
        <br/>
        {authed ? 'You are currently connected' : 'You are not connected'}
      </Card>
    )

  }

  render () {
    return (
      <div>
        <Header style={{ background: '#fff'}}>
          <h3> Connections </h3>
        </Header>
        <Content>
          <br/>
          <Row>
            <Col span={12} offset={6}>
              <Row>
                <p>This page manages your connections to outside services</p>
              </Row>
              {
                this.props.loadState !== LoadState.loaded ?
                <Spin/>
                :
                <Row>
                  {this.renderGoogleItem()}
                </Row>
              }
            </Col>
          </Row>
          
        </Content>
      </div>
    )
  }
}

const mapStateToProps = (state: RootStore) => ({
  account:  state.account.info,
  loadState: state.account.loadState
})

export default connect(mapStateToProps, null)(ConnectionPage)
