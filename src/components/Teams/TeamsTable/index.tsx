import * as React from 'react'
import { bindActionCreators, ActionCreator } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon, Divider } from 'antd'
import * as moment from 'moment'
import axios from '../../../utils/axios'
import { loadTeams, changeQuery } from '../../../store/teams'
import { RootStore } from '../../../store'
import { PositionLevel, ApiFindQuery, Team, UserPreview } from '../../../types';

import PositionCell from './PositionCell'
import { API_DELETE_POSITION, API_POST_POSITION } from '../../../constants/api';

interface TeamsTableProps {
  teams: Team[]
  totalTeams: number
  query: ApiFindQuery<Team>
  usersPreview: UserPreview[]
  loadTeams: () => any
  changeQuery: (query: Partial<ApiFindQuery<Team>>) => any
}

class TeamsTable extends React.Component<TeamsTableProps, {}> {
  private columns: any[]

  constructor (props: TeamsTableProps) {
    super(props)

    this.columns = [{
      title: 'Name',
      key: 'name',
      dataIndex: 'name'
    }, {
      title: 'Created',
      key: 'createDate',
      dataIndex: 'createDate',      
      render: (text: string) => moment(text).format('MMM Do, YYYY')
    }, {
      title: 'Positions',
      key: 'positions',
      render: (text: string, team: Team) => (
        <PositionCell 
          positions={team.positions}
          users={this.props.usersPreview}
          onRemovePosition={this.onRemovePosition}
          onAddPosition={this.onAddUser(team.id)}
        />
      )
    }]
  }

  onAddUser = (teamId: number) => async (userId: number, level: PositionLevel) => {
    await axios.post(API_POST_POSITION, { userId, teamId, level })
    this.props.loadTeams()
  }

  onRemovePosition = async (positionId: number) => {
    await axios.delete(`${API_DELETE_POSITION}/${positionId}`)
    this.props.loadTeams()
  }
  
  render () {
    const query = this.props.query
    return (
      <Table 
        dataSource={this.props.teams} 
        columns={this.columns}
        pagination={{
          defaultCurrent: 0,
          current: query.page,
          pageSize: query.pageSize,
          onChange: (page: number, pageSize: number) => {
            this.props.changeQuery({ page, pageSize })
            this.props.loadTeams()
          },
          total: this.props.totalTeams,
          showTotal: (a, b) => `Showing ${b[0]}-${b[1]} of ${a}`,
          pageSizeOptions: ['10', '20', '50', '100'],
          showSizeChanger: true,
          onShowSizeChange: (current, newVal) => {
            this.props.changeQuery({ pageSize: newVal })
            this.props.loadTeams()            
          }
        }}
      />
    )
  }
}

const mapStateToProps = (state: RootStore) => ({
  teams: state.teams.teams,
  query: state.teams.query,
  usersPreview: state.users.usersPreview,
  totalTeams: state.teams.total
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ loadTeams, changeQuery }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TeamsTable)
