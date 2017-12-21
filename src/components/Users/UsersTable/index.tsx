import * as React from 'react'
import { bindActionCreators, ActionCreator } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon, Divider } from 'antd'
import * as moment from 'moment'
import { loadUsers } from '../../../store/users'
import { RootStore } from '../../../store'
import { LoadState } from '../../../types';

import PositionCell from './PositionCell'

interface UsersTableProps {
  users: any[]
  teams: any[]
  loadState: LoadState,
  loadUsers: typeof loadUsers
}

export class UsersTable extends React.Component<UsersTableProps, {}> {
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
      render: (text: string, source: any) => (
        <PositionCell 
          positions={source.positions}
          teams={this.props.teams}
          onChange={this.props.loadUsers}
          onAddTeam={this.onAddTeam(source.id)}
        />
      )
    }]
  }

  onAddTeam = (userId: number) => (teamId: number) => {
    
  }
  
  render () {
    return (
      <Table dataSource={this.props.users} columns={this.columns} />
    )
  }
}

const mapStateToProps = (state: RootStore) => ({
  users: state.users.users,
  teams: state.teams.teams,
  loadState: state.users.loadState
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ loadUsers }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable)
