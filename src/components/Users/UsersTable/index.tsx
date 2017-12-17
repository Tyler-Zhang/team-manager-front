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
  loadState: LoadState,
  loadUsers: typeof loadUsers
}

export class UsersTable extends React.Component<UsersTableProps, {}> {
  private columns: any[]

  constructor (props: UsersTableProps) {
    super(props)

    this.columns = [{
      title: 'Name',
      key: 'id',
      render: (text: string, source: any) => `${source.firstName} ${source.lastName}`
    }, {
      title: 'Authority',
      key: 'id',
      dataIndex: 'authority'
    }, {
      title: 'Email',
      key: 'id',
      dataIndex: 'email'
    }, {
      title: 'Joined',
      key: 'id',
      render: (text: string) => moment(text).format('MMM Do, YYYY')
    }, {
      title: 'Positions',
      key: 'id',
      render: (text: string, source: any) => (
        <PositionCell 
          positions={source.positions} 
          onChange={this.props.loadUsers}
        />
      )
    }]

  }

  componentDidMount () {
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
  loadState: state.users.loadState
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ loadUsers }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable)
