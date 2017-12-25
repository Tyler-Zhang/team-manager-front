import * as React from 'react'
import { bindActionCreators, ActionCreator } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon, Divider } from 'antd'
import * as moment from 'moment'
import axios from '../../../utils/axios'
import { loadUsers } from '../../../store/users'
import { RootStore } from '../../../store'
import { LoadState, User, TeamPreview, PositionLevel } from '../../../types';

import PositionCell from './PositionCell'
import { API_DELETE_POSITION, API_POST_POSITION } from '../../../constants/api';

interface UsersTableProps {
  users: User[]
  teamsPreview: TeamPreview[]
  loadState: LoadState,
  loadUsers: typeof loadUsers
}

class UsersTable extends React.Component<UsersTableProps, {}> {
  private columns: any[]

  constructor (props: UsersTableProps) {
    super(props)

    this.columns = [{
      title: 'Name',
      key: 'name',
      render: (text: string, source: any) => `${source.firstName} ${source.lastName}`
    }, {
      title: 'Authority',
      key: 'authority',
      dataIndex: 'authority'
    }, {
      title: 'Email',
      key: 'email',
      dataIndex: 'email'
    }, {
      title: 'Joined',
      key: 'joined',
      render: (text: string) => moment(text).format('MMM Do, YYYY')
    }, {
      title: 'Positions',
      key: 'positions',
      render: (text: string, user: User) => (
        <PositionCell 
          positions={user.positions}
          teams={this.props.teamsPreview}
          onRemovePosition={this.onRemovePosition}
          onAddPosition={this.onAddTeam(user.id)}
        />
      )
    }]
  }

  onAddTeam = (userId: number) => async (teamId: number, level: PositionLevel) => {
    await axios.post(API_POST_POSITION, { userId, teamId, level })
    this.props.loadUsers()
  }

  onRemovePosition = async (positionId: number) => {
    await axios.delete(`${API_DELETE_POSITION}/${positionId}`)
    this.props.loadUsers()
  }
  
  render () {
    return (
      <Table dataSource={this.props.users} columns={this.columns} />
    )
  }
}

const mapStateToProps = (state: RootStore) => ({
  users: state.users.users,
  teamsPreview: state.teams.preview,
  loadState: state.users.loadState
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ loadUsers }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable)
