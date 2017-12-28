import * as React from 'react'
import { bindActionCreators, ActionCreator } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon, Divider } from 'antd'
import * as moment from 'moment'
import axios from '../../../utils/axios'
import { loadUsers, changeQuery } from '../../../store/users'
import { RootStore } from '../../../store'
import { User, TeamPreview, PositionLevel, ApiFindQuery } from '../../../types';

import PositionCell from './PositionCell'
import { API_DELETE_POSITION, API_POST_POSITION } from '../../../constants/api';

interface UsersTableProps {
  users: User[]
  totalUsers: number
  query: ApiFindQuery<User>
  teamsPreview: TeamPreview[]
  loadUsers: () => any
  changeQuery: (query: Partial<ApiFindQuery<User>>) => any
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
      title: 'Created',
      key: 'createDate',
      dataIndex: 'createDate',      
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
    const query = this.props.query
    return (
      <Table 
        dataSource={this.props.users} 
        columns={this.columns}
        pagination={{
          defaultCurrent: 0,
          current: query.page,
          pageSize: query.pageSize,
          onChange: (page: number, pageSize: number) => {
            this.props.changeQuery({ page, pageSize })
            this.props.loadUsers()
          },
          total: this.props.totalUsers,
          showTotal: (a, b) => `Showing ${b[0]}-${b[1]} of ${a}`,
          pageSizeOptions: ['10', '20', '50', '100'],
          showSizeChanger: true,
          onShowSizeChange: (current, newVal) => {
            this.props.changeQuery({ pageSize: newVal })
            this.props.loadUsers()            
          }
        }}
      />
    )
  }
}

const mapStateToProps = (state: RootStore) => ({
  users: state.users.users,
  query: state.users.query,
  teamsPreview: state.teams.preview,
  totalUsers: state.users.total
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ loadUsers, changeQuery }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable)
