import * as React from 'react'
import { Layout, Button, Input, Row, Col, message, Spin, Card, Divider, Alert } from 'antd'
import { bindActionCreators } from 'redux'
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import { Flex } from 'reflexbox';
import { ApiFindQuery, Team, UserInfo, Authority } from '../../../types/index';
import { RootStore } from '../../../store/index';
import { loadSelectedTeam } from '../../../store/teams'
import { API_GET_TEAM_BY_ID, API_GET_ADMIN_GOOGLE_TOKEN, API_GET_GOOGLE_TOKEN } from '../../../constants/api'
import axios from '../../../utils/axios'

import FileSection from './FileSection'

const { Header, Footer, Sider, Content } = Layout

interface TeamActionPanelProps {
  team: Team
  teamId: number
  loadSelectedTeam: () => any
}

class TeamActionPanel extends React.Component<TeamActionPanelProps, {}> {
  async getAdminToken () {
    try {
      const response = await axios.get(API_GET_ADMIN_GOOGLE_TOKEN)
      return response.data.token
    } catch (e) {
      message.error(e.message)
    }
  }

  async getUserToken () {
    try {
      const response = await axios.get(API_GET_GOOGLE_TOKEN)
      return response.data.token
    } catch (e) {
      message.error(e.message)
    }
  }

  componentDidMount () {
    if (this.props.teamId) {
      this.props.loadSelectedTeam()
    }
  }

  componentWillReceiveProps (nextProps: TeamActionPanelProps) {
    if (nextProps.teamId !== this.props.teamId) { 
      this.props.loadSelectedTeam()
    }
  }
  
  render () {
    if (!this.props.teamId) {
      return <Card><h3>Select a team to view more info</h3></Card>
    }

    const team = this.props.team
    
    if (team === null) {
      return <Card><Spin/>Loading Team...</Card>
    }

    return (
      <Card bordered={true}>
        <Row><h1>{team.name}</h1></Row>
        <Divider> Files </Divider>
        <Row>
          <h4>Add files with one of the following options:</h4>
        </Row>
        <Row>
          <FileSection />
        </Row>
      </Card>
    )
  }
}

const mapStateToProps = (state: RootStore) => ({
  team: state.teams.selectedTeam,
  teamId: state.teams.selectedId
})

const mapDispatchToProps = (dispatch: Dispatch<{}>) => (
  bindActionCreators({ loadSelectedTeam }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(TeamActionPanel)
