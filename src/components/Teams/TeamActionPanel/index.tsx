import * as React from 'react'
import { Layout, Button, Input, Row, Col, message, Spin, Card, Divider, Alert } from 'antd'
import { bindActionCreators } from 'redux'
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import { Flex } from 'reflexbox';
import { ApiFindQuery, Team, UserInfo, Authority } from '../../../types/index';
import { RootStore } from '../../../store/index';
import { API_GET_TEAM_BY_ID } from '../../../constants/api'
import axios from '../../../utils/axios'

import AddFileModal, { PickedInfo } from './AddFileModal'

const { Header, Footer, Sider, Content } = Layout

interface TeamActionPanelProps {
  teamId: number | null
  account: UserInfo
}

interface TeamActionPanelState {
  team: Team | null
}

class TeamActionPanel extends React.Component<TeamActionPanelProps, TeamActionPanelState> {
  constructor(props: any) {
    super(props)

    this.state = { team: null }
  }

  loadTeamInfo = async (teamId: number | string) => {
    try {
      if (!teamId) { throw new Error('No teamId selected') }
      const team = await axios.get(API_GET_TEAM_BY_ID(teamId))
      this.setState({ team: team.data })
    } catch (e) {
      message.error(e.message, 3)
    }
  }

  onFilesSelected = (info: PickedInfo) => {
    console.log('selected', info)
  }

  componentDidMount () {
    if (this.props.teamId) { this.loadTeamInfo(this.props.teamId) }
  }

  componentWillReceiveProps (nextProps: TeamActionPanelProps) {
    if (nextProps.teamId) { this.loadTeamInfo(nextProps.teamId) }
  }
  
  render () {
    if (!this.props.teamId) {
      return <Card><h3>Select a team to view more info</h3></Card>
    }

    const team = this.state.team
    
    if (!team) {
      return <Card><Spin/>Loading Team...</Card>
    }

    return (
      <Card bordered={true}>
        <Row><h1>{team.name}</h1></Row>
        <Divider> Files </Divider>
        <Row type="flex">
          <Col span={10} offset={1}>
            <Card type="inner" title="Personal Google Drive" style={{height: '100%'}}>
              Add File from your personal google drive account
              <br/>
              <br/>
              <b>The file ownership will be transfered to team-manager</b>
              <br/>
              {
                this.props.account.googleAuth ?
                ''
                :
                <Alert type="error" message="You must be logged in with google"/>
              }
              <br/>
              <AddFileModal 
                title="Add file from personal drive"
                disabled={!this.props.account.googleAuth}
                onSelect={this.onFilesSelected}
              />
            </Card>
          </Col>
          <Col span={10} offset={2}>
          <Card type="inner" title="Team account" style={{height: '100%'}}>
              Add file from the team manager account
              <br/>
              <br/>
              {
                this.props.account.authority === Authority.admin ?
                ''
                :
                <Alert type="error" message="You must be an admin to do this"/>
              }
              <br/>
              <AddFileModal
                title="Add file from Team-manager drive"
                disabled={this.props.account.authority !== Authority.admin}
                onSelect={this.onFilesSelected}
              />
            </Card>
          </Col>
        </Row>
      </Card>
    )
  }
}

const mapStateToProps = (state: RootStore) => ({
  teamId: state.teams.selected,
  account: state.account.info
})

export default connect(mapStateToProps)(TeamActionPanel)
