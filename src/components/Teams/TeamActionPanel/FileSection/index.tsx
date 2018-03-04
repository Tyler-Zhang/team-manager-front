import * as React from 'react'
import { Layout, Button, Input, Row, Col, message, Spin, Card, Divider, Alert } from 'antd'
import { bindActionCreators } from 'redux'
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import { Flex } from 'reflexbox';
import { ApiFindQuery, Team, UserInfo, Authority } from '../../../../types/index';
import { RootStore } from '../../../../store/index';
import { loadSelectedTeam } from '../../../../store/teams';
import { 
  API_GET_TEAM_BY_ID,
  API_GET_ADMIN_GOOGLE_TOKEN,
  API_GET_GOOGLE_TOKEN,
  API_POST_TEAM_FILE 
} from '../../../../constants/api'
import axios from '../../../../utils/axios'

import AddFileModal, { PickedInfo } from './AddFileModal'
import TeamFiles from './TeamFiles'

const { Header, Footer, Sider, Content } = Layout

interface FileSectionProps {
  team: Team | null
  teamId: number | null
  loadSelectedTeam: () => any
  account: UserInfo | null
}

class FileSection extends React.Component<FileSectionProps, {} > {
  loadTeamInfo = async (teamId: number | string) => {
    try {
      if (!teamId) { throw new Error('No teamId selected') }
      const team = await axios.get(API_GET_TEAM_BY_ID(teamId))
      this.setState({ team: team.data })
    } catch (e) {
      message.error(e.message, 3)
    }
  }

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

  onFilesSelected = async (info: PickedInfo) => {
    try {
      const { teamId } = this.props
      if (!teamId) { return }
      
      const payload = {
        token: info.token,
        permission: info.permission,
        fileId: info.doc.id
      }

      await axios.post(API_POST_TEAM_FILE(teamId), payload)
    } catch (e) {
      message.error(e.message)
    }
  }
  
  render () {
    const { account, team } = this.props

    if (!account || !team) { return '' }

    return (
      <div>
        <Row type="flex">
          <Col span={11}>
            <Card type="inner" title="Personal Google Drive" style={{height: '100%'}}>
              Add File from your personal google drive account
              <br/>
              <br/>
              <b>The file ownership will be transfered to team-manager</b>
              <br/>
              {
                account.googleAuth ?
                ''
                :
                <Alert type="error" message="You must be logged in with google"/>
              }
              <br/>
              <AddFileModal 
                title="Add file from personal drive"
                disabled={!account.googleAuth}
                onSelect={this.onFilesSelected}
                getAuthToken={this.getUserToken}
              />
            </Card>
          </Col>
          <Col span={11} offset={2}>
          <Card type="inner" title="Team account" style={{height: '100%'}}>
              Add file from the team manager account
              <br/>
              <br/>
              {
                account.authority === Authority.admin ?
                ''
                :
                <Alert type="error" message="You must be an admin to do this"/>
              }
              <br/>
              <AddFileModal
                title="Add file from Team-manager drive"
                disabled={account.authority !== Authority.admin}
                onSelect={this.onFilesSelected}
                getAuthToken={this.getAdminToken}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <TeamFiles files={this.props.team == null ? null : this.props.team.files}/>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state: RootStore) => ({
  team: state.teams.selectedTeam,
  teamId: state.teams.selectedId,
  account: state.account.info
})

const mapDispatchToProps = (dispatch: Dispatch<{}>) => (
  bindActionCreators({ loadSelectedTeam }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(FileSection)
